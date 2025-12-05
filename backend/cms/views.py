from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ContentBlock
from .serializers import ContentBlockSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    """Custom permission: read-only for all, write for admin only"""
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        # For write operations, check if user is authenticated and is staff
        if request.user and request.user.is_authenticated and request.user.is_staff:
            return True
        return False


class ContentBlockViewSet(viewsets.ModelViewSet):
    """
    ViewSet for content blocks.
    Public can read.
    Admin can CRUD.
    """
    queryset = ContentBlock.objects.all()
    serializer_class = ContentBlockSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def reorder(self, request):
        """
        Bulk reorder content blocks.
        Expects: { "blocks": [{ "slug": "...", "order": 0 }, ...] }
        """
        blocks_data = request.data.get('blocks', [])
        
        if not blocks_data:
            return Response(
                {'error': 'blocks data is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update order for each block
        updated_count = 0
        for block_data in blocks_data:
            slug = block_data.get('slug')
            order = block_data.get('order')
            
            if slug is None or order is None:
                continue
            
            try:
                block = ContentBlock.objects.get(slug=slug)
                block.order = order
                block.save()
                updated_count += 1
            except ContentBlock.DoesNotExist:
                pass
        
        return Response({
            'message': f'Successfully updated order for {updated_count} blocks',
            'updated_count': updated_count
        }, status=status.HTTP_200_OK)
