# Installation Guide

Complete installation and setup instructions for WomenSkillHub.

## System Requirements

### Minimum
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher (or yarn 3.0.0+)
- 500 MB free disk space
- 2 GB RAM

### Recommended
- Node.js 20.x LTS
- npm 10.x
- 1 GB free disk space
- 4 GB RAM

### Supported Operating Systems
- macOS 10.15+
- Windows 10+
- Ubuntu 18.04+
- Any Linux with Node.js support

## Step-by-Step Installation

### Step 1: Install Node.js

**macOS:**
\`\`\`bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
\`\`\`

**Windows:**
- Download from https://nodejs.org/
- Run installer
- Follow prompts

**Linux (Ubuntu/Debian):**
\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
\`\`\`

**Verify Installation:**
\`\`\`bash
node --version
npm --version
\`\`\`

### Step 2: Clone Repository

\`\`\`bash
# Using HTTPS
git clone https://github.com/yourusername/womenskillhub.git

# Or using SSH
git clone git@github.com:yourusername/womenskillhub.git

# Navigate to directory
cd womenskillhub
\`\`\`

### Step 3: Install Dependencies

\`\`\`bash
npm install
\`\`\`

This installs all required packages from `package.json`.

**Time:** 2-5 minutes depending on internet speed

### Step 4: Setup Environment

\`\`\`bash
# Copy example environment file
cp .env.example .env.local

# Edit with your settings (optional for local dev)
nano .env.local
\`\`\`

### Step 5: Initialize Database

\`\`\`bash
# Create database and tables
npm run db:init

# Seed with demo data
npm run db:seed
\`\`\`

**Output:**
\`\`\`
Database initialized successfully!
Database seeded successfully!
\`\`\`

### Step 6: Start Development Server

\`\`\`bash
npm run dev
\`\`\`

**Output:**
\`\`\`
> next dev
  ▲ Next.js 16.0.3
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
\`\`\`

### Step 7: Open in Browser

Visit: http://localhost:3000

You should see the WomenSkillHub landing page!

## Verification

### Check Installation

\`\`\`bash
# Verify Node.js
node --version
# Should output: v18.x.x or higher

# Verify npm
npm --version
# Should output: 9.x.x or higher

# Verify database
ls -la data/skillhub.db
# Should show database file exists
\`\`\`

### Test API

\`\`\`bash
# In another terminal
curl http://localhost:3000/api/courses

# Should return JSON with courses
\`\`\`

### Run Tests

\`\`\`bash
npm test

# Should show test results
\`\`\`

## Troubleshooting Installation

### Issue: "Node not found"
**Solution:**
\`\`\`bash
# Reinstall Node.js from https://nodejs.org/
# Or use Node Version Manager (nvm)

# macOS/Linux:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
\`\`\`

### Issue: "npm ERR! code EACCES"
**Solution:**
\`\`\`bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
\`\`\`

### Issue: "Port 3000 already in use"
**Solution:**
\`\`\`bash
# Use different port
npm run dev -- -p 3001

# Or kill process using port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
\`\`\`

### Issue: "Database locked"
**Solution:**
\`\`\`bash
# Remove corrupted database
rm -f data/skillhub.db

# Reinitialize
npm run db:init
npm run db:seed
\`\`\`

### Issue: "Module not found"
**Solution:**
\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Issue: "ENOSPC: no space left on device"
**Solution:**
\`\`\`bash
# Check disk space
df -h

# Clean npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
\`\`\`

## Post-Installation

### 1. Create Admin Account

\`\`\`bash
# Already created during db:seed
# Email: admin@womenskillhub.com
# Password: admin123
\`\`\`

### 2. Create Your Account

1. Go to http://localhost:3000
2. Click "Sign Up"
3. Fill in details
4. Choose your role
5. Click "Create Account"

### 3. Explore Features

- **Courses**: Go to "My Courses" and enroll
- **Marketplace**: Browse products
- **Financial**: Check budget tools
- **Cyber Safety**: Learn about online safety
- **Admin**: Go to /admin/login

### 4. Run Tests

\`\`\`bash
npm test                    # Unit tests
npm run test:e2e           # E2E tests
npm run test:coverage      # Coverage report
\`\`\`

## Development Setup

### Install Development Tools

**VS Code Extensions (Recommended):**
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Thunder Client (API testing)
- SQLite Viewer

**Install:**
\`\`\`bash
# Prettier
npm install --save-dev prettier

# ESLint
npm install --save-dev eslint eslint-config-next
\`\`\`

### Configure Git

\`\`\`bash
# Set user info
git config user.name "Your Name"
git config user.email "your@email.com"

# Create feature branch
git checkout -b feature/my-feature
\`\`\`

### Setup IDE

**VS Code Settings (.vscode/settings.json):**
\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["typescript", "typescriptreact"]
}
\`\`\`

## Docker Installation (Optional)

### Build Docker Image

\`\`\`bash
docker build -t womenskillhub .
\`\`\`

### Run Container

\`\`\`bash
docker run -p 3000:3000 \
  -e DATABASE_URL=/app/data/skillhub.db \
  -e JWT_SECRET=your-secret \
  womenskillhub
\`\`\`

### Docker Compose

\`\`\`bash
docker-compose up
\`\`\`

## Production Installation

See [docs/deployment.md](docs/deployment.md) for production setup.

## Uninstallation

### Remove Application

\`\`\`bash
# Remove directory
rm -rf womenskillhub

# Remove database
rm -rf ~/data/skillhub.db
\`\`\`

### Remove Node.js (if needed)

**macOS:**
\`\`\`bash
brew uninstall node
\`\`\`

**Windows:**
- Go to Control Panel > Programs > Uninstall a Program
- Find Node.js and uninstall

**Linux:**
\`\`\`bash
sudo apt-get remove nodejs npm
\`\`\`

## Next Steps

1. Read [QUICKSTART.md](QUICKSTART.md)
2. Check [README.md](README.md)
3. Review [docs/architecture.md](docs/architecture.md)
4. Start contributing!

## Support

- 📖 [Documentation](docs/)
- 🐛 [GitHub Issues](https://github.com/yourusername/womenskillhub/issues)
- 💬 [GitHub Discussions](https://github.com/yourusername/womenskillhub/discussions)
- 📧 support@womenskillhub.com

---

**Installation complete! Happy coding! 🚀**
