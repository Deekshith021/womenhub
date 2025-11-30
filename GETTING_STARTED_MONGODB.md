# Getting Started with WomenSkillHub + MongoDB

Welcome! This guide will help you get up and running with the MongoDB version of WomenSkillHub in under 10 minutes.

## Choose Your Setup

### ⚡ Option 1: Fastest Setup (Local MongoDB)

Perfect if you have MongoDB already installed or want it quickly.

\`\`\`bash
# 1. Make sure MongoDB is running
mongosh  # Should connect without errors

# 2. Clone the repo
git clone https://github.com/yourusername/womenskillhub.git
cd womenskillhub

# 3. Install dependencies
npm install

# 4. Setup database (uses default localhost MongoDB)
npm run db:init
npm run db:seed

# 5. Start developing
npm run dev

# 6. Open browser to http://localhost:3000
\`\`\`

**Demo Login:**
- Email: `admin@womenskillhub.com`
- Password: `admin123`

### ☁️ Option 2: Cloud Setup (MongoDB Atlas)

Best for teams and production-like environment.

\`\`\`bash
# 1. Create MongoDB Atlas account at mongodb.com/cloud/atlas
# 2. Create free M0 cluster
# 3. Get connection string: mongodb+srv://user:pass@cluster.mongodb.net/womenhub

# 4. Clone and install
git clone https://github.com/yourusername/womenskillhub.git
cd womenskillhub
npm install

# 5. Configure MongoDB Atlas
echo "MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/womenhub" > .env.local

# 6. Initialize (no local MongoDB needed!)
npm run db:init
npm run db:seed

# 7. Start
npm run dev
\`\`\`

## What Was Changed

✅ **Database:** SQLite → MongoDB
✅ **ORM:** Raw SQL → Mongoose
✅ **Collections:** 13 MongoDB collections
✅ **API Routes:** All 18+ routes updated
✅ **Scripts:** Seed and init scripts rewritten
✅ **Performance:** Better for scaling

## Verify Everything Works

### 1. Check MongoDB Connection

\`\`\`bash
# Should show connected successfully
npm run db:init

# Output should include:
# MongoDB connected successfully!
# Database: womenhub
# Collections: [list of collections]
\`\`\`

### 2. Test API

\`\`\`bash
# Login endpoint
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@womenskillhub.com",
    "password": "admin123"
  }'

# You should receive a token
\`\`\`

### 3. Explore the App

1. Open http://localhost:3000
2. Login with credentials above
3. Browse courses, marketplace, financial tools
4. Try as different user roles

## Common Questions

**Q: Do I need to install MongoDB?**
- Local option: Yes
- MongoDB Atlas: No, cloud-hosted

**Q: Can I switch between options?**
- Yes! Just update `MONGODB_URI` in `.env.local`

**Q: How do I reset the database?**
- Local: `npm run db:seed` (deletes and reseeds)
- Atlas: Delete cluster and recreate

**Q: Is my data safe?**
- Local: Data in MongoDB local storage
- Atlas: Cloud-backed with automatic backups

## Development Tips

### View MongoDB Collections

\`\`\`bash
# Connect to MongoDB shell
mongosh

# Use the database
use womenhub

# See all collections
show collections

# See users
db.users.find()

# See courses
db.courses.find()

# Exit
exit
\`\`\`

### Reset Database

\`\`\`bash
# Clears all data and reseeds
npm run db:seed
\`\`\`

### View API Requests

\`\`\`bash
# Add to your browser console while testing
localStorage.setItem('debug', 'app:*');
\`\`\`

### Run Tests

\`\`\`bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
\`\`\`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection refused | Start MongoDB: `brew services start mongodb-community` |
| Wrong password Atlas | Check `.env.local` has correct credentials |
| No database | Run: `npm run db:init && npm run db:seed` |
| Seeding fails | Check MongoDB is running and accessible |

## Architecture Overview

\`\`\`
┌─────────────────────┐
│  Your Browser       │
│  (React App)        │
└──────────┬──────────┘
           │ HTTP/REST
           ↓
┌─────────────────────┐
│  Next.js Server     │
│  (API Routes)       │
└──────────┬──────────┘
           │ Native Protocol
           ↓
┌─────────────────────┐
│  MongoDB            │
│  (Database)         │
│  13 Collections     │
└─────────────────────┘
\`\`\`

## Next Steps

1. **Explore the Code:** Check out `app/api/auth/login/route.ts` to see MongoDB in action
2. **Add Your Own Feature:** See the pattern and add to more modules
3. **Deploy:** See `docs/deployment.md` for cloud deployment
4. **Read Docs:** Full documentation in `/docs` folder

## File Structure

\`\`\`
womenskillhub/
├── app/                  # Next.js app directory
│   ├── api/             # API routes (all using MongoDB)
│   ├── page.tsx         # Main landing page
│   └── layout.tsx       # Root layout
├── lib/
│   ├── db.ts            # MongoDB connection & models ⭐
│   ├── auth.ts          # JWT & auth helpers
│   └── types.ts         # TypeScript types
├── scripts/
│   ├── db-init.js       # MongoDB init script
│   └── db-seed.js       # MongoDB seed script
├── docs/
│   ├── mongodb-setup.md # Detailed MongoDB guide
│   └── deployment.md    # Production deployment
├── .env.example         # Environment template
├── .env.local           # Your local config (git ignored)
└── package.json         # Dependencies (with Mongoose)
\`\`\`

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@womenskillhub.com | admin123 |
| Instructor | instructor@womenskillhub.com | instructor123 |
| Seller | seller@womenskillhub.com | seller123 |

## Support & Help

- 📖 **Full Docs:** See `/docs` folder
- 🆘 **MongoDB Setup:** See `docs/mongodb-setup.md`
- 🚀 **Deployment:** See `docs/deployment.md`
- 🐛 **Issues:** GitHub Issues
- 💬 **Discussions:** GitHub Discussions

## Key MongoDB Features Enabled

✅ Document-based storage
✅ Flexible schema
✅ Full-text search ready
✅ Aggregation pipelines
✅ Transactions support
✅ Replication for HA
✅ Built-in indexing
✅ Auto-scaling ready

---

**You're all set! Start developing with MongoDB and WomenSkillHub.** 🚀

For detailed information, see:
- [README.md](README.md) - Project overview
- [docs/mongodb-setup.md](docs/mongodb-setup.md) - Comprehensive setup
- [MONGODB_MIGRATION.md](MONGODB_MIGRATION.md) - What changed

Happy coding! 💻
