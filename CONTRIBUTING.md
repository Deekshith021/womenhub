# Contributing to WomenSkillHub

## Getting Started

1. Fork the repository
2. Clone: `git clone https://github.com/your-fork/womenskillhub.git`
3. Create branch: `git checkout -b feature/amazing-feature`
4. Setup: `npm install && npm run db:init && npm run db:seed`
5. Start dev: `npm run dev`

## Development Workflow

### Code Style
- Use TypeScript strictly
- Follow ESLint rules
- Format with Prettier
- Use meaningful variable names

### Testing
\`\`\`bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage

# E2E tests
npm run test:e2e
\`\`\`

### Commit Messages
\`\`\`
feat: Add new course recommendation engine
fix: Correct enrollment date validation
docs: Update API documentation
test: Add tests for payment webhook
refactor: Simplify auth middleware
\`\`\`

### Pull Request Process
1. Update tests and documentation
2. Ensure all tests pass
3. Update CHANGELOG.md
4. Request review from maintainers
5. Address feedback
6. Merge when approved

## Project Structure

\`\`\`
womenskillhub/
├── app/
│   ├── api/              # Backend API routes
│   ├── page.tsx          # Landing page
│   ├── layout.tsx        # Root layout
│   ├── login/            # Auth pages
│   ├── signup/
│   ├── dashboard/        # User dashboard
│   ├── courses/          # Course pages
│   ├── marketplace/      # Marketplace pages
│   ├── financial/        # Financial literacy
│   ├── cyber-safety/     # Cyber safety
│   ├── admin/            # Admin panel
│   └── globals.css
├── components/
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── db.ts             # Database helpers
│   ├── auth.ts           # Auth utilities
│   └── types.ts          # TypeScript types
├── scripts/
│   ├── db-init.js        # Initialize DB
│   └── db-seed.js        # Seed demo data
├── __tests__/            # Unit tests
├── e2e/                  # E2E tests
├── docs/                 # Documentation
├── public/               # Static assets
├── .github/workflows/    # CI/CD
└── README.md
\`\`\`

## Key Features to Contribute

### High Priority
- [ ] Complete admin panel UI
- [ ] User management interface
- [ ] Course approval workflow
- [ ] Marketplace dispute resolution
- [ ] Real i18n implementation

### Medium Priority
- [ ] Offline module sync
- [ ] Voice-first UI
- [ ] Advanced analytics dashboards
- [ ] Real AI integration tests
- [ ] Payment gateway testing

### Nice to Have
- [ ] Mobile app version
- [ ] Advanced mentor matching
- [ ] Community discussion forums
- [ ] Gamification badges
- [ ] Social media integration

## Need Help?

- Check existing issues
- Read documentation in /docs
- Ask in discussions
- Review example implementations

Thank you for contributing!
