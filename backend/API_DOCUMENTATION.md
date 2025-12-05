# No Dry Starts® API Documentation

## Base URL
- Development: `http://localhost:8000/api`
- Production: `https://yourdomain.com/api`

## Authentication

### JWT Token Authentication
Most admin endpoints require JWT authentication.

**Get Token**
```http
POST /api/token/
Content-Type: application/json

{
  "username": "admin",
  "password": "your-password"
}

Response:
{
  "access": "eyJhbGc...",
  "refresh": "eyJhbGc..."
}
```

**Refresh Token**
```http
POST /api/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJhbGc..."
}

Response:
{
  "access": "eyJhbGc..."
}
```

**Using Token**
Include in Authorization header:
```http
Authorization: Bearer eyJhbGc...
```

## Public Endpoints

### 1. Contact / Lead Submission

**Create Lead**
```http
POST /api/leads/
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I'm interested in your product",
  "inquiry_type": "contact"
}

inquiry_type options: "contact" | "investor" | "manufacturer" | "rfq"

Response: 201 Created
{
  "id": "uuid",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I'm interested in your product",
  "inquiry_type": "contact",
  "created_at": "2025-01-05T12:00:00Z"
}
```

### 2. RFQ (Request for Quote) Submission

**Create RFQ**
```http
POST /api/rfq/
Content-Type: multipart/form-data

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "message": "Need prototype quote",
  "attachment": <file>  // Optional
}

Response: 201 Created
{
  "id": "uuid",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "message": "Need prototype quote",
  "attachment_url": "/media/rfq/file.pdf",
  "created_at": "2025-01-05T12:00:00Z"
}
```

### 3. Manufacturers (Read-Only)

**List Active Manufacturers**
```http
GET /api/manufacturers/

Response: 200 OK
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "name": "Precision Manufacturing Co.",
      "description": "Custom engine components",
      "phone": "+1234567890",
      "email": "contact@precision.com",
      "website": "https://precision.com",
      "active": true
    }
  ]
}
```

**Get Single Manufacturer**
```http
GET /api/manufacturers/{id}/

Response: 200 OK
{
  "id": "uuid",
  "name": "Precision Manufacturing Co.",
  "description": "Custom engine components",
  "address": "123 Industry St, City, State 12345",
  "phone": "+1234567890",
  "email": "contact@precision.com",
  "website": "https://precision.com",
  "active": true,
  "created_at": "2025-01-01T00:00:00Z"
}
```

### 4. Documents (Read-Only)

**List Documents**
```http
GET /api/documents/
GET /api/documents/?category=patent  // Filter by category

Response: 200 OK
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "file_name": "Provisional_Patent.pdf",
      "file_url": "/media/documents/2025/01/Provisional_Patent.pdf",
      "category": "patent",
      "description": "Provisional patent filing",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}

Categories: "patent" | "diagram" | "investor" | "technical" | "other"
```

**Get Single Document**
```http
GET /api/documents/{id}/

Response: 200 OK
{
  "id": "uuid",
  "file_name": "Provisional_Patent.pdf",
  "file_url": "/media/documents/2025/01/Provisional_Patent.pdf",
  "category": "patent",
  "description": "Provisional patent filing",
  "created_at": "2025-01-01T00:00:00Z"
}
```

### 5. Content Blocks (Read-Only)

**List Content Blocks**
```http
GET /api/content/

Response: 200 OK
[
  {
    "id": "uuid",
    "slug": "homepage_hero",
    "title": "Homepage Hero",
    "html_content": "<h1>Welcome</h1>",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-05T12:00:00Z"
  }
]
```

**Get Single Content Block by Slug**
```http
GET /api/content/{slug}/

Response: 200 OK
{
  "id": "uuid",
  "slug": "homepage_hero",
  "title": "Homepage Hero",
  "html_content": "<h1>Welcome</h1>",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-05T12:00:00Z"
}
```

## Admin Endpoints (Requires Authentication)

### 1. Manufacturers (Admin)

**Create Manufacturer**
```http
POST /api/manufacturers/
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Manufacturing Co.",
  "description": "Specialized in custom parts",
  "address": "456 Factory Rd",
  "phone": "+1234567890",
  "email": "info@newmfg.com",
  "website": "https://newmfg.com",
  "active": true
}

Response: 201 Created
```

**Update Manufacturer**
```http
PUT /api/manufacturers/{id}/
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "active": false
}

Response: 200 OK
```

**Delete Manufacturer**
```http
DELETE /api/manufacturers/{id}/
Authorization: Bearer {token}

Response: 204 No Content
```

### 2. Documents (Admin)

**Upload Document**
```http
POST /api/documents/
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "file": <file>,
  "file_name": "Technical_Spec.pdf",
  "category": "technical",
  "description": "Technical specifications document"
}

Response: 201 Created
```

**Update Document Metadata**
```http
PUT /api/documents/{id}/
Authorization: Bearer {token}
Content-Type: application/json

{
  "file_name": "Updated_Name.pdf",
  "category": "patent",
  "description": "Updated description"
}

Response: 200 OK
```

**Delete Document**
```http
DELETE /api/documents/{id}/
Authorization: Bearer {token}

Response: 204 No Content
```

### 3. Leads (Admin)

**List All Leads**
```http
GET /api/leads/
Authorization: Bearer {token}

Response: 200 OK
{
  "count": 50,
  "next": "http://api/leads/?page=2",
  "previous": null,
  "results": [...]
}
```

**Delete Lead**
```http
DELETE /api/leads/{id}/
Authorization: Bearer {token}

Response: 204 No Content
```

### 4. RFQ Submissions (Admin)

**List All RFQs**
```http
GET /api/rfq/
Authorization: Bearer {token}

Response: 200 OK
{
  "count": 25,
  "next": null,
  "previous": null,
  "results": [...]
}
```

**Delete RFQ**
```http
DELETE /api/rfq/{id}/
Authorization: Bearer {token}

Response: 204 No Content
```

### 5. Content Blocks (Admin)

**Create Content Block**
```http
POST /api/content/
Authorization: Bearer {token}
Content-Type: application/json

{
  "slug": "about_section",
  "title": "About Section",
  "html_content": "<div><h2>About Us</h2></div>"
}

Response: 201 Created
```

**Update Content Block**
```http
PUT /api/content/{slug}/
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "html_content": "<div><h2>Updated Content</h2></div>"
}

Response: 200 OK
```

**Delete Content Block**
```http
DELETE /api/content/{slug}/
Authorization: Bearer {token}

Response: 204 No Content
```

## Error Responses

### 400 Bad Request
```json
{
  "field_name": ["Error message"]
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error
```json
{
  "detail": "An error occurred"
}
```

## Pagination

List endpoints return paginated results:

```json
{
  "count": 100,
  "next": "http://api/endpoint/?page=2",
  "previous": null,
  "results": [...]
}
```

Query parameters:
- `?page=2` - Get specific page
- `?page_size=50` - Change page size (max 100)

## Filtering

Manufacturers:
- `?active=true` - Only active manufacturers (admin only)

Documents:
- `?category=patent` - Filter by category

## API Schema

Interactive API documentation:
- Swagger UI: `http://localhost:8000/api/docs/`
- OpenAPI Schema: `http://localhost:8000/api/schema/`

## Rate Limiting

(To be implemented in production)
- Public endpoints: 100 requests/hour
- Authenticated endpoints: 1000 requests/hour

## CORS

Allowed origins configured via `CORS_ALLOWED_ORIGINS` environment variable.
