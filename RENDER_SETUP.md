# Render Backend Setup Guide (Free Alternative to Railway)

## Why Render?
- ✅ **750 hours/month free** (enough for 24/7)
- ✅ **PostgreSQL included** in free tier
- ✅ **No credit card required**
- ✅ **Easy GitHub integration**
- ✅ **Auto-deploys on git push**

## Step-by-Step Instructions

### 1. Sign Up / Login to Render
- Go to https://render.com
- Sign up with GitHub (recommended) or email
- **No credit card required!**

### 2. Create PostgreSQL Database
- Click "New +" → "PostgreSQL"
- Name: `aquapure-db` (or any name)
- Database: `aquapure`
- Region: Choose closest to you
- PostgreSQL Version: 15 (or latest)
- Plan: **Free** (select this!)
- Click "Create Database"
- Wait ~1 minute for provisioning
- **Copy the Internal Database URL** (from database dashboard)

### 3. Create Backend Web Service
- Click "New +" → "Web Service"
- Connect your GitHub account (if not already)
- Select repository: `nmatunog/aquapure`
- Click "Connect"

### 4. Configure Web Service
Fill in the form:

**Name:** `aquapure-backend` (or any name)

**Region:** Choose closest to you

**Branch:** `main`

**Root Directory:** `backend`

**Runtime:** `Node`

**Build Command:** 
```
npm install && npm run build
```

**Note:** 
- `npm install` will automatically run `prisma generate` (via postinstall script)
- This ensures Prisma client is generated during build

**Start Command:**
```
npm run migrate:deploy && npm run start:prod
```

**Note:** This runs migrations first, then starts the server. If migrations fail, the app won't start (preventing 500 errors).

**Plan:** **Free** (select this!)

### 5. Add Environment Variables
Before clicking "Create Web Service", scroll to "Advanced" → "Add Environment Variable"

Add these variables:

```
DATABASE_URL = <paste Internal Database URL from PostgreSQL>
JWT_SECRET = 5C9lOoFWuDVYi/QvMWuvm8hJocVCVBcXin8BY9K2ap4=
JWT_EXPIRES_IN = 7d
CORS_ORIGIN = https://your-app-name.netlify.app
NODE_ENV = production
PORT = 10000
```

**Note:** Render uses port 10000 by default (or check what port they assign)

### 6. Create Web Service
- Click "Create Web Service"
- Wait for first deployment (~3-5 minutes)

### 7. Run Database Migrations
- Go to your web service dashboard
- Click "Shell" tab (or "Logs" → "Shell")
- Run:
  ```bash
  cd backend
  npx prisma migrate deploy
  npx prisma generate
  ```

### 8. Get Backend URL
- Go to your web service dashboard
- Look for "URL" section
- Copy the URL (e.g., `aquapure-backend.onrender.com`)
- This is your backend URL!

### 9. Update CORS After Frontend Deploy
- After deploying frontend on Netlify
- Go back to Render web service
- Settings → Environment → Edit `CORS_ORIGIN`
- Set to your Netlify URL: `https://your-app-name.netlify.app`
- Save (will auto-redeploy)

## Important Notes

### Free Tier Limitations
- ⚠️ **Spins down after 15 minutes of inactivity**
- ⚠️ **First request after spin-down takes ~30 seconds** (cold start)
- ⚠️ **After that, it's fast** until next inactivity period
- ✅ **Free tier doesn't expire** (unlike AWS/GCP credits)

### Port Configuration
- Render assigns a port automatically (usually 10000)
- Your NestJS app should use `process.env.PORT` (which it does)
- No need to hardcode port

### Database Connection
- Use **Internal Database URL** for better performance
- Internal URL is only accessible from Render services
- External URL is also available if needed

## Troubleshooting

### Backend won't start
- Check "Logs" tab in Render dashboard
- Verify all environment variables are set
- Ensure `DATABASE_URL` is correct
- Check if port is set correctly

### Database connection errors
- Verify `DATABASE_URL` is the Internal URL
- Check if database is running (should show "Available")
- Ensure migrations ran successfully

### Build fails
- Check build logs
- Verify `package.json` exists in `backend/` directory
- Ensure Node.js version is compatible

### Slow first request
- This is normal (cold start after 15 min inactivity)
- Subsequent requests are fast
- Consider upgrading to paid plan if you need 24/7 without spin-down

## Cost Comparison

| Platform | Free Tier | Paid (No Spin-down) |
|----------|-----------|---------------------|
| **Render** | ✅ Free (spins down) | $7/month |
| **Railway** | $5 credit/month | $20/month |
| **Fly.io** | ✅ Free (3 VMs) | $1.94/month per VM |
| **Supabase** | ✅ Free (500MB) | $25/month |

## Migration from Railway

If you already set up Railway and want to switch:

1. Follow steps above to set up Render
2. Update Netlify `NEXT_PUBLIC_API_URL` to Render URL
3. Update Render `CORS_ORIGIN` to Netlify URL
4. Test everything works
5. Delete Railway services (optional)

## Next Steps

After backend is deployed on Render:
1. Get backend URL from Render
2. Deploy frontend on Netlify (use Render URL)
3. Update CORS in Render
4. Test your deployed app!

