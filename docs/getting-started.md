# Getting Started with WomenSkillHub

## Installation

### Step 1: Clone Repository
\`\`\`bash
git clone https://github.com/yourusername/womenskillhub.git
cd womenskillhub
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3: Initialize Database
\`\`\`bash
npm run db:init
npm run db:seed
\`\`\`

This creates:
- SQLite database (`data/skillhub.db`)
- All required tables
- Demo users and sample data

### Step 4: Start Development
\`\`\`bash
npm run dev
\`\`\`

The app starts at `http://localhost:3000`

## First Steps

### As a Student
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Create account with any email/password
4. Go to "My Courses"
5. Click "Enroll Now" on a course
6. View dashboard

### As an Instructor
1. Sign up with role "Instructor"
2. Go to dashboard
3. Click "Create Course"
4. Add lessons and content
5. Submit for approval

### As Admin
1. Go to http://localhost:3000/admin/login
2. Email: `admin@womenskillhub.com`
3. Password: `admin123`
4. View analytics and manage platform

## Development Tips

### Database Operations
\`\`\`bash
# Reset database
npm run db:reset

# Seed additional data
npm run db:seed

# View database contents
sqlite3 data/skillhub.db "SELECT * FROM users;"
\`\`\`

### Running Tests
\`\`\`bash
# Run all tests
npm test

# Run specific test file
npm test auth.test.ts

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
\`\`\`

### Debugging
- Use VS Code debugger with Node.js debug configuration
- Add `console.log` statements
- Check browser DevTools (F12)
- Check Network tab for API calls

### Environment Setup
\`\`\`bash
# Copy example env file
cp .env.example .env.local

# Edit as needed
nano .env.local
\`\`\`

## Troubleshooting

### Database Issues
**Problem**: "Database locked" error
\`\`\`bash
# Solution: Remove corrupted database
rm -f data/skillhub.db

# Reinitialize
npm run db:init
npm run db:seed
\`\`\`

### Port Already in Use
\`\`\`bash
# If 3000 is taken, use different port
npm run dev -- -p 3001
\`\`\`

### Module Import Errors
\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

### API Not Responding
- Check that backend server is running
- Verify API endpoint in browser console
- Check network tab for failed requests
- Look at terminal for error messages

## Project Structure

\`\`\`
womenskillhub/
├── app/
│   ├── api/                    # Backend API routes
│   │   ├── auth/              # Authentication
│   │   ├── courses/           # Course management
│   │   ├── marketplace/       # Marketplace
│   │   ├── ai/                # AI endpoints
│   │   ├── payments/          # Payment webhooks
│   │   ├── loans/             # Financial
│   │   ├── cyber/             # Cyber safety
│   │   └── admin/             # Admin APIs
│   ├── page.tsx               # Landing page
│   ├── layout.tsx             # Root layout
│   ├── login/                 # Login page
│   ├── signup/                # Signup page
│   ├── dashboard/             # User dashboard
│   ├── courses/               # Course pages
│   ├── marketplace/           # Marketplace pages
│   ├── financial/             # Financial pages
│   ├── cyber-safety/          # Cyber safety pages
│   ├── mentorship/            # Mentorship pages
│   ├── admin/                 # Admin panel
│   └── globals.css            # Global styles
├── components/
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── db.ts                  # Database helpers
│   ├── auth.ts                # Auth utilities
│   └── types.ts               # TypeScript types
├── scripts/
│   ├── db-init.js             # Initialize DB
│   └── db-seed.js             # Seed demo data
├── __tests__/                 # Unit tests
├── e2e/                       # E2E tests
├── docs/                      # Documentation
├── public/                    # Static assets
├── .github/workflows/         # CI/CD pipelines
├── .env.example               # Environment template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── next.config.mjs            # Next.js config
└── README.md                  # Project README
\`\`\`

## Next Steps

1. **Explore the codebase**: Review files in `/app` and `/lib`
2. **Read documentation**: Check `/docs` folder
3. **Run tests**: `npm test` to verify setup
4. **Start coding**: Pick a task from [TASKS.md](TASKS.md)
5. **Join community**: Check GitHub discussions

## Common Commands

\`\`\`bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Testing
npm test                 # Run unit tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
npm run test:e2e        # E2E tests

# Database
npm run db:init         # Initialize database
npm run db:seed         # Seed demo data
npm run db:reset        # Reset everything

# Code Quality
npm run lint            # Run linter
npm run lint -- --fix   # Auto-fix issues
\`\`\`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## Getting Help

- Check existing GitHub issues
- Read documentation in `/docs`
- Review example code in `/app`
- Ask in GitHub Discussions
- Check troubleshooting section above

Happy coding! 🚀
