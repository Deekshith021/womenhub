# 🚀 WomenSkillHub

**Empowering women through skill development, entrepreneurship, financial literacy, cyber safety, and rural support.**

A comprehensive, production-ready platform built with modern technology. Completely open-source and free to run locally.

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [Modules](#-modules)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### 🎓 Skill Development Portal
- Comprehensive course catalog (coding, tailoring, beauty, agriculture, etc.)
- AI-powered tutoring chatbot
- Interactive lessons with video, audio, and PDF
- Quiz and assignment system
- Progress tracking and certificates
- Recommendation engine

### 💼 Women Entrepreneurship Marketplace
- Seller dashboard with analytics
- Product management with inventory
- Shopping cart and secure checkout
- AI pricing suggestions
- Order and payout management
- Review and dispute system

### 💰 Financial Literacy & Budgeting
- Budget tracker with expense management
- Savings goal tracker
- Government loan schemes catalog
- Eligibility checker
- EMI calculator
- AI financial advisor

### 🔐 Cyber Safety Education
- Interactive tutorials
- Phishing simulations
- Incident reporting system
- Regional safety guidance
- Anonymized incident tracking
- PDF report generation

### 🌾 Rural Women Support
- Multi-language support (EN, Hindi, expanding)
- Voice-first interface for low literacy
- Offline module downloads
- Government scheme finder
- Community groups and discussions
- Field agent registration tools

### 👥 Mentor-Mentee System
- Skill-based mentor matching
- Booking and scheduling
- Session tracking and feedback
- Rating and review system

### 👨‍💼 Admin Panel
- User and role management
- Course approval workflow
- Marketplace moderation
- Financial reconciliation
- Analytics and reporting
- System configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org/))
- npm or yarn
- MongoDB 8.1+ ([download](https://www.mongodb.com/try/download/community) or use existing installation)
- 5-10 minutes of your time

### MongoDB Setup

**Option 1: Use Existing Local MongoDB**
If you already have MongoDB running on localhost:27017:
\`\`\`bash
# Verify MongoDB is running
mongosh --version
mongosh --eval "db.version()"
\`\`\`

**Option 2: Install MongoDB Community Edition**
\`\`\`bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install -y mongodb
sudo systemctl start mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community and run installer
\`\`\`

**Option 3: MongoDB Atlas (Cloud)**
\`\`\`bash
# Create free cluster at https://www.mongodb.com/cloud/atlas
# Copy connection string to .env.local:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/womenhub
\`\`\`

### Installation

1. **Clone and setup**
   \`\`\`bash
   git clone https://github.com/yourusername/womenskillhub.git
   cd womenskillhub
   npm install
   \`\`\`

2. **Configure database**
   \`\`\`bash
   # Copy environment template
   cp .env.example .env.local
   
   # Default MongoDB URI is already set to localhost:27017/womenhub
   # Edit if you're using MongoDB Atlas or different host
   \`\`\`

3. **Initialize database**
   \`\`\`bash
   npm run db:init    # Connect to MongoDB and verify connection
   npm run db:seed    # Seed demo data
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Visit the app**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Demo Credentials

**Student Login:**
- Email: `test@example.com`
- Password: Any password (sign up to create account)

**Admin Login:**
- Email: `admin@womenskillhub.com`
- Password: `admin123`

**Instructor Login:**
- Email: `instructor@womenskillhub.com`
- Password: `instructor123`

**Seller Login:**
- Email: `seller@womenskillhub.com`
- Password: `seller123`

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19, Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **AI**: AI SDK (mock mode by default)
- **Payments**: Stripe (test mode default)
- **Testing**: Jest, Playwright
- **Deployment**: Vercel, Docker, VPS

### System Design

\`\`\`
┌─────────────────────────┐
│   Frontend SPA (React)  │
├─────────────────────────┤
│ - Landing Page          │
│ - Auth Pages            │
│ - Dashboards            │
│ - Course Player         │
│ - Marketplace           │
└────────────┬────────────┘
             │ HTTP/REST API
┌────────────────────────────────┐
│    Backend (Next.js Routes)    │
├────────────────────────────────┤
│ - Authentication & RBAC         │
│ - Module APIs                   │
│ - AI Endpoints                  │
│ - Payment Webhooks              │
└────────────┬───────────────────┘
             │
┌────────────────────────────┐
│   MongoDB Database         │
├────────────────────────────┤
│ Collections:               │
│ - users                    │
│ - courses & lessons        │
│ - enrollments              │
│ - products & orders        │
│ - budgets & schemes        │
│ - cyber_incidents          │
│ - mentorship_requests      │
│ - assessments & certs      │
└────────────────────────────┘

┌────────────────────────┐
│   Admin Panel (React)  │
├────────────────────────┤
│ - Admin Dashboard      │
│ - User Management      │
│ - Approvals            │
│ - Analytics            │
└────────────────────────┘
\`\`\`

### Database Collections

- **users**: User accounts and auth
- **courses**: Course catalogs
- **lessons**: Course content
- **enrollments**: Student progress
- **products**: Marketplace items
- **orders**: Purchase records
- **budgets**: Financial tracking
- **government_schemes**: Loan/scheme info
- **cyber_incidents**: Safety reports
- **mentorship_requests**: Mentee-mentor matches
- **assessments**: Quiz content
- **assessment_responses**: Quiz submissions
- **certificates**: Course completion certs

## 📦 Modules

### 1. Skill Development
\`\`\`bash
/api/courses              # Course management
/api/courses/:id/enroll   # Enrollment
/api/lessons              # Lesson content
/api/assessments          # Quizzes
/api/certificates         # Certificate generation
/api/ai/chat              # AI tutor
\`\`\`

### 2. Marketplace
\`\`\`bash
/api/marketplace/products     # Product CRUD
/api/marketplace/checkout     # Shopping cart
/api/orders                   # Order management
/api/payments/webhook         # Payment events
\`\`\`

### 3. Financial Literacy
\`\`\`bash
/api/budgets              # Budget tracking
/api/loans/schemes        # Loan schemes
/api/loans/check-eligibility  # Eligibility
/api/ai/financial-advisor     # AI suggestions
\`\`\`

### 4. Cyber Safety
\`\`\`bash
/api/cyber/report         # Incident reporting
/api/cyber/simulations    # Phishing simulations
\`\`\`

### 5. Admin
\`\`\`bash
/api/admin/analytics      # Dashboard metrics
/api/admin/approve-course # Content moderation
/api/admin/users          # User management
\`\`\`

## 🧪 Testing

### Run All Tests
\`\`\`bash
npm test                    # Unit tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
npm run test:e2e           # End-to-end tests
\`\`\`

### Test Structure
\`\`\`
__tests__/
├── auth.test.ts           # Authentication tests
├── permissions.test.ts    # RBAC tests
└── api.test.ts            # API endpoint tests

e2e/
├── auth-flow.spec.ts      # Auth E2E
├── courses.spec.ts        # Course E2E
└── marketplace.spec.ts    # Marketplace E2E
\`\`\`

### Coverage Target
- Minimum 70% code coverage
- Unit tests for all business logic
- E2E tests for critical user flows

## 🚢 Deployment

### One-Click Deploy (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fwomenskillhub)

### Docker Deployment

\`\`\`bash
docker build -t womenskillhub .
docker run -p 3000:3000 -e MONGODB_URI=mongodb://mongo:27017/womenhub --link mongo womenskillhub
\`\`\`

### MongoDB Atlas Deployment

1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Set environment variable: `MONGODB_URI=mongodb+srv://...`
4. Deploy with your hosting provider

### Manual VPS Deployment

See [docs/deployment.md](docs/deployment.md) for detailed instructions.

### Environment Variables

\`\`\`bash
# Copy template
cp .env.example .env.local

# Edit with your values
# Required:
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb://localhost:27017/womenhub

# Optional:
AI_API_KEY=your-ai-provider-key
STRIPE_SECRET_KEY=your-stripe-key
\`\`\`

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Tasks
1. Review [TASKS.md](TASKS.md) for current priorities
2. Pick an issue
3. Make your changes
4. Run tests: `npm test`
5. Submit PR

### Development Workflow

\`\`\`bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and test
npm run dev
npm test

# Commit with conventional messages
git commit -m "feat: Add new feature"

# Push and create PR
git push origin feature/amazing-feature
\`\`\`

## 📚 Documentation

- [Architecture Guide](docs/architecture.md)
- [Deployment Guide](docs/deployment.md)
- [API Documentation](docs/api.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Task List](TASKS.md)
- [MongoDB Setup](docs/mongodb-setup.md)

## 🔐 Security

- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- Secure headers configuration
- HTTPS in production
- MongoDB connection string security

## 📊 Project Status

| Feature | Status | Notes |
|---------|--------|-------|
| Core Infrastructure | ✅ Complete | MongoDB, Backend, Auth |
| Skill Development | 🔄 In Progress | Core features done |
| Marketplace | 🔄 In Progress | Payment integration needed |
| Financial Literacy | ⏳ Todo | UI development |
| Cyber Safety | ⏳ Todo | Simulation system needed |
| Rural Support | ⏳ Todo | i18n setup needed |
| Admin Panel | 🔄 In Progress | Core UI done |
| Testing | 🔄 In Progress | 50% coverage |
| CI/CD | ✅ Complete | GitHub Actions setup |

## 🗺️ Roadmap

- [x] Backend architecture with MongoDB
- [x] Frontend foundation
- [x] Authentication system
- [ ] Complete all module UIs
- [ ] Real AI integration
- [ ] Payment gateway testing
- [ ] Full test coverage
- [ ] Production deployment
- [ ] Mobile app
- [ ] Advanced analytics

## 📞 Support

- 📧 Email: support@womenskillhub.com (coming soon)
- 💬 GitHub Discussions
- 🐛 GitHub Issues for MongoDB-related problems
- 📖 Documentation in /docs

## 📄 License

This project is open-source and available under the MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [MongoDB](https://www.mongodb.com/)
- ODM by [Mongoose](https://mongoosejs.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Charts from [Recharts](https://recharts.org/)

---

**Made with ❤️ for empowering women worldwide**
👤 Project Owner & Author

WomenSkillHub is envisioned, created, and maintained by **Deekshith K V**.

This project is built with the mission to empower women through skill development, entrepreneurship, financial knowledge, online safety, and rural upliftment — freely and openly accessible to everyone.

The entire platform — backend, frontend, admin panel, AI modules, database architecture, and documentation — is designed and implemented with dedication to create real social impact.

For collaborations, contributions, or improvements, feel free to connect or open an issue or pull request.

— Deekshith K V
Project Owner • Lead Developer

[⬆ Back to top](#-womenskillhub)
#   w o m e n h u b 
 
 
