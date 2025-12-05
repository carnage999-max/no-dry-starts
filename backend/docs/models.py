from django.db import models
import uuid


class Document(models.Model):
    """Document storage model (patents, diagrams, investor decks, etc.)"""
    CATEGORY_CHOICES = [
        ('patent', 'Patent'),
        ('diagram', 'Diagram'),
        ('investor', 'Investor Deck'),
        ('technical', 'Technical Documentation'),
        ('other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file_name = models.CharField(max_length=255)
    file = models.FileField(upload_to='documents/%Y/%m/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.file_name
