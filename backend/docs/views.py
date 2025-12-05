from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Document
from .serializers import DocumentSerializer, DocumentListSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    """Custom permission: read-only for all, write for admin only"""
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        # For write operations, check if user is authenticated and is staff
        if request.user and request.user.is_authenticated and request.user.is_staff:
            return True
        return False


class DocumentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for documents (patents, diagrams, investor decks).
    Public can list and download.
    Admin can CRUD documents.
    """
    queryset = Document.objects.all()
    permission_classes = [IsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return DocumentListSerializer
        return DocumentSerializer

    def get_queryset(self):
        queryset = Document.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset
