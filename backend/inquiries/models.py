from django.db import models
from django.utils import timezone
from datetime import timedelta
import uuid
import secrets


class InvestorDownloadToken(models.Model):
    """Time-limited secure download token for investor documents"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField()
    token = models.CharField(max_length=64, unique=True, editable=False)
    document_category = models.CharField(max_length=50, default='investor')
    expires_at = models.DateTimeField()
    download_count = models.IntegerField(default=0)
    max_downloads = models.IntegerField(default=3)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = secrets.token_urlsafe(48)
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(hours=48)
        super().save(*args, **kwargs)

    def is_valid(self):
        """Check if token is still valid"""
        return (
            timezone.now() < self.expires_at and
            self.download_count < self.max_downloads
        )

    def increment_download(self):
        """Increment download count"""
        self.download_count += 1
        self.save()

    def __str__(self):
        return f"Token for {self.email} - Expires {self.expires_at}"


class Lead(models.Model):
    """General contact and inquiry lead model"""
    TYPE_CHOICES = [
        ('contact', 'General Contact'),
        ('investor', 'Investor Inquiry'),
        ('manufacturer', 'Manufacturer Application'),
        ('rfq', 'RFQ Submission'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, null=True)
    message = models.TextField()
    inquiry_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.inquiry_type}"


class RFQSubmission(models.Model):
    """Request for Quote submission model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    company = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField()
    attachment = models.FileField(upload_to='rfq_attachments/%Y/%m/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"RFQ from {self.full_name} - {self.company or 'No Company'}"
