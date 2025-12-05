# AWS S3 and SES Setup Guide

## Prerequisites
- AWS Account
- AWS CLI installed (optional but recommended)
- Access to AWS Console

## 1. AWS S3 Setup (File Storage)

### Step 1: Create S3 Bucket

1. Go to AWS Console → S3
2. Click "Create bucket"
3. Configure:
   - **Bucket name**: `no-dry-starts-media` (must be globally unique)
   - **Region**: `us-east-1` (or your preferred region)
   - **Block Public Access**: Uncheck "Block all public access"
   - **Bucket Versioning**: Enable (recommended)
   - **Tags**: Add relevant tags

4. Click "Create bucket"

### Step 2: Configure Bucket Policy

1. Go to your bucket → Permissions → Bucket policy
2. Add this policy (replace `YOUR-BUCKET-NAME`):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

### Step 3: Configure CORS

1. Go to Permissions → CORS
2. Add this configuration:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": ["ETag"]
    }
]
```

### Step 4: Create IAM User for S3 Access

1. Go to IAM → Users → Add user
2. User name: `no-dry-starts-s3-user`
3. Access type: Programmatic access
4. Attach policy: `AmazonS3FullAccess` (or create custom policy below)

**Custom Policy (More Secure):**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::YOUR-BUCKET-NAME",
                "arn:aws:s3:::YOUR-BUCKET-NAME/*"
            ]
        }
    ]
}
```

5. Save the **Access Key ID** and **Secret Access Key**

## 2. AWS SES Setup (Email Notifications)

### Step 1: Verify Email Address/Domain

**Option A: Verify Single Email (Development)**
1. Go to AWS Console → SES → Email Addresses
2. Click "Verify a New Email Address"
3. Enter: `noreply@nodrystarts.com`
4. Check email and click verification link
5. Repeat for admin email: `admin@nodrystarts.com`

**Option B: Verify Domain (Production)**
1. Go to SES → Domains → Verify a New Domain
2. Enter your domain: `nodrystarts.com`
3. Check "Generate DKIM Settings"
4. Add the provided DNS records to your domain registrar:
   - TXT record for verification
   - CNAME records for DKIM

### Step 2: Request Production Access

By default, SES is in **Sandbox mode** (can only send to verified addresses).

1. Go to SES → Account Dashboard → Request Production Access
2. Fill out the form:
   - Mail Type: Transactional
   - Website URL: Your website
   - Use case description: "Automated notifications for RFQ submissions and contact inquiries"
   - Compliance: Explain your opt-out process
3. Submit and wait for approval (usually 24 hours)

### Step 3: Create SMTP Credentials

1. Go to SES → SMTP Settings
2. Click "Create My SMTP Credentials"
3. IAM User Name: `no-dry-starts-ses-user`
4. Click "Create"
5. **Download credentials** (you won't see them again!)
   - SMTP Username (Access Key ID)
   - SMTP Password (Secret Access Key)

### Step 4: Note Your SMTP Endpoint

Based on your region:
- **US East (N. Virginia)**: `email-smtp.us-east-1.amazonaws.com`
- **US West (Oregon)**: `email-smtp.us-west-2.amazonaws.com`
- **EU (Ireland)**: `email-smtp.eu-west-1.amazonaws.com`

Port: **587** (TLS)

## 3. Environment Configuration

Update your `.env` file:

```bash
# AWS S3 Configuration
USE_S3=True
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_STORAGE_BUCKET_NAME=no-dry-starts-media
AWS_S3_REGION_NAME=us-east-1

# AWS SES Configuration
USE_SES=True
AWS_SES_REGION=us-east-1
AWS_SES_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SES_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
DEFAULT_FROM_EMAIL=noreply@nodrystarts.com
ADMIN_EMAIL=admin@nodrystarts.com
ADMIN_NAME=No Dry Starts Admin
```

## 4. Install Required Packages

```bash
pip install boto3 django-storages
```

Or use requirements.txt:
```bash
pip install -r requirements.txt
```

## 5. Testing

### Test S3 Upload

```python
# Django shell
python manage.py shell

from django.core.files.base import ContentFile
from docs.models import Document

# Create test document
doc = Document.objects.create(
    file_name='test.txt',
    category='other',
    description='Test upload'
)
doc.file.save('test.txt', ContentFile(b'Test content'))
print(doc.file.url)  # Should show S3 URL
```

### Test SES Email

```python
# Django shell
python manage.py shell

from django.core.mail import send_mail
from django.conf import settings

send_mail(
    'Test Email',
    'This is a test email from No Dry Starts.',
    settings.DEFAULT_FROM_EMAIL,
    [settings.ADMIN_EMAIL],
    fail_silently=False,
)
```

Or use management command:
```bash
python manage.py sendtestemail admin@nodrystarts.com
```

## 6. Production Checklist

- [ ] S3 bucket created and configured
- [ ] S3 bucket policy allows public read
- [ ] CORS configured for S3
- [ ] IAM user created for S3 with appropriate permissions
- [ ] SES email addresses/domain verified
- [ ] SES production access requested and approved
- [ ] SMTP credentials created for SES
- [ ] Environment variables set in production
- [ ] boto3 and django-storages installed
- [ ] File uploads tested to S3
- [ ] Email notifications tested via SES

## 7. Security Best Practices

1. **Use Separate IAM Users**
   - One for S3 (upload/download files)
   - One for SES (send emails)
   - Apply principle of least privilege

2. **Enable CloudWatch Logging**
   - Monitor S3 access logs
   - Track SES email bounces and complaints

3. **Set Up Lifecycle Rules** (S3)
   - Archive old files to S3 Glacier
   - Delete temporary files after X days

4. **Configure SES Event Publishing**
   - Track bounces, complaints, and deliveries
   - Use SNS to receive notifications

5. **Rotate Credentials Regularly**
   - Change AWS access keys every 90 days
   - Use AWS Secrets Manager for production

## 8. Cost Estimation

### S3 Costs (US East)
- Storage: $0.023/GB/month
- PUT requests: $0.005 per 1,000
- GET requests: $0.0004 per 1,000
- Data transfer out: $0.09/GB (first 10TB)

**Example**: 100GB storage + 10,000 downloads/month ≈ $3-5/month

### SES Costs
- First 62,000 emails/month: **FREE** (if sent from EC2)
- Otherwise: $0.10 per 1,000 emails
- Data transfer: $0.12/GB

**Example**: 1,000 notifications/month ≈ FREE or $0.10/month

## 9. Troubleshooting

### S3 Upload Fails
- Check IAM permissions
- Verify bucket name and region in .env
- Check bucket policy allows uploads
- Ensure `USE_S3=True` in environment

### Email Not Sending
- Check SES is out of sandbox mode
- Verify sender email is verified
- Check SMTP credentials are correct
- Verify recipient email is verified (in sandbox)
- Check CloudWatch logs for errors

### Files Not Accessible
- Verify bucket policy allows public read
- Check CORS configuration
- Ensure files are uploaded with public-read ACL

## 10. Alternative: CloudFront CDN (Optional)

For better performance, add CloudFront in front of S3:

1. Create CloudFront distribution
2. Origin: Your S3 bucket
3. Update Django settings:
   ```python
   AWS_S3_CUSTOM_DOMAIN = 'dxxxxxxxxxxxxx.cloudfront.net'
   ```
4. Configure SSL certificate (AWS ACM)
5. Update CORS to allow CloudFront domain

## Support Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)
- [django-storages Documentation](https://django-storages.readthedocs.io/)
- [boto3 Documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
