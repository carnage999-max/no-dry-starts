# NO DRY STARTS® - Complete System

A modern, full-stack application for the No Dry Starts® engine pre-primer system.

## Overview

This is a production-ready system with:
- **Django REST API** with JWT authentication and automatic token refresh
- **Next.js Public Website** for customer-facing content
- **Next.js Admin Panel** for complete content and data management
- **Rate Limiting** to prevent abuse
- **Secure File Handling** with multipart uploads
- **Dark Theme UI** with custom color palette
- **Mobile Responsive** design across all interfaces

## Project Structure

```
no-dry-starts/
├── backend/                    # Django REST API
│   ├── no_dry_starts/         # Main Django project
│   ├── manufacturers/         # Manufacturer management API
│   ├── docs/                  # Document management API
│   ├── inquiries/             # Leads, RFQs, and investor downloads
│   ├── cms/                   # Content management API
│   ├── manage.py
│   ├── requirements.txt
│   └── env/                   # Python virtual environment
│
├── frontend/                   # Next.js public website
│   ├── app/                   # Next.js app directory
│   ├── public/
│   ├── package.json
│   └── tailwind.config.ts
│
├── admin_panel/               # Next.js admin dashboard
│   ├── app/
│   │   ├── page.tsx          # Login page
│   │   ├── dashboard/        # Dashboard pages
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── lib/
│   │   └── api-client.ts     # Centralized API client with token refresh
│   ├── public/
│   ├── package.json
│   └── tailwind.config.ts
│
└── README.md                   # This file
```

## Tech Stack

### Backend
- **Framework**: Django 5.2.9 with Django REST Framework 3.16.1
- **Authentication**: SimpleJWT with automatic refresh tokens
- **API Documentation**: drf-spectacular (OpenAPI/Swagger)
- **Security**: django-cors-headers, rate limiting via django-ratelimit
- **Database**: SQLite (dev) / PostgreSQL (production)
- **File Upload**: Multipart form data with FormData API

### Frontend
- **Framework**: Next.js 16+ with React 19+
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **State Management**: localStorage for authentication
- **Drag & Drop**: @hello-pangea/dnd library
- **Icons**: lucide-react
- **API Client**: Custom singleton with automatic token refresh

### Admin Panel
- Complete CRUD operations for all models
- Manufacturer management with detail view modal
- Document upload and categorization
- Lead and RFQ submission viewing with CSV export
- Content block management with drag-and-drop reordering
- Rate limiting visualization
- Mobile-responsive design

## Features

### Authentication & Security
✅ JWT token-based authentication
✅ Automatic token refresh on expiration
✅ Secure password handling
✅ CORS configured for frontend domains
✅ Rate limiting (10/hr leads, 5/hr RFQs, 3/hr investor downloads)

### Admin Features
✅ Manufacturer CRUD with full details modal
✅ Document management with category filtering
✅ Lead management with inquiry type filtering
✅ RFQ submission viewing and CSV export
✅ Content block management with drag-and-drop ordering
✅ Investor download tokens with 48-hour expiration
✅ CSV export for data analysis

### Frontend Features
✅ Public website with hero sections
✅ Responsive design across all devices
✅ Contact form with inquiry type selection
✅ RFQ form with file attachment
✅ Dark theme with custom color palette

### Mobile Responsiveness
✅ All dashboards responsive (mobile-first design)
✅ Action buttons fit properly on small screens
✅ Navigation responsive with proper text truncation
✅ Forms stack vertically on mobile
✅ Tables with horizontal scroll on mobile
✅ Global overflow prevention

## Setup & Installation

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or pnpm package manager

### Backend Setup

```powershell
cd backend

# Activate virtual environment
.\env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

The backend will be available at `http://localhost:8000/api`

### Frontend Setup

```powershell
cd frontend

# Install dependencies
npm install
# or
pnpm install

# Create .env.local
copy .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Start development server
npm run dev
# or
pnpm dev
```

The frontend will be available at `http://localhost:3000`

### Admin Panel Setup

```powershell
cd admin_panel

# Install dependencies
npm install
# or
pnpm install

# Create .env.local
copy .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Start development server
npm run dev
# or
pnpm dev
```

The admin panel will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/token/` - Login with username/password
- `POST /api/token/refresh/` - Refresh expired access token

### Manufacturers
- `GET /api/manufacturers/` - List all active manufacturers (paginated)
- `GET /api/manufacturers/{id}/` - Get single manufacturer
- `POST /api/manufacturers/` - Create manufacturer (admin only)
- `PUT /api/manufacturers/{id}/` - Update manufacturer (admin only)
- `DELETE /api/manufacturers/{id}/` - Delete manufacturer (admin only)

### Documents
- `GET /api/documents/` - List all documents (paginated)
- `GET /api/documents/{id}/` - Get single document
- `POST /api/documents/` - Upload document (admin only)
- `PUT /api/documents/{id}/` - Update document (admin only)
- `DELETE /api/documents/{id}/` - Delete document (admin only)

### Leads
- `GET /api/inquiries/leads/` - List all leads (admin only)
- `POST /api/inquiries/leads/` - Create lead inquiry (rate limited 10/hr)
- `GET /api/inquiries/leads/export-csv/` - Export leads to CSV (admin only)

### RFQs
- `GET /api/inquiries/rfqs/` - List all RFQ submissions (admin only)
- `POST /api/inquiries/rfqs/` - Create RFQ submission (rate limited 5/hr)
- `GET /api/inquiries/rfqs/export-csv/` - Export RFQs to CSV (admin only)

### Content Blocks
- `GET /api/content/blocks/` - List content blocks (paginated)
- `GET /api/content/blocks/{slug}/` - Get content by slug
- `POST /api/content/blocks/` - Create content block (admin only)
- `PUT /api/content/blocks/{id}/` - Update content block (admin only)
- `DELETE /api/content/blocks/{id}/` - Delete content block (admin only)
- `POST /api/content/blocks/reorder/` - Reorder content blocks (admin only)

### Investor Downloads
- `POST /api/inquiries/investor-tokens/` - Request download token (rate limited 3/hr)
- `GET /api/inquiries/investor-tokens/download/` - Download investor materials

## Authentication Flow

### Initial Login
1. User submits username/password
2. Backend returns `access` token and `refresh` token
3. Both tokens stored in localStorage
4. Admin panel redirects to dashboard

### Token Refresh (Automatic)
1. API request returns 401 Unauthorized
2. Admin panel detects 401 response
3. Uses stored refresh token to get new access token
4. Original request automatically retried with new token
5. If refresh fails, user redirected to login

### Logout
1. User clicks logout button
2. Tokens cleared from localStorage
3. Redirect to login page

## Admin Panel Dashboard

### Navigation
- **Manufacturers** - Full CRUD with detail modal
- **Documents** - Upload, edit, delete with category filtering
- **Leads** - View submissions, filter by type, export CSV
- **RFQs** - View submissions, export CSV, view attachments
- **Content** - Drag-and-drop reordering, full HTML editing

### Features
- Responsive tables with search/filter
- Detail modals for viewing full information
- Form validation on all inputs
- Automatic token refresh on expiration
- CSV export for analysis
- Rate limit visualization
- Mobile-optimized UI

## Environment Variables

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
JWT_ALGORITHM=HS256
SIMPLE_JWT_SIGNING_KEY=your-signing-key
```

### Frontend/Admin (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Database Models

### Manufacturer
- id, name, description, address, phone, email, website, active, created_at, updated_at

### Document
- id, file_name, file_url, category, description, created_at, updated_at

### Lead (Inquiry)
- id, full_name, email, phone, message, inquiry_type, created_at

### RFQSubmission
- id, full_name, email, phone, company, message, attachment_url, created_at

### ContentBlock
- id, slug, title, html_content, page, order, is_active, created_at, updated_at

### InvestorDownloadToken
- id, token, created_at, expires_at, is_used, download_count

## Rate Limiting

- **Leads Creation**: 10 requests per hour per IP
- **RFQ Submission**: 5 requests per hour per IP
- **Investor Downloads**: 3 requests per hour per IP

Rate limits reset hourly based on IP address.

## Troubleshooting

### 401 Unauthorized Error
- Token has expired but refresh token is invalid
- Solution: Clear browser cache/localStorage and login again

### CORS Errors
- Ensure `CORS_ALLOWED_ORIGINS` in backend settings includes frontend URLs
- Check that credentials are included in fetch requests

### Database Connection
- Ensure DATABASE_URL is correct
- Run migrations: `python manage.py migrate`

### Frontend Not Connecting
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running on correct port
- Inspect browser console for errors

## Deployment

### Backend Deployment
1. Set `DEBUG=False` in production
2. Use environment variables for secrets
3. Configure allowed hosts
4. Set up PostgreSQL database
5. Run migrations
6. Collect static files: `python manage.py collectstatic`

### Frontend/Admin Deployment
1. Build: `npm run build`
2. Deploy to Vercel, Netlify, or self-hosted server
3. Set production API URL in environment

## Contributing

1. Create feature branches
2. Follow existing code style
3. Test all changes locally
4. Commit with clear messages

## License

© 2025 NO DRY STARTS®. All rights reserved.
