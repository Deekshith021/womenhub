# WomenSkillHub API Documentation

## Base URL
\`\`\`
http://localhost:3000/api
\`\`\`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

\`\`\`
Authorization: Bearer <JWT_TOKEN>
\`\`\`

## Endpoints

### Authentication

#### Register User
\`\`\`
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "student",
  "language": "en"
}

Response: 201 Created
{
  "success": true,
  "user": { "id", "email", "firstName", "lastName", "role" },
  "token": "eyJhbGc..."
}
\`\`\`

#### Login
\`\`\`
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response: 200 OK
{
  "success": true,
  "user": { "id", "email", "firstName", "lastName", "role" },
  "token": "eyJhbGc..."
}
\`\`\`

### Courses

#### List Courses
\`\`\`
GET /courses?category=coding

Response: 200 OK
{
  "courses": [
    {
      "id": "uuid",
      "title": "Basics of Coding",
      "description": "...",
      "category": "coding",
      "price": 0,
      "duration": 4,
      "status": "approved"
    }
  ]
}
\`\`\`

#### Get Course Details
\`\`\`
GET /courses/:id

Response: 200 OK
{
  "course": { ... }
}
\`\`\`

#### Create Course (Instructor)
\`\`\`
POST /courses
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "title": "Advanced Python",
  "description": "Learn advanced Python concepts",
  "category": "coding",
  "price": 0,
  "duration": 8
}

Response: 201 Created
{
  "id": "uuid",
  "success": true
}
\`\`\`

#### Enroll in Course
\`\`\`
POST /courses/:id/enroll
Authorization: Bearer <TOKEN>

Response: 201 Created
{
  "enrollmentId": "uuid",
  "success": true
}
\`\`\`

### Marketplace

#### List Products
\`\`\`
GET /marketplace/products?category=traditional_wear

Response: 200 OK
{
  "products": [
    {
      "id": "uuid",
      "title": "Handmade Saree",
      "description": "...",
      "price": 50,
      "category": "traditional_wear",
      "inventory": 10
    }
  ]
}
\`\`\`

#### Create Product (Seller)
\`\`\`
POST /marketplace/products
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "title": "Embroidered Saree",
  "description": "Beautiful handmade saree",
  "price": 50,
  "category": "traditional_wear",
  "inventory": 10,
  "variants": ["Color: Red", "Size: M"]
}

Response: 201 Created
{
  "id": "uuid",
  "success": true
}
\`\`\`

#### Checkout
\`\`\`
POST /marketplace/checkout
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "productId": "uuid",
  "quantity": 1
}

Response: 201 Created
{
  "orderId": "uuid",
  "paymentId": "test_...",
  "amount": 50,
  "currency": "USD",
  "testMode": true,
  "clientSecret": "pi_test_..."
}
\`\`\`

### AI Endpoints

#### AI Tutor Chat
\`\`\`
POST /ai/chat
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "message": "How do I use loops in Python?",
  "courseId": "uuid",
  "lessonId": "uuid",
  "context": "tutor"
}

Response: 200 OK
{
  "response": "Based on the lesson content...",
  "isReal": false,
  "timestamp": 1234567890
}
\`\`\`

#### AI Pricing Suggestion
\`\`\`
POST /api/ai/pricing
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "productTitle": "Handmade Saree",
  "category": "traditional_wear",
  "materials": "Silk, embroidery"
}

Response: 200 OK
{
  "suggestedPrice": 45,
  "priceRange": { "min": 30, "max": 60 },
  "reasoning": "..."
}
\`\`\`

#### AI Financial Advisor
\`\`\`
POST /api/ai/financial-advisor
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "income": 30000,
  "expenses": 20000,
  "goals": ["emergency_fund", "business_startup"],
  "context": "budgeting"
}

Response: 200 OK
{
  "advice": "Based on your income...",
  "recommendations": ["Save 20%", "Track expenses"],
  "isReal": false
}
\`\`\`

### Financial

#### Get Loan Schemes
\`\`\`
GET /loans/schemes?category=business_finance

Response: 200 OK
{
  "schemes": [
    {
      "id": "uuid",
      "name": "Prime Minister MUDRA Yojana",
      "description": "...",
      "eligibilityJson": "{}",
      "applicationUrl": "https://..."
    }
  ]
}
\`\`\`

#### Check Eligibility
\`\`\`
POST /loans/check-eligibility
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "schemeId": "uuid",
  "age": 28,
  "businessType": "micro",
  "income": 30000
}

Response: 200 OK
{
  "eligible": true,
  "score": 0.85,
  "reasons": ["Meets age requirement", "Income qualifies"]
}
\`\`\`

### Cyber Safety

#### Report Incident
\`\`\`
POST /cyber/report
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "incidentType": "phishing",
  "description": "Received suspicious email...",
  "anonymous": false
}

Response: 201 Created
{
  "reportId": "uuid",
  "success": true
}
\`\`\`

### Admin

#### Get Analytics
\`\`\`
GET /admin/analytics
Authorization: Bearer <ADMIN_TOKEN>

Response: 200 OK
{
  "metrics": {
    "totalUsers": 150,
    "activeEnrollments": 45,
    "totalRevenue": 5000
  },
  "courseStats": [...]
}
\`\`\`

## Error Responses

### 400 Bad Request
\`\`\`json
{
  "error": "Missing required fields"
}
\`\`\`

### 401 Unauthorized
\`\`\`json
{
  "error": "Unauthorized"
}
\`\`\`

### 403 Forbidden
\`\`\`json
{
  "error": "Forbidden"
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "error": "Resource not found"
}
\`\`\`

### 500 Server Error
\`\`\`json
{
  "error": "Internal server error"
}
\`\`\`

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

## Pagination

List endpoints support pagination:

\`\`\`
GET /courses?page=1&limit=10

Response:
{
  "courses": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
\`\`\`

## Webhooks

### Payment Webhook
\`\`\`
POST /payments/webhook

{
  "type": "test_payment_success",
  "paymentId": "test_...",
  "orderId": "uuid",
  "status": "paid"
}
\`\`\`

## Testing

Use these test credentials:

- **Admin**: admin@womenskillhub.com / admin123
- **Instructor**: instructor@womenskillhub.com / instructor123
- **Seller**: seller@womenskillhub.com / seller123

All test mode payments use Stripe test cards:
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
