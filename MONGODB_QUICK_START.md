# MongoDB Quick Reference

## Installation

### macOS
\`\`\`bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
\`\`\`

### Ubuntu/Debian
\`\`\`bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
\`\`\`

### Windows
- Download: https://www.mongodb.com/try/download/community
- Run installer
- Service auto-starts

### Cloud (MongoDB Atlas)
\`\`\`bash
# Get URI from MongoDB Atlas console
# Update .env.local:
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/womenhub
\`\`\`

## Project Setup

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local

# 3. Initialize database
npm run db:init
npm run db:seed

# 4. Start server
npm run dev

# 5. Access app
# Browser: http://localhost:3000
# Admin: http://localhost:3000/admin
\`\`\`

## Common Commands

\`\`\`bash
# Start MongoDB (if not already running)
brew services start mongodb-community  # macOS
sudo systemctl start mongodb           # Ubuntu

# Check if running
mongosh

# Stop MongoDB
brew services stop mongodb-community   # macOS
sudo systemctl stop mongodb            # Ubuntu
\`\`\`

## Environment Setup

\`\`\`bash
# .env.local for local MongoDB
MONGODB_URI=mongodb://localhost:27017/womenhub
NODE_ENV=development
JWT_SECRET=dev-secret-key-change-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env.local for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/womenhub
NODE_ENV=development
JWT_SECRET=your-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## Database Scripts

\`\`\`bash
# Initialize empty database
npm run db:init

# Seed demo data
npm run db:seed

# Both (init + seed)
npm run db:setup
\`\`\`

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@womenskillhub.com | admin123 |
| Instructor | instructor@womenskillhub.com | instructor123 |
| Seller | seller@womenskillhub.com | seller123 |
| Student | student@womenskillhub.com | student123 |

## API Testing

\`\`\`bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User",
    "role": "student"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'

# Get courses
curl http://localhost:3000/api/courses

# AI chatbot
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I start learning coding?",
    "userId": "user123"
  }'
\`\`\`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 27017 in use | Kill process: `kill -9 <PID>` |
| Connection refused | Start MongoDB: `brew services start mongodb-community` |
| Database doesn't exist | Run `npm run db:init` |
| No demo data | Run `npm run db:seed` |
| EADDRINUSE 3000 | Kill node: `lsof -i :3000 \| grep LISTEN` |

## Performance Tips

1. Use local MongoDB for development (faster than Atlas)
2. Index frequently queried fields
3. Use connection pooling (Mongoose handles this)
4. Limit API response sizes with pagination

## Resources

- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/)
- [Atlas Dashboard](https://cloud.mongodb.com/)

## Next Steps

1. Read [GETTING_STARTED_MONGODB.md](GETTING_STARTED_MONGODB.md) for detailed setup
2. Check [docs/mongodb-setup.md](docs/mongodb-setup.md) for troubleshooting
3. Review [README.md](README.md) for project overview
