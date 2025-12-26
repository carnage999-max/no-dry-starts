"""
Email service using Resend for sending transactional emails.
"""

import os
from django.conf import settings

try:
    import resend
    RESEND_AVAILABLE = True
except ImportError:
    RESEND_AVAILABLE = False


def send_email(to_email, subject, message, html=None):
    """
    Send email using Resend API.

    Args:
        to_email: Recipient email address or list of addresses
        subject: Email subject
        message: Plain text email body
        html: Optional HTML email body

    Returns:
        dict: Response from Resend API
    """
    if not RESEND_AVAILABLE:
        print("[EMAIL] ERROR: Resend package not installed")
        return {"error": "Email service not available"}

    api_key = settings.RESEND_API_KEY
    if not api_key:
        print("[EMAIL] ERROR: RESEND_API_KEY not configured")
        return {"error": "Email service not configured"}

    # Set the API key
    resend.api_key = api_key

    # Ensure to_email is a list
    if isinstance(to_email, str):
        to_email = [to_email]

    print(f"[EMAIL] Attempting to send email to {to_email} with subject: {subject}")
    
    try:
        response = resend.Emails.send({
            "from": settings.DEFAULT_FROM_EMAIL,
            "to": to_email,
            "subject": subject,
            "text": message,
            "html": html or message,
        })
        print(f"[EMAIL] Successfully sent email. Response: {response}")
        return response
    except Exception as e:
        print(f"[EMAIL] ERROR: Failed to send email via Resend: {e}")
        import traceback
        traceback.print_exc()
        return {"error": str(e)}


def send_inquiry_notification(lead):
    """
    Send notification email for new inquiry submission.

    Args:
        lead: Lead model instance
    """
    subject = f"New {lead.get_inquiry_type_display()} Inquiry - No Dry Starts®"
    message = f"""
New inquiry received:

Name: {lead.full_name}
Email: {lead.email}
Phone: {lead.phone}
Type: {lead.get_inquiry_type_display()}

Message:
{lead.message}

---
Received: {lead.created_at}
    """

    html = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New Inquiry - No Dry Starts®</h2>
        <p><strong>Type:</strong> {lead.get_inquiry_type_display()}</p>
        
        <h3>Contact Information</h3>
        <ul style="list-style: none; padding: 0;">
            <li><strong>Name:</strong> {lead.full_name}</li>
            <li><strong>Email:</strong> {lead.email}</li>
            <li><strong>Phone:</strong> {lead.phone or 'Not provided'}</li>
        </ul>
        
        <h3>Message</h3>
        <p>{lead.message.replace(chr(10), '<br>')}</p>
        
        <hr>
        <p style="color: #666; font-size: 0.9em;">Received: {lead.created_at}</p>
    </div>
    """

    return send_email(
        to_email=settings.INQUIRY_NOTIFICATION_EMAIL,
        subject=subject,
        message=message,
        html=html,
    )


def send_rfq_notification(rfq):
    """
    Send notification email for new RFQ submission to admin and RFQ email.

    Args:
        rfq: RFQSubmission model instance
    """
    subject = f"New RFQ Submission - No Dry Starts®"
    message = f"""
New RFQ (Request for Quote) submission received:

Name: {rfq.full_name}
Email: {rfq.email}
Phone: {rfq.phone}
Company: {rfq.company or 'N/A'}

Message:
{rfq.message}

Attachment: {'Yes' if rfq.attachment else 'No'}
{f'File: {rfq.attachment.url}' if rfq.attachment else ''}

---
Received: {rfq.created_at}
    """

    html = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New RFQ Submission - No Dry Starts®</h2>
        
        <h3>Contact Information</h3>
        <ul style="list-style: none; padding: 0;">
            <li><strong>Name:</strong> {rfq.full_name}</li>
            <li><strong>Email:</strong> {rfq.email}</li>
            <li><strong>Phone:</strong> {rfq.phone}</li>
            <li><strong>Company:</strong> {rfq.company or 'Not provided'}</li>
        </ul>
        
        <h3>Message</h3>
        <p>{rfq.message.replace(chr(10), '<br>')}</p>
        
        <p><strong>Attachment:</strong> {'Yes - ' + rfq.attachment.url if rfq.attachment else 'No'}</p>
        
        <hr>
        <p style="color: #666; font-size: 0.9em;">Received: {rfq.created_at}</p>
    </div>
    """

    # Send to both admin and RFQ notification email
    to_emails = [settings.ADMIN_EMAIL, settings.RFQ_NOTIFICATION_EMAIL]

    return send_email(to_email=to_emails, subject=subject, message=message, html=html)


def send_investor_download_link(email, download_url, token_expires):
    """
    Send investor download link email to user.

    Args:
        email: Recipient email address
        download_url: Secure download link
        token_expires: Token expiration datetime
    """
    subject = "Your No Dry Starts® Investor Documents"
    message = f"""
Thank you for your interest in No Dry Starts®!

You can download the investor documents using the secure link below:

{download_url}

This link will expire in 48 hours and can be used up to 3 times.

If you have any questions, please don't hesitate to contact us.

Best regards,
No Dry Starts® Team
    """

    html = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
        <h2>No Dry Starts® Investor Documents</h2>
        
        <p>Thank you for your interest in <strong>No Dry Starts®</strong>!</p>
        
        <p>You can download the investor documents using the secure link below:</p>
        
        <p style="text-align: center; margin: 30px 0;">
            <a href="{download_url}" style="background-color: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Download Investor Documents
            </a>
        </p>
        
        <p style="font-size: 0.9em; color: #666;">
            <strong>Link expires:</strong> {token_expires}<br>
            <strong>Uses remaining:</strong> 3
        </p>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <p>
            Best regards,<br>
            <strong>No Dry Starts® Team</strong>
        </p>
    </div>
    """

    return send_email(to_email=email, subject=subject, message=message, html=html)


def send_investor_download_admin_notification(
    email, token, token_expires, download_url
):
    """
    Send admin notification when investor document is requested.

    Args:
        email: Requester email
        token: Download token
        token_expires: Token expiration datetime
        download_url: Download URL
    """
    subject = "New Investor Document Request - No Dry Starts®"
    message = f"""
New investor document download requested:

Email: {email}
Token: {token}
Expires: {token_expires}

Download URL: {download_url}
    """

    html = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New Investor Document Request - No Dry Starts®</h2>
        
        <ul style="list-style: none; padding: 0;">
            <li><strong>Email:</strong> {email}</li>
            <li><strong>Token:</strong> <code style="background: #f0f0f0; padding: 2px 5px;">{token}</code></li>
            <li><strong>Expires:</strong> {token_expires}</li>
        </ul>
        
        <p style="margin-top: 20px;">
            <a href="{download_url}" style="color: #0066cc;">View Download URL</a>
        </p>
    </div>
    """

    return send_email(
        to_email=settings.ADMIN_EMAIL, subject=subject, message=message, html=html
    )
