from rest_framework import serializers
from .models import Lead, RFQSubmission, InvestorDownloadToken


class InvestorDownloadRequestSerializer(serializers.Serializer):
    """Serializer for requesting investor document download"""
    email = serializers.EmailField(required=True)
    name = serializers.CharField(required=False, max_length=255)


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['id', 'full_name', 'email', 'phone', 'message', 'inquiry_type', 'created_at']
        read_only_fields = ['id', 'created_at']


class RFQSubmissionSerializer(serializers.ModelSerializer):
    attachment_url = serializers.SerializerMethodField()

    class Meta:
        model = RFQSubmission
        fields = ['id', 'full_name', 'email', 'phone', 'company', 'message', 'attachment', 'attachment_url', 'created_at']
        read_only_fields = ['id', 'created_at']

    def get_attachment_url(self, obj):
        request = self.context.get('request')
        if obj.attachment and request:
            return request.build_absolute_uri(obj.attachment.url)
        return None
