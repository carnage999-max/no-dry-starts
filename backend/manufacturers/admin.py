from django.contrib import admin
from .models import Manufacturer


@admin.register(Manufacturer)
class ManufacturerAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'active', 'created_at']
    list_filter = ['active', 'created_at']
    search_fields = ['name', 'email', 'phone']
