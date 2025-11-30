# 🚀 START HERE - WomenSkillHub

Welcome to WomenSkillHub! This file will get you started in 5 minutes.

## What is WomenSkillHub?

A complete, free, open-source platform for women's empowerment with:
- 🎓 Skill Development Courses
- 💼 Entrepreneurship Marketplace
- 💰 Financial Literacy Tools
- 🔐 Cyber Safety Education
- 🌾 Rural Women Support
- 👥 Mentor-Mentee Matching

**Everything is free. No paid subscriptions required.**

## Quick Start (5 Minutes)

### 1. Install
\`\`\`bash
git clone https://github.com/yourusername/womenskillhub.git
cd womenskillhub
npm install
\`\`\`

### 2. Setup Database
\`\`\`bash
npm run db:init
npm run db:seed
\`\`\`

### 3. Start
\`\`\`bash
npm run dev
\`\`\`

### 4. Open Browser
\`\`\`
http://localhost:3000
\`\`\`

**Done!** 🎉

## First Steps

### Try as Student
1. Click "Sign Up"
2. Create account
3. Go to "My Courses"
4. Enroll in a course

### Try as Admin
1. Go to http://localhost:3000/admin/login
2. Email: `admin@womenskillhub.com`
3. Password: `admin123`
4. View analytics

### Try as Seller
1. Sign up as "Seller"
2. Go to Marketplace
3. Click "List Product"
4. Create a product

## Key Files to Read

| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview |
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup |
| [INSTALLATION.md](INSTALLATION.md) | Detailed installation |
| [docs/architecture.md](docs/architecture.md) | System design |
| [docs/api.md](docs/api.md) | API reference |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute |
| [TASKS.md](TASKS.md) | Feature roadmap |
| [docs/faq.md](docs/faq.md) | Common questions |

## Demo Accounts

\`\`\`
Admin:
  Email: admin@womenskillhub.com
  Password: admin123

Instructor:
  Email: instructor@womenskillhub.com
  Password: instructor123

Seller:
  Email: seller@womenskillhub.com
  Password: seller123
\`\`\`

## Common Commands

\`\`\`bash
npm run dev              # Start development
npm test                 # Run tests
npm run build            # Build for production
npm run db:reset         # Reset database
npm run lint             # Check code quality
npm run test:e2e         # E2E tests
\`\`\`

## Project Structure

\`\`\`
app/
├── api/                 # Backend APIs
├── page.tsx             # Landing page
├── login/               # Login page
├── signup/              # Signup page
├── dashboard/           # User dashboard
├── courses/             # Courses page
├── marketplace/         # Marketplace
├── financial/           # Financial tools
├── cyber-safety/        # Cyber safety
└── admin/               # Admin panel

lib/
├── db.ts                # Database helpers
├── auth.ts              # Authentication
└── types.ts             # TypeScript types

docs/
├── architecture.md      # System design
├── api.md               # API reference
├── deployment.md        # Deployment guide
└── faq.md               # FAQ
\`\`\`

## Features Overview

### 🎓 Skill Development
- Browse courses by category
- Enroll in free courses
- Watch video lessons
- Take quizzes
- Get certificates
- AI tutor chatbot

### 💼 Marketplace
- List products for sale
- Browse women-made products
- Add to cart
- Checkout (test mode)
- Track orders
- Leave reviews

### 💰 Financial Tools
- Track budget
- Set savings goals
- Calculate EMI
- Find loan schemes
- Check eligibility
- Get financial advice

### 🔐 Cyber Safety
- Learn about phishing
- Practice simulations
- Report incidents
- Get regional guidance
- Download reports

### 🌾 Rural Support
- Multi-language support
- Voice-first interface
- Offline modules
- Government schemes
- Community groups

## Technology Stack

- **Frontend**: React 19, Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB (local or Atlas cloud)
- **Testing**: Jest, Playwright
- **Deployment**: Vercel, VPS, or self-hosted

## Troubleshooting

### Port 3000 in use?
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Database error?
\`\`\`bash
npm run db:reset
\`\`\`

### Module not found?
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Need help?
- Check [docs/faq.md](docs/faq.md)
- Read [INSTALLATION.md](INSTALLATION.md)
- Open GitHub issue
- Email: support@womenskillhub.com

## Next Steps

1. ✅ **Setup**: Follow Quick Start above
2. 📖 **Learn**: Read [README.md](README.md)
3. 🧪 **Test**: Run `npm test`
4. 🔍 **Explore**: Check `/app` folder
5. 🤝 **Contribute**: Pick task from [TASKS.md](TASKS.md)

## Want to Contribute?

Great! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Tasks
- [ ] Add new course
- [ ] Create product
- [ ] Write test
- [ ] Fix bug
- [ ] Improve docs

## Resources

- 📚 [Full Documentation](README.md)
- 🏗️ [Architecture Guide](docs/architecture.md)
- 📡 [API Reference](docs/api.md)
- ❓ [FAQ](docs/faq.md)
- 🤝 [Contributing](CONTRIBUTING.md)
- 📋 [Task List](TASKS.md)

## Project Status

| Component | Status |
|-----------|--------|
| Backend | ✅ Complete |
| Frontend | ✅ Complete |
| Admin Panel | 🔄 In Progress |
| Testing | 🔄 In Progress |
| Documentation | ✅ Complete |
| Deployment | ✅ Complete |

## Support

- 📧 Email: support@womenskillhub.com
- 💬 GitHub Discussions
- 🐛 GitHub Issues
- 📖 Documentation

## License

MIT License - Free to use and modify

---

**Ready to get started?**

\`\`\`bash
npm install && npm run db:init && npm run db:seed && npm run dev
\`\`\`

Then visit: http://localhost:3000

**Happy coding! 🚀**
