from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LeadViewSet, 
    RFQSubmissionViewSet,
    request_investor_download,
    download_investor_documents
)

router = DefaultRouter()
router.register(r'leads', LeadViewSet, basename='lead')
router.register(r'rfq', RFQSubmissionViewSet, basename='rfq')

urlpatterns = [
    path('investor/request-download/', request_investor_download, name='investor-request-download'),
    path('investor/download/<str:token>/', download_investor_documents, name='investor-download'),
] + router.urls
