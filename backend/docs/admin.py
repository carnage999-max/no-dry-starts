from django.contrib import admin
from .models import Document


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['file_name', 'category', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['file_name', 'description']
