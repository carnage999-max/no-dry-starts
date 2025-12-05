from django.db import models
import uuid


class ContentBlock(models.Model):
    """Editable content blocks for website pages"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    html_content = models.TextField()
    order = models.IntegerField(default=0, help_text="Display order (lower numbers first)")
    page = models.CharField(max_length=100, default='home', help_text="Page where this block appears")
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['page', 'order', 'slug']
        indexes = [
            models.Index(fields=['page', 'order']),
        ]

    def __str__(self):
        return f"{self.page} - {self.title} ({self.order})"
