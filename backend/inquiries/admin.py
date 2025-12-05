from django.contrib import admin
from .models import Lead, RFQSubmission


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'inquiry_type', 'created_at']
    list_filter = ['inquiry_type', 'created_at']
    search_fields = ['full_name', 'email', 'message']


@admin.register(RFQSubmission)
class RFQSubmissionAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'company', 'created_at']
    list_filter = ['created_at']
    search_fields = ['full_name', 'email', 'company', 'message']
