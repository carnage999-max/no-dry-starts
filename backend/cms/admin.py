from django.contrib import admin
from .models import ContentBlock


@admin.register(ContentBlock)
class ContentBlockAdmin(admin.ModelAdmin):
    list_display = ['slug', 'title', 'updated_at']
    search_fields = ['slug', 'title', 'html_content']
    prepopulated_fields = {'slug': ('title',)}
