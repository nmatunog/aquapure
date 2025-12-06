# Quick Migration: Railway → Render

## Why Migrate?
- ✅ **Truly free** (750 hours/month, no credit card)
- ✅ **No credit-based limits** (Railway uses $5/month credit)
- ✅ **PostgreSQL included** in free tier
- ✅ **Same ease of use** as Railway

## Migration Steps

### Step 1: Set Up Render (Before Deleting Railway)

#### 1.1 Create Render Account
- Go to https://render.com
- Sign up with GitHub (same account as Railway)
- **No credit card required!**

#### 1.2 Create PostgreSQL Database
- In Render dashboard, look for the **"New +"** button (usually top-right or in the main dashboard)
- Click **"New +"** → Select **"PostgreSQL"** from the dropdown menu
- Fill in the form:
  - **Name:** `aquapure-db` (or any name you prefer)
  - **Database:** `aquapure` (or leave default)
  - **User:** Leave default (auto-generated)
  - **Region:** Choose closest to you (e.g., "Oregon (US West)" for US)
  - **PostgreSQL Version:** 15 (or latest available)
  - **Plan:** Select **"Free"** (this is important!)
- Click **"Create Database"**
- Wait ~1 minute for provisioning
- Once ready, click on the database service
- Go to **"Info"** or **"Connections"** tab
- **Copy the "Internal Database URL"** (starts with `postgresql://...`)
- **Save this URL!** You'll need it for the backend service

#### 1.3 Create Web Service
- Click "New +" → "Web Service"
- Connect GitHub → Select `nmatunog/aquapure`
- Configure:
  - **Name:** `aquapure-backend`
  - **Region:** Same as database
  - **Branch:** `main`
  - **Root Directory:** `backend`
  - **Runtime:** `Node`
  - **Build Command:** `npm install && npm run build`
  - **Start Command:** `npm run start:prod`
  
  **Note:** The build script now uses `npx nest build` to ensure NestJS CLI is found during build.
  - **Plan:** **Free**

#### 1.4 Add Environment Variables
Before clicking "Create", add these variables:

```
DATABASE_URL = <paste Internal Database URL>
JWT_SECRET = 5C9lOoFWuDVYi/QvMWuvm8hJocVCVBcXin8BY9K2ap4=
JWT_EXPIRES_IN = 7d
CORS_ORIGIN = https://your-app-name.netlify.app
NODE_ENV = production
PORT = 10000
```

**⚠️ CRITICAL:** 
- Use the **Internal Database URL** (not External!)
- The URL must start with `postgresql://` or `postgres://`
- Get it from PostgreSQL service → Info tab → "Internal Database URL"
- Example: `postgresql://user:pass@dpg-xxxxx-a.oregon-postgres.render.com/aquapure`

**Note:** Get `JWT_SECRET` from Railway if you want to keep same tokens, or generate new one.

#### 1.5 Deploy
- Click "Create Web Service"
- Wait for deployment (~3-5 minutes)

#### 1.6 Run Migrations
- Go to your web service dashboard
- Click "Shell" tab
- Run:
  ```bash
  cd backend
  npx prisma migrate deploy
  npx prisma generate
  ```

#### 1.7 Get Backend URL
- Copy the URL from service dashboard
- Example: `aquapure-backend.onrender.com`
- Full URL: `https://aquapure-backend.onrender.com`

### Step 2: Update Frontend (Netlify)

#### 2.1 Update Environment Variable
- Go to Netlify dashboard
- Site settings → Environment variables
- Edit `NEXT_PUBLIC_API_URL`
- Change from Railway URL to Render URL:
  ```
  https://aquapure-backend.onrender.com
  ```
- Save (Netlify will auto-redeploy)

#### 2.2 Update CORS in Render
- Go back to Render web service
- Settings → Environment
- Edit `CORS_ORIGIN`
- Ensure it matches your Netlify URL:
  ```
  https://your-app-name.netlify.app
  ```
- Save (Render will auto-redeploy)

### Step 3: Test Everything

#### 3.1 Test Backend
```bash
curl https://your-backend.onrender.com/api/auth/login
```

Should return JSON (even if error, means backend is running).

#### 3.2 Test Frontend
- Visit your Netlify URL
- Try logging in
- Check if data loads correctly

#### 3.3 Test Database
- Try creating an audit
- Check if it saves to database
- Verify data persists

### Step 4: Clean Up Railway (Optional)

**⚠️ Only delete Railway after confirming Render works!**

#### 4.1 Verify Everything Works
- Test all features
- Check logs for errors
- Ensure data is saving

#### 4.2 Delete Railway Services
- Go to Railway dashboard
- Delete backend service
- Delete PostgreSQL database
- Delete project (optional)

## Data Migration (If Needed)

If you have existing data in Railway:

### Option 1: Fresh Start (Recommended for Development)
- Just use new Render database
- Start fresh (no migration needed)

### Option 2: Export/Import Data
1. **Export from Railway:**
   ```bash
   # In Railway shell
   pg_dump $DATABASE_URL > backup.sql
   ```

2. **Import to Render:**
   ```bash
   # In Render shell
   psql $DATABASE_URL < backup.sql
   ```

**Note:** For development/testing, fresh start is usually fine.

## Environment Variables Comparison

### Railway → Render Mapping

| Railway | Render | Notes |
|---------|--------|-------|
| `DATABASE_URL` | `DATABASE_URL` | Use Internal Database URL in Render |
| `JWT_SECRET` | `JWT_SECRET` | Copy from Railway or generate new |
| `JWT_EXPIRES_IN` | `JWT_EXPIRES_IN` | Same value |
| `CORS_ORIGIN` | `CORS_ORIGIN` | Update to Netlify URL |
| `NODE_ENV` | `NODE_ENV` | `production` |
| `PORT` | `PORT` | `3001` → `10000` (Render default) |

## Troubleshooting

### Backend won't start on Render
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure `DATABASE_URL` is Internal URL (not External)
- Check if port is correct (Render uses 10000 by default)

### Database connection errors
- Verify `DATABASE_URL` is Internal Database URL
- Check database status (should be "Available")
- Ensure migrations ran successfully

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` in Netlify matches Render URL
- Check CORS is set correctly in Render
- Test backend directly with curl

### Slow first request
- This is normal! Render spins down after 15 min inactivity
- First request takes ~30 seconds (cold start)
- Subsequent requests are fast
- This is the trade-off for free tier

## Key Differences: Railway vs Render

| Feature | Railway | Render |
|---------|---------|--------|
| **Free Tier** | $5 credit/month | 750 hours/month |
| **PostgreSQL** | Included | Included |
| **Credit Card** | Required | Not required |
| **Spin-down** | No | Yes (15 min) |
| **Cold Start** | N/A | ~30 seconds |
| **Setup** | Very easy | Very easy |
| **Port** | Custom (3001) | Default (10000) |

## Rollback Plan

If something goes wrong:

1. **Keep Railway running** until Render is fully tested
2. **Update Netlify** back to Railway URL if needed
3. **Fix issues** in Render
4. **Switch back** when ready

## Timeline

- **Setup Render:** ~10 minutes
- **Deploy & Migrate:** ~5 minutes
- **Testing:** ~5 minutes
- **Total:** ~20 minutes

## Next Steps After Migration

1. ✅ Monitor Render logs for first few days
2. ✅ Test all features thoroughly
3. ✅ Update any documentation with new URLs
4. ✅ Delete Railway services (after confirming everything works)
5. ✅ Celebrate saving money! 🎉

## Need Help?

- Check `RENDER_SETUP.md` for detailed setup
- Check `BACKEND_DEPLOYMENT_OPTIONS.md` for alternatives
- Render docs: https://render.com/docs

---

**Pro Tip:** Keep Railway running for 24-48 hours after migration to ensure everything works smoothly before deleting it!

