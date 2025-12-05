from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Manufacturer
from .serializers import ManufacturerSerializer, ManufacturerListSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    """Custom permission: read-only for all, write for admin only"""
    def has_permission(self, request, view):
        # Allow read-only access for everyone
        if request.method in permissions.SAFE_METHODS:
            return True
        # For write operations, check if user is authenticated and is staff
        if request.user and request.user.is_authenticated and request.user.is_staff:
            return True
        return False


class ManufacturerViewSet(viewsets.ModelViewSet):
    """
    ViewSet for manufacturers/prototype partners.
    Public can list active manufacturers.
    Admin can CRUD all manufacturers.
    """
    queryset = Manufacturer.objects.all()
    permission_classes = [IsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return ManufacturerListSerializer
        return ManufacturerSerializer

    def get_queryset(self):
        queryset = Manufacturer.objects.all()
        # Non-admin users only see active manufacturers
        if not (self.request.user and self.request.user.is_staff):
            queryset = queryset.filter(active=True)
        return queryset
