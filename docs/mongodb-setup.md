# MongoDB Setup Guide

This guide covers setting up MongoDB for WomenSkillHub development and production environments.

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [MongoDB Atlas (Cloud)](#mongodb-atlas-cloud)
3. [Docker Setup](#docker-setup)
4. [Troubleshooting](#troubleshooting)
5. [Backup & Restore](#backup--restore)

## Local Development Setup

### macOS (Homebrew)

**Install MongoDB Community Edition:**

\`\`\`bash
# Add the MongoDB Homebrew Tap
brew tap mongodb/brew

# Install MongoDB
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify installation
mongo --version

# Connect to MongoDB shell
mongosh

# View databases
show databases

# Exit shell
exit
\`\`\`

**Stop MongoDB:**

\`\`\`bash
brew services stop mongodb-community
\`\`\`

### Ubuntu/Debian

**Install MongoDB Community Edition:**

\`\`\`bash
# Update package index
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb

# Start MongoDB service
sudo systemctl start mongodb

# Enable auto-start
sudo systemctl enable mongodb

# Check status
sudo systemctl status mongodb

# Verify installation
mongosh

# Exit shell
exit
\`\`\`

**Stop MongoDB:**

\`\`\`bash
sudo systemctl stop mongodb
\`\`\`

### Windows

**Install MongoDB Community Edition:**

1. Download the Windows installer from [MongoDB Community Download](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Accept license terms
4. Choose "Complete" installation
5. Install MongoDB as a service
6. Select "Install MongoDB Compass" (optional GUI)

**Start MongoDB:**

\`\`\`bash
# MongoDB should start automatically as a Windows service
# Or manually start via Services application

# Verify installation
mongosh
\`\`\`

### Verify Connection

\`\`\`bash
# Connect to default database
mongosh

# In MongoDB shell:
db.version()          # Check version
show databases        # List databases
show collections      # List collections
db.admin.version()    # Admin version
exit                  # Exit shell
\`\`\`

## MongoDB Atlas (Cloud)

### Create Free MongoDB Atlas Cluster

1. **Go to MongoDB Atlas**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Try Free"

2. **Sign Up**
   - Create account or use Google/GitHub login
   - Accept terms and create organization

3. **Create Cluster**
   - Choose "M0 FREE" tier (always free)
   - Select cloud provider (AWS/Azure/Google)
   - Select region (choose closest to you)
   - Click "Create Cluster"
   - Wait for deployment (5-10 minutes)

4. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Set username: `womenhub`
   - Set password (save this!)
   - Click "Add User"

5. **Allow IP Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)
   - In production: use specific IPs
   - Click "Confirm"

6. **Get Connection String**
   - Go to "Databases"
   - Click "Connect" on your cluster
   - Choose "Drivers"
   - Copy the connection string
   - Replace `<username>` and `<password>`

### Connection String Format

\`\`\`
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/womenhub?retryWrites=true&w=majority
\`\`\`

**Add to `.env.local`:**

\`\`\`bash
MONGODB_URI=mongodb+srv://womenhub:your_password@cluster0.xxxxx.mongodb.net/womenhub
\`\`\`

## Docker Setup

### Using Docker with Local MongoDB

**Run MongoDB Container:**

\`\`\`bash
# Pull MongoDB image
docker pull mongo:latest

# Run container
docker run -d \
  --name womenhub-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=rootpassword \
  mongo:latest

# Verify it's running
docker ps

# View logs
docker logs womenhub-mongo
\`\`\`

**Connect to Container:**

\`\`\`bash
# Using mongosh
docker exec -it womenhub-mongo mongosh

# In shell:
show databases
exit
\`\`\`

**Stop Container:**

\`\`\`bash
docker stop womenhub-mongo
docker rm womenhub-mongo
\`\`\`

### Docker Compose (Recommended)

**Create `docker-compose.yml`:**

\`\`\`yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: womenhub-mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: rootpassword
      MONGO_INITDB_DATABASE: womenhub
    volumes:
      - mongodb_data:/data/db
      - mongodb_config:/data/configdb
    restart: unless-stopped

  app:
    build: .
    container_name: womenskillhub
    ports:
      - "3000:3000"
    environment:
      MONGODB_URI: mongodb://root:rootpassword@mongodb:27017/womenhub
      NODE_ENV: development
    depends_on:
      - mongodb
    restart: unless-stopped

volumes:
  mongodb_data:
  mongodb_config:
\`\`\`

**Run with Docker Compose:**

\`\`\`bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean up volumes
docker-compose down -v
\`\`\`

## Environment Variables

### Development (`.env.local`)

\`\`\`bash
# MongoDB - Local
MONGODB_URI=mongodb://localhost:27017/womenhub

# Or MongoDB - Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/womenhub

# JWT
JWT_SECRET=your-development-secret-key-change-in-production

# Other variables...
\`\`\`

### Production (`.env.production`)

\`\`\`bash
# MongoDB - Always use Atlas or managed service
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/womenhub

# Use strong JWT secret
JWT_SECRET=your-production-secret-key-min-32-chars

# Use real API keys
AI_API_KEY=your-real-ai-key
STRIPE_SECRET_KEY=your-real-stripe-key
\`\`\`

## Troubleshooting

### MongoDB Won't Start

**macOS:**

\`\`\`bash
# Check logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Restart service
brew services restart mongodb-community

# Remove lock file and restart
rm -f /usr/local/var/mongodb/mongod.lock
brew services start mongodb-community
\`\`\`

**Ubuntu:**

\`\`\`bash
# Check service status
sudo systemctl status mongodb

# View logs
sudo journalctl -u mongodb -n 100

# Restart service
sudo systemctl restart mongodb
\`\`\`

### Connection Refused

\`\`\`bash
# Check if MongoDB is running
mongosh

# Verify port 27017 is listening
lsof -i :27017  # macOS/Linux
netstat -ano | findstr :27017  # Windows
\`\`\`

### Authentication Failed

\`\`\`bash
# MongoDB Atlas: Verify credentials in connection string
# Check username and password are correct
# Check IP address is whitelisted

# Local MongoDB with auth:
mongosh "mongodb://username:password@localhost:27017"
\`\`\`

### Database Not Creating

\`\`\`bash
# First connection auto-creates database
# Run db:seed to ensure collections exist
npm run db:seed

# Verify in MongoDB shell
mongosh
use womenhub
show collections
\`\`\`

## Backup & Restore

### Local Backup

**Using mongodump:**

\`\`\`bash
# Create backup directory
mkdir -p backups

# Backup database
mongodump --uri "mongodb://localhost:27017/womenhub" \
  --out backups/womenhub-backup-$(date +%Y%m%d-%H%M%S)

# Verify backup
ls -la backups/
\`\`\`

**Using mongoexport (JSON format):**

\`\`\`bash
# Export all collections
mongoexport --uri "mongodb://localhost:27017/womenhub" \
  --collection users \
  --out backups/users.json

mongoexport --uri "mongodb://localhost:27017/womenhub" \
  --collection courses \
  --out backups/courses.json
\`\`\`

### Restore Backup

**Using mongorestore:**

\`\`\`bash
# Restore from mongodump backup
mongorestore --uri "mongodb://localhost:27017/womenhub" \
  backups/womenhub-backup-20240101-120000
\`\`\`

**Using mongoimport:**

\`\`\`bash
# Restore from JSON export
mongoimport --uri "mongodb://localhost:27017/womenhub" \
  --collection users \
  --file backups/users.json
\`\`\`

### MongoDB Atlas Backup

1. Go to cluster in MongoDB Atlas
2. Click "Backup" tab
3. Click "Snapshots"
4. Click "Take Snapshot Now"
5. To restore: Click "Restore" on snapshot

## Performance Tips

### Indexing

\`\`\`bash
# Connect to MongoDB
mongosh

# Create indexes for frequently queried fields
use womenhub

db.users.createIndex({ email: 1 })
db.courses.createIndex({ instructorId: 1 })
db.enrollments.createIndex({ userId: 1, courseId: 1 })
db.products.createIndex({ sellerId: 1 })
\`\`\`

### Monitoring

\`\`\`bash
# Check connection stats
db.serverStatus().connections

# Check storage size
db.stats()

# Check slow queries
db.setProfilingLevel(1)  # Profile all queries
\`\`\`

## Next Steps

- [Get Started Guide](../QUICKSTART.md)
- [API Documentation](./api.md)
- [Deployment Guide](./deployment.md)
