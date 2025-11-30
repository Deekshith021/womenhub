# WomenSkillHub Architecture

## System Overview

\`\`\`
┌─────────────────────────────────────────┐
│         Frontend (Next.js React)        │
├─────────────────────────────────────────┤
│  - Landing Page                         │
│  - Auth (Login/Signup)                  │
│  - Course Catalog & Player              │
│  - Marketplace                          │
│  - Financial Tools                      │
│  - Cyber Safety                         │
└────────────────────┬────────────────────┘
                     │ HTTP/REST
┌─────────────────────────────────────────┐
│    Backend API Routes (Next.js)         │
├─────────────────────────────────────────┤
│  - Authentication & RBAC                │
│  - Skill Development APIs               │
│  - Marketplace APIs                     │
│  - Financial APIs                       │
│  - Cyber Safety APIs                    │
│  - Admin APIs                           │
└────────────────────┬────────────────────┘
                     │
┌─────────────────────────────────────────┐
│       Database Layer (SQLite/MongoDB)   │
├─────────────────────────────────────────┤
│  - Users & Auth                         │
│  - Courses & Lessons                    │
│  - Products & Orders                    │
│  - Financial Data                       │
│  - Cyber Incidents                      │
└─────────────────────────────────────────┘
\`\`\`

## Module Architecture

### Skill Development Module
- Course catalog with search/filter
- Lesson player with video/audio/PDF
- Quizzes and assignments
- Progress tracking
- Certificate generation
- AI tutor chatbot

### Marketplace Module
- Product listing and CRUD
- Shopping cart and checkout
- Order management
- Seller dashboard
- Payment integration
- Review system

### Financial Literacy Module
- Budget tracker
- Savings goal management
- Expense tracking
- Loan schemes catalog
- EMI calculator
- Financial advisor AI

### Cyber Safety Module
- Interactive tutorials
- Phishing simulation
- Incident reporting
- Regional guidance
- PDF reports

### Rural Support Module
- i18n support (EN, Hindi, etc.)
- Voice-first UI
- Offline modules
- Government scheme finder
- Community groups
- Field agent tools

## Authentication & Authorization

### Roles
- Admin: Full platform control
- Instructor: Course creation & management
- Seller: Marketplace product management
- Student: Course enrollment & learning
- Mentee: Mentorship request
- Field Agent: User registration & data upload

### Token-based Auth
\`\`\`
User Login
    ↓
Verify Credentials
    ↓
Generate JWT Token
    ↓
Token Stored in localStorage
    ↓
Include in API Request Headers
    ↓
Verify on Backend
    ↓
Grant/Deny Access
\`\`\`

## Data Models

### Core Entities
- Users
- Courses & Lessons
- Enrollments
- Products & Orders
- Budgets & Expenses
- Mentorship Requests
- Cyber Incidents
- Government Schemes
- Certificates

## API Design

### RESTful Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/courses` - List courses
- `POST /api/courses/:id/enroll` - Enroll
- `GET /api/marketplace/products` - List products
- `POST /api/marketplace/checkout` - Create order
- `POST /api/payments/webhook` - Payment events
- `GET /api/admin/analytics` - Admin dashboard

### Authentication Header
\`\`\`
Authorization: Bearer <JWT_TOKEN>
\`\`\`

## Technology Stack

- **Frontend**: React 19, Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, SQLite/MongoDB
- **AI**: AI SDK with mock mode
- **Payments**: Stripe (test mode default)
- **i18n**: next-intl
- **Testing**: Jest, Playwright
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel, Docker, or VPS

## Database Technology

**MongoDB (Cloud or Local)**
- Document-based storage
- Mongoose ODM for queries
- Connection: Vercel, VPS, or self-hosted
- Production: MongoDB Atlas recommended

## Caching Strategy

- User sessions in localStorage
- API response caching with SWR
- Course content caching
- Static asset caching

## Error Handling

- Consistent error response format
- HTTP status codes
- User-friendly error messages
- Backend validation
- Input sanitization
