# Quick Start Deployment Guide

## Fastest Path to Production (Vercel + Railway)

### Step 1: Deploy Backend (Railway)

1. **Sign up at [railway.app](https://railway.app)**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo" (connect your repo)

3. **Add PostgreSQL Database**
   - Click "+ New" → "Database" → "PostgreSQL"
   - Wait for it to provision
   - Copy the `DATABASE_URL` (click on the database service → Variables tab)

4. **Add Backend Service**
   - Click "+ New" → "GitHub Repo" → Select your repo
   - Set **Root Directory**: `backend`
   - Railway will auto-detect it's a Node.js app

5. **Configure Environment Variables**
   - Go to backend service → Variables tab
   - Add these variables:
     ```
     DATABASE_URL=<paste from PostgreSQL service>
     JWT_SECRET=<generate a strong random string, min 32 chars>
     JWT_EXPIRES_IN=7d
     CORS_ORIGIN=https://your-app.vercel.app
     NODE_ENV=production
     PORT=3001
     ```

6. **Configure Build Settings**
   - Go to backend service → Settings
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

7. **Run Database Migrations**
   - Go to backend service → Deployments → Latest deployment
   - Click "..." → "Open Shell"
   - Run: `npx prisma migrate deploy`
   - Run: `npx prisma generate`

8. **Get Backend URL**
   - Go to backend service → Settings
   - Copy the "Public Domain" (e.g., `your-backend.up.railway.app`)

### Step 2: Deploy Frontend (Vercel)

1. **Sign up at [vercel.com](https://vercel.com)**

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variable**
   - Go to Project → Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
     ```
   - Make sure to select "Production", "Preview", and "Development"

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `your-app.vercel.app`

### Step 3: Update CORS in Backend

1. **Go back to Railway backend service**
2. **Update CORS_ORIGIN variable**
   - Set it to your Vercel URL: `https://your-app.vercel.app`
3. **Redeploy** (Railway will auto-redeploy when env vars change)

### Step 4: Test Your Deployment

1. **Visit your Vercel URL**
2. **Try logging in**
3. **Test all features**:
   - Login
   - Audit tools
   - Scorecard
   - Reports

## Alternative: Deploy Everything on Railway

If you prefer a single platform:

1. **Follow Step 1 above** (PostgreSQL + Backend)

2. **Add Frontend Service**
   - Click "+ New" → "GitHub Repo" → Select your repo
   - Set **Root Directory**: `frontend`
   - Add environment variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
     ```
   - Railway will auto-detect Next.js and configure it

3. **Get Frontend URL**
   - Copy the public domain from frontend service

4. **Update Backend CORS**
   - Set `CORS_ORIGIN` to your frontend Railway URL

## Troubleshooting

### Backend won't start
- Check logs in Railway dashboard
- Verify all environment variables are set
- Ensure `DATABASE_URL` is correct

### Database connection errors
- Verify `DATABASE_URL` is correct
- Check if migrations ran: `npx prisma migrate deploy`
- Ensure database is running

### Frontend can't connect to backend
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend is running (check Railway logs)
- Check CORS settings in backend

### CORS errors
- Update `CORS_ORIGIN` in backend to match frontend URL
- Include protocol (https://)
- No trailing slash

## Next Steps

- [ ] Set up custom domain (optional)
- [ ] Configure monitoring (Sentry, etc.)
- [ ] Set up backups for database
- [ ] Configure email service (Resend)
- [ ] Set up payment gateway (Xendit)
- [ ] Add CDN for images (BunnyCDN)

## Cost Estimate

- **Vercel**: Free (Hobby) or $20/month (Pro)
- **Railway**: $5/month (Starter) or $20/month (Pro)
- **Total**: ~$5-40/month depending on plan

## Support

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- See `DEPLOYMENT_PLAN.md` for detailed information

