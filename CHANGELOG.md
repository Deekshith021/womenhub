# Changelog

All notable changes to WomenSkillHub will be documented in this file.

## [2.0.0] - 2024-01-XX

### Added
- MongoDB migration from SQLite
- Mongoose ODM integration
- 13 MongoDB collections
- MongoDB Atlas cloud support
- Support for both local and cloud MongoDB
- Comprehensive MongoDB setup guides
- Migration documentation

### Changed
- Database from SQLite to MongoDB
- All API routes updated for MongoDB/Mongoose
- Database initialization scripts rewritten
- Seed scripts updated for Mongoose

### Removed
- Removed Docker deployment support
- sqlite3 dependency

## [1.0.0] - 2024-01-15

### Added
- Initial release of WomenSkillHub
- Skill Development Portal with course management
- Women Entrepreneurship Marketplace
- Financial Literacy & Budgeting tools
- Cyber Safety Education module
- Rural Women Support & Training features
- Mentor-Mentee matching system
- Admin Panel with analytics
- Role-based access control (RBAC)
- Authentication with JWT tokens
- SQLite database with full schema
- API endpoints for all modules
- Frontend with React and Next.js
- Admin panel as separate SPA
- Comprehensive testing suite
- CI/CD pipeline with GitHub Actions
- Complete documentation

### Features
- User registration and authentication
- Course enrollment and progress tracking
- Certificate generation
- Product listing and marketplace
- Shopping cart and checkout (test mode)
- Budget tracking and financial tools
- EMI calculator
- Government scheme finder
- Cyber incident reporting
- Phishing simulations
- Mentor matching algorithm
- Admin dashboard with analytics
- Multi-language support (i18n setup)
- Offline module downloads
- Voice-first UI support

### Technical
- Next.js 16 with App Router
- React 19 with TypeScript
- Tailwind CSS v4
- SQLite database (upgraded to MongoDB in v2.0.0)
- JWT authentication
- shadcn/ui components
- Jest and Playwright testing
- GitHub Actions CI/CD

## [Unreleased]

### Planned
- Real AI integration (OpenAI, Anthropic)
- Stripe payment integration
- Advanced mentor matching with ML
- Mobile app (React Native)
- Real-time notifications
- Video transcoding
- Advanced analytics
- Multi-tenancy support
- GraphQL API option
- Kubernetes deployment
- Advanced security (2FA, OAuth)

### Known Issues
- Admin panel UI incomplete
- Some E2E tests need refinement
- Payment webhook testing limited
- i18n implementation partial

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
