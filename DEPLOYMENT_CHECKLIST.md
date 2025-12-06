# Deployment Checklist - Vercel + Railway

## Pre-Deployment

- [x] Code pushed to GitHub
- [x] `.gitignore` configured (excludes node_modules, .env, etc.)
- [x] Backend builds successfully (`npm run build` in backend/)
- [x] Frontend builds successfully (`npm run build` in frontend/)
- [x] Database migrations ready

## Step 1: Deploy Backend on Railway

### Railway Setup
- [ ] Sign up at https://railway.app (use GitHub login)
- [ ] Create new project → "Deploy from GitHub repo"
- [ ] Select repository: `nmatunog/aquapure`

### PostgreSQL Database
- [ ] Add PostgreSQL database service
- [ ] Copy `DATABASE_URL` from database service Variables tab

### Backend Service
- [ ] Add backend service from GitHub repo
- [ ] Set Root Directory to: `backend`
- [ ] Configure environment variables:
  - [ ] `DATABASE_URL` = (from PostgreSQL service)
  - [ ] `JWT_SECRET` = `5C9lOoFWuDVYi/QvMWuvm8hJocVCVBcXin8BY9K2ap4=` (or generate new)
  - [ ] `JWT_EXPIRES_IN` = `7d`
  - [ ] `CORS_ORIGIN` = `https://your-app-name.netlify.app` (update after frontend deploy)
  - [ ] `NODE_ENV` = `production`
  - [ ] `PORT` = `3001`
- [ ] Configure build settings:
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Start Command: `npm run start:prod`
- [ ] Wait for first deployment
- [ ] Run migrations in Railway shell:
  ```bash
  cd backend
  npx prisma migrate deploy
  npx prisma generate
  ```
- [ ] Get backend URL from Settings → Networking → Public Domain
- [ ] Test backend: `curl https://your-backend.up.railway.app/api/auth/login`

## Step 2: Deploy Frontend on Netlify

### Netlify Setup
- [ ] Sign up at https://netlify.com (use GitHub login)
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Deploy with GitHub → Select repository: `nmatunog/aquapure`

### Project Configuration
- [ ] Set Base directory to: `frontend`
- [ ] Build command: `cd frontend && npm install && npm run build`
- [ ] Publish directory: `frontend/.next`
- [ ] Add environment variable:
  - [ ] `NEXT_PUBLIC_API_URL` = `https://your-backend.up.railway.app`
- [ ] Click "Deploy site"
- [ ] Wait for build to complete (~3-5 minutes)
- [ ] Get frontend URL: `your-app-name.netlify.app`

## Step 3: Update CORS

- [ ] Go back to Railway backend service
- [ ] Update `CORS_ORIGIN` environment variable to: `https://your-app-name.netlify.app`
- [ ] Railway will auto-redeploy

## Step 4: Verify Deployment

- [ ] Visit frontend URL
- [ ] Test login functionality
- [ ] Test audit tools
- [ ] Test scorecard
- [ ] Test reports
- [ ] Check browser console for errors
- [ ] Check Railway logs for backend errors

## Environment Variables Summary

### Railway (Backend)
```
DATABASE_URL=<from PostgreSQL service>
JWT_SECRET=5C9lOoFWuDVYi/QvMWuvm8hJocVCVBcXin8BY9K2ap4=
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-app.vercel.app
NODE_ENV=production
PORT=3001
```

### Netlify (Frontend)
```
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
```

## URLs to Save

- Backend URL: `https://________________.up.railway.app`
- Frontend URL: `https://________________.netlify.app`

## Troubleshooting

### Backend Issues
- Check Railway deployment logs
- Verify all environment variables are set
- Ensure migrations ran successfully
- Test backend directly: `curl https://your-backend.up.railway.app/api/auth/login`

### Frontend Issues
- Check Vercel build logs
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check browser console for errors
- Verify CORS is configured correctly

### Database Issues
- Verify `DATABASE_URL` is correct
- Check if migrations ran: `npx prisma migrate status` in Railway shell
- Ensure database service is running

