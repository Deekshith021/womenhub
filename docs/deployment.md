# WomenSkillHub Deployment Guide

## Production Checklist

### Environment Variables

\`\`\`bash
# Required for production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com

# Security
JWT_SECRET=<generate-strong-random-secret>

# Database (use MongoDB Atlas for production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/womenhub

# Optional: AI Integration
AI_API_KEY=<your-ai-provider-key>
AI_PROVIDER=openai

# Optional: Stripe Integration
STRIPE_SECRET_KEY=<your-stripe-secret>
STRIPE_PUBLISHABLE_KEY=<your-stripe-public>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-public>
\`\`\`

### Pre-deployment Steps

1. **Update Database**
   \`\`\`bash
   # Use MongoDB Atlas connection string for production
   # Verify connection works before deploying
   \`\`\`

2. **Verify Environment Variables**
   - All secrets are stored in environment
   - No secrets in source code
   - Verify integrations are working
   - MongoDB connection string is correct

3. **Run Full Test Suite**
   \`\`\`bash
   npm test -- --coverage
   npm run test:e2e
   \`\`\`

4. **Build Verification**
   \`\`\`bash
   npm run build
   npm run start &
   # Test at http://localhost:3000
   \`\`\`

## Production Deployment Options

### Option 1: Vercel (Recommended for Next.js)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Vercel auto-deploys on every push

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
\`\`\`

### Option 2: Traditional VPS

\`\`\`bash
# SSH into server
ssh user@server.com

# Clone repository
git clone https://github.com/your-org/womenskillhub.git
cd womenskillhub

# Setup
npm install
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "womenskillhub" -- start
pm2 save
pm2 startup
\`\`\`

## Database Options for Production

### MongoDB Atlas (Recommended)
1. Create production cluster (M0 free or paid)
2. Set connection string in environment variables
3. Enable automatic backups
4. Configure IP whitelist

### Self-Hosted MongoDB
1. Install MongoDB on production server
2. Configure authentication and authorization
3. Setup backups and monitoring
4. Use connection string: `mongodb://user:pass@localhost:27017/womenhub`

## Monitoring & Maintenance

### Health Checks
\`\`\`bash
# Monitor application
curl https://your-domain.com/api/health
\`\`\`

### Log Management
- Use structured logging
- Monitor error rates
- Track performance metrics
- Setup alerts

### Backups
MongoDB Atlas provides automatic daily backups. For self-hosted:
\`\`\`bash
# Daily database backups
0 2 * * * mongodump --uri "mongodb://localhost:27017/womenhub" --out /backups/db-$(date +\%Y\%m\%d)
\`\`\`

## Security Hardening

1. Enable HTTPS
2. Set security headers
3. Configure CORS properly
4. Rate limiting on APIs
5. Regular security audits
6. Keep dependencies updated
7. Use strong JWT_SECRET
8. Whitelist MongoDB IP addresses (Atlas)

## Scaling Guide

### Horizontal Scaling
- API routes can run on multiple instances
- Use MongoDB Atlas for managed database
- Configure shared file storage (S3)
- Use load balancer (Nginx, Vercel)

### Performance Optimization
- Enable caching headers
- Use CDN for static assets
- Optimize MongoDB queries
- Implement pagination
- Monitor performance metrics
\`\`\`
