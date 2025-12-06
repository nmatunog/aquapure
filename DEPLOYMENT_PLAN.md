# Aquapure Deployment Plan

## Overview
This document outlines the deployment strategy for the Aquapure application, including frontend (Next.js), backend (NestJS), and database (PostgreSQL) components.

## Architecture Overview

```
┌─────────────────┐
│   Next.js App   │  (Frontend - Static/SSR)
│   (Port 3000)   │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│  NestJS API     │  (Backend - API Server)
│  (Port 3001)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │  (Database)
│   (Port 5432)   │
└─────────────────┘
```

## Deployment Options

### Option 1: Vercel (Frontend) + Railway/Render (Backend) - Recommended
- **Frontend**: Vercel (optimized for Next.js)
- **Backend**: Railway or Render (easy PostgreSQL + Node.js)
- **Database**: Included with Railway/Render or separate (Supabase, Neon)

### Option 2: Full Stack on Railway/Render
- **Everything**: Railway or Render (simplest setup)
- **Pros**: Single platform, easy deployment
- **Cons**: Less optimized for Next.js than Vercel

### Option 3: AWS/GCP/Azure
- **Frontend**: Vercel, Netlify, or AWS Amplify
- **Backend**: AWS ECS/Elastic Beanstalk, GCP Cloud Run, Azure App Service
- **Database**: RDS, Cloud SQL, or Azure Database
- **Pros**: Enterprise-grade, scalable
- **Cons**: More complex setup

## Pre-Deployment Checklist

### 1. Environment Variables

#### Frontend (.env.production)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

#### Backend (.env.production)
```bash
# Server
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@host:5432/aquapure?schema=public

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://your-frontend-domain.com
```

### 2. Database Setup

#### Production Database
- Use managed PostgreSQL service (Railway, Supabase, Neon, or cloud provider)
- Run migrations: `npx prisma migrate deploy`
- Seed initial data if needed

#### Migration Steps
```bash
cd backend
npx prisma migrate deploy
npx prisma generate
```

### 3. Build Optimization

#### Frontend Build
```bash
cd frontend
npm run build
# Test production build locally
npm run start
```

#### Backend Build
```bash
cd backend
npm run build
# Test production build locally
npm run start:prod
```

## Deployment Steps

### Frontend Deployment (Vercel - Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL`

4. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Backend Deployment (Railway - Recommended)

1. **Create Railway Account**
   - Sign up at railway.app

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo" or "Empty Project"

3. **Add PostgreSQL Service**
   - Click "+ New" → "Database" → "PostgreSQL"
   - Copy the `DATABASE_URL` from the service

4. **Add Backend Service**
   - Click "+ New" → "GitHub Repo" → Select your repo
   - Set Root Directory: `backend`
   - Add Environment Variables:
     - `DATABASE_URL` (from PostgreSQL service)
     - `JWT_SECRET` (generate strong secret)
     - `JWT_EXPIRES_IN=7d`
     - `CORS_ORIGIN` (your frontend URL)
     - `NODE_ENV=production`

5. **Configure Build & Start**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

6. **Run Migrations**
   - Add a one-time service or use Railway CLI:
     ```bash
     railway run npx prisma migrate deploy
     ```

### Alternative: Backend on Render

1. **Create Render Account**
   - Sign up at render.com

2. **Create PostgreSQL Database**
   - New → PostgreSQL
   - Copy Internal Database URL

3. **Create Web Service**
   - New → Web Service
   - Connect GitHub repo
   - Settings:
     - Build Command: `cd backend && npm install && npm run build`
     - Start Command: `cd backend && npm run start:prod`
     - Environment: `Node`
   - Add Environment Variables (same as Railway)

## Production Optimizations

### Frontend

1. **Enable Next.js Optimizations**
   ```javascript
   // next.config.js
   module.exports = {
     compress: true,
     poweredByHeader: false,
     reactStrictMode: true,
   }
   ```

2. **Image Optimization**
   - Already using Next.js Image component
   - Configure `remotePatterns` for BunnyCDN if used

3. **Environment Variables**
   - Only `NEXT_PUBLIC_*` variables are exposed to browser
   - Keep secrets server-side only

### Backend

1. **Enable Compression**
   ```typescript
   // main.ts
   import compression from 'compression';
   app.use(compression());
   ```

2. **Rate Limiting**
   ```typescript
   // Add rate limiting middleware
   import rateLimit from 'express-rate-limit';
   ```

3. **Security Headers**
   ```typescript
   // Add helmet for security headers
   import helmet from 'helmet';
   app.use(helmet());
   ```

4. **Error Handling**
   - Ensure global exception filters are configured
   - Log errors to monitoring service (Sentry, etc.)

### Database

1. **Connection Pooling**
   - Prisma handles this automatically
   - Configure pool size in `DATABASE_URL` if needed

2. **Backups**
   - Enable automatic backups on managed services
   - Set up backup retention policy

3. **Indexes**
   - Verify all indexes are created (check Prisma schema)

## CI/CD Pipeline (Optional)

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd frontend && npm ci && npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd backend && npm ci && npm run build
      # Add Railway/Render deployment steps
```

## Monitoring & Logging

### Recommended Tools

1. **Application Monitoring**
   - Sentry (error tracking)
   - LogRocket (session replay)
   - Vercel Analytics (frontend)

2. **Uptime Monitoring**
   - UptimeRobot
   - Pingdom
   - StatusCake

3. **Logging**
   - Use platform-native logging (Vercel, Railway)
   - Consider structured logging service (Logtail, Datadog)

## Security Checklist

- [ ] All environment variables are set in production
- [ ] `JWT_SECRET` is strong and unique
- [ ] Database credentials are secure
- [ ] CORS is configured correctly
- [ ] HTTPS is enabled (automatic on Vercel/Railway)
- [ ] Rate limiting is enabled
- [ ] Input validation is in place (class-validator)
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection (React/Next.js handles this)
- [ ] Security headers are configured (helmet)

## Post-Deployment

### 1. Verify Deployment
- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Database connection works
- [ ] Authentication works
- [ ] All API endpoints function

### 2. Performance Testing
- [ ] Page load times acceptable
- [ ] API response times acceptable
- [ ] Database queries optimized

### 3. User Acceptance Testing
- [ ] Login flow works
- [ ] Audit tools function
- [ ] Scorecard updates
- [ ] Reports generate correctly

## Rollback Plan

### Frontend (Vercel)
- Use Vercel dashboard to rollback to previous deployment
- Or redeploy previous commit

### Backend (Railway/Render)
- Use platform dashboard to rollback
- Or redeploy previous commit

### Database
- Keep migration history
- Can rollback migrations if needed (be careful!)

## Cost Estimates

### Vercel (Frontend)
- Hobby: Free (for personal projects)
- Pro: $20/month (for production)

### Railway (Backend + Database)
- Starter: $5/month
- Pro: $20/month (includes more resources)

### Render (Backend + Database)
- Free tier available (with limitations)
- Paid: $7-25/month per service

## Next Steps

1. **Choose deployment platform** (recommend Vercel + Railway)
2. **Set up production database**
3. **Configure environment variables**
4. **Deploy backend first** (to get API URL)
5. **Deploy frontend** (with backend URL)
6. **Run database migrations**
7. **Test thoroughly**
8. **Set up monitoring**
9. **Configure custom domain** (optional)

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- NestJS Deployment: https://docs.nestjs.com/recipes/deployment

