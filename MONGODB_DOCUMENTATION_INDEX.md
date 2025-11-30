# MongoDB Setup & Documentation Index

## Quick Links

### For First-Time Users
- [Getting Started (5 min)](GETTING_STARTED_MONGODB.md)
- [Quick Reference](MONGODB_QUICK_START.md)
- [Setup Guide](docs/mongodb-setup.md)

### For Developers
- [Main README](README.md)
- [Architecture Guide](docs/architecture.md)
- [API Documentation](docs/api.md)

### For DevOps
- [Deployment Guide](docs/deployment.md)
- [Environment Configuration](.env.example)

## Installation Methods

### Option 1: Local MongoDB (5 minutes)

macOS:
\`\`\`bash
brew tap mongodb/brew && brew install mongodb-community
brew services start mongodb-community
\`\`\`

Ubuntu:
\`\`\`bash
sudo apt-get update && sudo apt-get install -y mongodb
sudo systemctl start mongodb
\`\`\`

Windows:
- Download from https://www.mongodb.com/try/download/community
- Run installer
- MongoDB starts as Windows Service

### Option 2: MongoDB Atlas (Cloud, 3 minutes)

1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create M0 free cluster
3. Get connection string from Connect button
4. Add to `.env.local`:
   \`\`\`bash
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/womenhub
   \`\`\`

## Project Setup Checklist

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env.local
# Edit .env.local with your MongoDB URI

# 3. Initialize database
npm run db:init

# 4. Seed demo data
npm run db:seed

# 5. Start development
npm run dev

# 6. Open browser
# http://localhost:3000
\`\`\`

## Database Collections

| Collection | Purpose | Count |
|------------|---------|-------|
| users | User accounts & profiles | ~ |
| courses | Skill development courses | ~ |
| lessons | Individual lessons | ~ |
| enrollments | Student course enrollments | ~ |
| products | Marketplace products | ~ |
| orders | Customer orders | ~ |
| budgets | Financial planning | ~ |
| government_schemes | Loan/subsidy schemes | ~ |
| cyber_incidents | Security reports | ~ |
| mentorship_requests | Mentor matching | ~ |
| assessments | Quizzes & tests | ~ |
| assessment_responses | Student answers | ~ |
| certificates | Completion certificates | ~ |

## Demo Credentials

\`\`\`
Admin:      admin@womenskillhub.com / admin123
Instructor: instructor@womenskillhub.com / instructor123
Seller:     seller@womenskillhub.com / seller123
Student:    student@womenskillhub.com / student123
\`\`\`

## Common Tasks

### Start/Stop MongoDB

**Local:**
\`\`\`bash
# Start
brew services start mongodb-community    # macOS
sudo systemctl start mongodb             # Ubuntu

# Stop
brew services stop mongodb-community     # macOS
sudo systemctl stop mongodb              # Ubuntu
\`\`\`

**Atlas:**
- No action needed (always running in cloud)

### Check Connection

\`\`\`bash
# Test local connection
mongosh mongodb://localhost:27017/womenhub
db.adminCommand('ping')

# Test Atlas connection
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/womenhub"
db.adminCommand('ping')
\`\`\`

### Backup Data

\`\`\`bash
# Local backup
mongodump --out ./backup

# Restore from backup
mongorestore ./backup
\`\`\`

### View Data

\`\`\`bash
mongosh mongodb://localhost:27017/womenhub

# Show users
db.users.find().pretty()

# Show courses
db.courses.find().pretty()

# Count collections
db.users.countDocuments()
db.courses.countDocuments()
\`\`\`

## Troubleshooting Guide

### MongoDB Won't Start

**macOS:**
\`\`\`bash
brew services restart mongodb-community
brew services list  # Check status
\`\`\`

**Ubuntu:**
\`\`\`bash
sudo systemctl restart mongodb
sudo systemctl status mongodb  # Check status
\`\`\`

**Windows:**
- Check Windows Services app
- Search for "Services", find "MongoDB"

### Connection Issues

| Error | Fix |
|-------|-----|
| ECONNREFUSED | Start MongoDB service |
| EADDRINUSE 27017 | Port in use, kill process or use different port |
| Authentication failed | Check username/password in MONGODB_URI |
| IP not whitelisted | Add your IP in MongoDB Atlas Network Access |

### Performance Issues

- Add indexes for frequently queried fields
- Use pagination for large result sets
- Enable compression in connection string

## Environment Variables

\`\`\`bash
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/womenhub

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/womenhub

# Application
NODE_ENV=development
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Payments (test mode)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# AI (optional, uses mock by default)
OPENAI_API_KEY=sk_...
\`\`\`

## File Structure

\`\`\`
womenskillhub/
├── lib/
│   ├── db.ts              # MongoDB connection
│   ├── types.ts           # TypeScript types
│   └── auth.ts            # Authentication
├── app/api/
│   ├── auth/              # Auth endpoints
│   ├── courses/           # Course endpoints
│   ├── marketplace/       # Product endpoints
│   └── ...
├── scripts/
│   ├── db-init.js         # Create collections
│   └── db-seed.js         # Add demo data
├── .env.example           # Environment template
└── package.json           # Dependencies
\`\`\`

## Next Steps

1. Choose installation method (Local or Atlas)
2. Follow [Getting Started Guide](GETTING_STARTED_MONGODB.md)
3. Run `npm run db:init && npm run db:seed`
4. Start with `npm run dev`
5. Explore [Main README](README.md)

## Support

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Community Forum](https://developer.mongodb.com/community/forums/)
- Check [MIGRATION_CHECKLIST.md](MIGRATION_CHECKLIST.md) for verification

---

**Questions?** Start with the [Getting Started Guide](GETTING_STARTED_MONGODB.md) or [Quick Reference](MONGODB_QUICK_START.md).
