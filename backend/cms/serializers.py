from rest_framework import serializers
from .models import ContentBlock


class ContentBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentBlock
        fields = ['id', 'slug', 'title', 'html_content', 'order', 'page', 'updated_at', 'created_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
