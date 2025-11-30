# WomenSkillHub - Quick Start Guide

Get WomenSkillHub running in 5 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- Git
- A code editor (VS Code recommended)

## Installation (5 minutes)

### 1. Clone Repository
\`\`\`bash
git clone https://github.com/yourusername/womenskillhub.git
cd womenskillhub
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Initialize Database
\`\`\`bash
npm run db:init
npm run db:seed
\`\`\`

### 4. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

### 5. Open in Browser
\`\`\`
http://localhost:3000
\`\`\`

**Done!** 🎉

## First Time Setup

### Create Your First Account

1. Click "Sign Up"
2. Fill in your details:
   - First Name: Your name
   - Last Name: Your surname
   - Email: your@email.com
   - Password: Any password
   - Role: Choose "Student" or "Instructor"
3. Click "Create Account"
4. You're logged in!

### Explore the Platform

**As a Student:**
- Go to "My Courses"
- Click "Enroll Now" on any course
- View course content
- Complete quizzes

**As an Instructor:**
- Go to "Create Course"
- Add course details
- Upload lessons
- Submit for approval

**As Admin:**
- Go to http://localhost:3000/admin/login
- Email: `admin@womenskillhub.com`
- Password: `admin123`
- View analytics and manage platform

## Demo Accounts

### Student
- Email: `test@example.com`
- Password: `test123`
- (Or create your own)

### Instructor
- Email: `instructor@womenskillhub.com`
- Password: `instructor123`

### Seller
- Email: `seller@womenskillhub.com`
- Password: `seller123`

### Admin
- Email: `admin@womenskillhub.com`
- Password: `admin123`

## Common Tasks

### Run Tests
\`\`\`bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
npm run test:e2e           # E2E tests
\`\`\`

### Reset Database
\`\`\`bash
npm run db:reset
\`\`\`

### Build for Production
\`\`\`bash
npm run build
npm run start
\`\`\`

### Check Code Quality
\`\`\`bash
npm run lint
npm run lint -- --fix      # Auto-fix issues
\`\`\`

## Project Structure

\`\`\`
womenskillhub/
├── app/                    # Next.js app directory
│   ├── api/               # Backend API routes
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── dashboard/         # User dashboard
│   ├── courses/           # Courses page
│   ├── marketplace/       # Marketplace page
│   ├── financial/         # Financial tools
│   ├── cyber-safety/      # Cyber safety
│   ├── admin/             # Admin panel
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utilities and helpers
├── scripts/               # Setup scripts
├── __tests__/             # Unit tests
├── e2e/                   # E2E tests
├── docs/                  # Documentation
├── public/                # Static files
└── README.md              # Project README
\`\`\`

## Troubleshooting

### Port 3000 Already in Use
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Database Errors
\`\`\`bash
npm run db:reset
\`\`\`

### Module Not Found
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### API Not Responding
- Check terminal for errors
- Verify backend is running
- Check browser console (F12)

## Next Steps

1. **Read Documentation**: Check `/docs` folder
2. **Explore Code**: Review `/app` and `/lib`
3. **Run Tests**: `npm test`
4. **Start Contributing**: Pick a task from [TASKS.md](TASKS.md)
5. **Join Community**: Check GitHub discussions

## Environment Variables

Copy `.env.example` to `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your settings:

\`\`\`
DATABASE_URL=./data/skillhub.db
JWT_SECRET=your-secret-key
NODE_ENV=development
\`\`\`

## Useful Links

- [Full Documentation](README.md)
- [Architecture Guide](docs/architecture.md)
- [API Documentation](docs/api.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Task List](TASKS.md)
- [FAQ](docs/faq.md)

## Getting Help

- 📖 Read the [documentation](docs/)
- 🐛 Check [GitHub Issues](https://github.com/yourusername/womenskillhub/issues)
- 💬 Join [GitHub Discussions](https://github.com/yourusername/womenskillhub/discussions)
- 📧 Email: support@womenskillhub.com

## What's Next?

- [ ] Complete your first course
- [ ] List a product on marketplace
- [ ] Create a budget
- [ ] Report a cyber incident
- [ ] Request a mentor
- [ ] Contribute to the project

---

**Happy learning! 🚀**

Questions? Check [FAQ.md](docs/faq.md) or open an issue.
