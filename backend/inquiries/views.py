from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.conf import settings
from django.http import FileResponse, Http404, HttpResponse
from django.shortcuts import get_object_or_404
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
import csv
from .models import Lead, RFQSubmission, InvestorDownloadToken
from .serializers import (
    LeadSerializer,
    RFQSubmissionSerializer,
    InvestorDownloadRequestSerializer,
)
from .email_service import (
    send_inquiry_notification,
    send_rfq_notification,
    send_investor_download_link,
    send_investor_download_admin_notification,
)
from docs.models import Document


class AllowAnyPost(permissions.BasePermission):
    """Allow anyone to POST, but only admin can view"""

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return request.user and request.user.is_staff


@method_decorator(ratelimit(key="ip", rate="10/h", method="POST"), name="create")
class LeadViewSet(viewsets.ModelViewSet):
    """
    ViewSet for general contact leads.
    Public can POST (create) - Rate limited to 10 submissions per hour per IP.
    Admin can view all.
    """

    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [AllowAnyPost]
    http_method_names = ["get", "post", "delete"]  # No PUT/PATCH

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAdminUser])
    def export_csv(self, request):
        """Export all leads to CSV file"""
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="leads_export.csv"'

        writer = csv.writer(response)
        writer.writerow(
            [
                "ID",
                "Full Name",
                "Email",
                "Phone",
                "Inquiry Type",
                "Message",
                "Created At",
            ]
        )

        for lead in Lead.objects.all().order_by("-created_at"):
            writer.writerow(
                [
                    str(lead.id),
                    lead.full_name,
                    lead.email,
                    lead.phone or "",
                    lead.get_inquiry_type_display(),
                    lead.message,
                    lead.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                ]
            )

        return response

    def perform_create(self, serializer):
        """Send email notification when new lead is created"""
        lead = serializer.save()

        # Send email notification
        try:
            send_inquiry_notification(lead)
        except Exception as e:
            # Log error but don't fail the request
            print(f"Failed to send inquiry notification email: {e}")


@method_decorator(ratelimit(key="ip", rate="5/h", method="POST"), name="create")
class RFQSubmissionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for RFQ submissions.
    Public can POST (create) - Rate limited to 5 submissions per hour per IP.
    Admin can view all.
    """

    queryset = RFQSubmission.objects.all()
    serializer_class = RFQSubmissionSerializer
    permission_classes = [AllowAnyPost]
    http_method_names = ["get", "post", "delete"]  # No PUT/PATCH

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAdminUser])
    def export_csv(self, request):
        """Export all RFQ submissions to CSV file"""
        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = (
            'attachment; filename="rfq_submissions_export.csv"'
        )

        writer = csv.writer(response)
        writer.writerow(
            [
                "ID",
                "Full Name",
                "Email",
                "Phone",
                "Company",
                "Message",
                "Has Attachment",
                "Created At",
            ]
        )

        for rfq in RFQSubmission.objects.all().order_by("-created_at"):
            writer.writerow(
                [
                    str(rfq.id),
                    rfq.full_name,
                    rfq.email,
                    rfq.phone,
                    rfq.company or "",
                    rfq.message,
                    "Yes" if rfq.attachment else "No",
                    rfq.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                ]
            )

        return response

    def perform_create(self, serializer):
        """Send email notification when new RFQ is submitted"""
        rfq = serializer.save()

        # Send email notification to admin and RFQ email
        try:
            send_rfq_notification(rfq)
        except Exception as e:
            # Log error but don't fail the request
            print(f"Failed to send RFQ notification email: {e}")


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
@ratelimit(key="ip", rate="3/h", method="POST")
def request_investor_download(request):
    """
    Request a secure download link for investor documents.
    Creates a time-limited token and sends it via email.
    Rate limited to 3 requests per hour per IP.
    """
    serializer = InvestorDownloadRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data["email"]

    # Create download token
    token = InvestorDownloadToken.objects.create(email=email)

    # Create lead entry for tracking
    Lead.objects.create(
        full_name=serializer.validated_data.get("name", "Investor"),
        email=email,
        message=f"Requested investor documents download",
        inquiry_type="investor",
    )

    # Generate download URL
    download_url = (
        f"{request.scheme}://{request.get_host()}/api/investor/download/{token.token}/"
    )

    # Send email with download link
    try:
        send_investor_download_link(
            email=email, download_url=download_url, token_expires=token.expires_at
        )

        # Notify admin
        send_investor_download_admin_notification(
            email=email,
            token=token.token,
            token_expires=token.expires_at,
            download_url=download_url,
        )

    except Exception as e:
        # If email fails, delete the token and return error
        token.delete()
        return Response(
            {"error": "Failed to send email. Please try again later."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return Response(
        {"message": "Download link sent to your email", "expires_at": token.expires_at},
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def download_investor_documents(request, token):
    """
    Download investor documents using a secure token.
    Token is time-limited and has a maximum number of uses.
    """
    try:
        download_token = InvestorDownloadToken.objects.get(token=token)
    except InvestorDownloadToken.DoesNotExist:
        raise Http404("Invalid or expired download link")

    # Check if token is still valid
    if not download_token.is_valid():
        return Response(
            {
                "error": "This download link has expired or reached its maximum usage limit"
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    # Get investor documents
    documents = Document.objects.filter(category="investor")

    if not documents.exists():
        return Response(
            {"error": "No investor documents available"},
            status=status.HTTP_404_NOT_FOUND,
        )

    # For simplicity, return the first investor document
    # In production, you might want to return a ZIP of all documents
    document = documents.first()

    # Increment download count
    download_token.increment_download()

    # Return the file
    try:
        return FileResponse(
            document.file.open("rb"), as_attachment=True, filename=document.file_name
        )
    except Exception as e:
        return Response(
            {"error": "Failed to retrieve document"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
