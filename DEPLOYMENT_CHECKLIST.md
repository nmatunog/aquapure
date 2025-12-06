# Deployment Checklist - Netlify + Render (Free Tier)

## Pre-Deployment

- [x] Code pushed to GitHub
- [x] `.gitignore` configured (excludes node_modules, .env, etc.)
- [x] Backend builds successfully (`npm run build` in backend/)
- [x] Frontend builds successfully (`npm run build` in frontend/)
- [x] Database migrations ready

## Step 1: Deploy Backend on Render (Free Tier)

### Render Setup
- [ ] Sign up at https://render.com (use GitHub login, no credit card needed!)
- [ ] Create PostgreSQL database:
  - [ ] Click "New +" → "PostgreSQL"
  - [ ] Select **Free** plan
  - [ ] Copy Internal Database URL
- [ ] Create Web Service:
  - [ ] Click "New +" → "Web Service"
  - [ ] Connect GitHub → Select `nmatunog/aquapure`
  - [ ] Set Root Directory to: `backend`
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Start Command: `npm run start:prod`
  - [ ] Select **Free** plan
- [ ] Configure environment variables:
  - [ ] `DATABASE_URL` = (Internal Database URL from PostgreSQL)
  - [ ] `JWT_SECRET` = `5C9lOoFWuDVYi/QvMWuvm8hJocVCVBcXin8BY9K2ap4=`
  - [ ] `JWT_EXPIRES_IN` = `7d`
  - [ ] `CORS_ORIGIN` = `https://your-app-name.netlify.app` (update after frontend deploy)
  - [ ] `NODE_ENV` = `production`
  - [ ] `PORT` = `10000` (Render default, or use `process.env.PORT`)
- [ ] Wait for first deployment (~3-5 minutes)
- [ ] Run migrations in Render Shell:
  ```bash
  cd backend
  npx prisma migrate deploy
  npx prisma generate
  ```
- [ ] Get backend URL from service dashboard (e.g., `aquapure-backend.onrender.com`)
- [ ] Test backend: `curl https://your-backend.onrender.com/api/auth/login`

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

- [ ] Go back to Render web service
- [ ] Settings → Environment → Edit `CORS_ORIGIN`
- [ ] Update to: `https://your-app-name.netlify.app`
- [ ] Save (Render will auto-redeploy)

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

- Backend URL: `https://________________.onrender.com`
- Frontend URL: `https://________________.netlify.app`

## Troubleshooting

### Backend Issues
- Check Render deployment logs
- Verify all environment variables are set
- Ensure migrations ran successfully
- Test backend directly: `curl https://your-backend.onrender.com/api/auth/login`
- Note: First request after 15 min inactivity may be slow (cold start)

### Frontend Issues
- Check Vercel build logs
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check browser console for errors
- Verify CORS is configured correctly

### Database Issues
- Verify `DATABASE_URL` is the Internal Database URL
- Check if migrations ran: `npx prisma migrate status` in Render shell
- Ensure database service shows "Available" status
- Use Internal Database URL for better performance

