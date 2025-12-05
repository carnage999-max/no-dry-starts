from rest_framework import serializers
from .models import Manufacturer


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ['id', 'name', 'description', 'address', 'phone', 'email', 'website', 'active', 'created_at']
        read_only_fields = ['id', 'created_at']


class ManufacturerListSerializer(serializers.ModelSerializer):
    """Lighter serializer for list views"""
    class Meta:
        model = Manufacturer
        fields = ['id', 'name', 'description', 'phone', 'email', 'website']
