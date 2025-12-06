# Deploy Frontend to Netlify - Step by Step

## Prerequisites
- ✅ Backend is deployed on Render: `https://aquapure-backend-zfms.onrender.com`
- ✅ GitHub repository is pushed: `nmatunog/aquapure`

## Step 1: Sign Up / Login to Netlify

1. Go to https://netlify.com
2. Click "Sign up" or "Log in"
3. **Choose "Sign up with GitHub"** (recommended - easier integration)
4. Authorize Netlify to access your GitHub account

## Step 2: Import Your Project

1. In Netlify dashboard, click **"Add new site"** button (top right)
2. Select **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. If not connected, authorize Netlify to access GitHub
5. Select your repository: **`nmatunog/aquapure`**
6. Click **"Connect"**

## Step 3: Configure Build Settings

**Important:** Netlify needs to know where your frontend code is!

Fill in these settings:

### Basic Settings
- **Branch to deploy:** `main` (or your main branch)
- **Base directory:** `frontend` ← **IMPORTANT!**
- **Build command:** `npm install && npm run build`
- **Publish directory:** `.next` ← **IMPORTANT!**

### Advanced Settings (Click "Show advanced")

If you see advanced options:
- **Base directory:** `frontend`
- **Build command:** `cd frontend && npm install && npm run build`
- **Publish directory:** `frontend/.next`

**Note:** The `netlify.toml` file should handle this, but verify these settings match.

## Step 4: Add Environment Variable

**Before clicking "Deploy site":**

1. Scroll down to **"Environment variables"** section
2. Click **"Add a variable"**
3. Add:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://aquapure-backend-zfms.onrender.com`
   - **⚠️ NO trailing slash!**
4. Click **"Add variable"**

## Step 5: Deploy!

1. Click **"Deploy site"** button (bottom of page)
2. Wait for build to complete (~3-5 minutes)
3. You'll see build progress in real-time
4. When done, you'll get a URL like: `https://random-name-123.netlify.app`

## Step 6: Get Your Site URL

After deployment:
1. Your site URL will be shown at the top
2. It will be something like: `https://aquapure-xyz.netlify.app`
3. **Save this URL!** You'll need it for CORS configuration

## Step 7: Update Backend CORS

1. Go back to **Render dashboard**
2. Open your **backend web service**
3. Go to **"Environment"** tab
4. Find `CORS_ORIGIN`
5. Update it to your Netlify URL:
   ```
   https://your-site-name.netlify.app
   ```
6. **Save** (Render will auto-redeploy)

## Step 8: Test Your Site

1. Visit your Netlify URL
2. Try logging in
3. Check browser console (F12) for any errors
4. Test creating an audit

## Troubleshooting

### Build Fails: "Cannot find module"
- Verify **Base directory** is set to `frontend`
- Check that `package.json` exists in `frontend/` directory
- Try build command: `cd frontend && npm install && npm run build`

### Build Succeeds but Site Shows 404
- Verify **Publish directory** is `.next` (not `frontend/.next`)
- Check Netlify build logs for warnings
- Next.js might need special configuration

### Can't Connect to Backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Netlify
- Check it matches your Render backend URL exactly
- No trailing slash in the URL
- Check browser console for CORS errors

### CORS Errors
- Update `CORS_ORIGIN` in Render to match your Netlify URL
- Include `https://` protocol
- No trailing slash
- Wait for Render to redeploy after updating

## Quick Checklist

- [ ] Signed up/logged in to Netlify
- [ ] Connected GitHub account
- [ ] Selected repository: `nmatunog/aquapure`
- [ ] Set Base directory: `frontend`
- [ ] Set Build command: `npm install && npm run build`
- [ ] Set Publish directory: `.next`
- [ ] Added environment variable: `NEXT_PUBLIC_API_URL = https://aquapure-backend-zfms.onrender.com`
- [ ] Clicked "Deploy site"
- [ ] Waited for build to complete
- [ ] Got Netlify URL
- [ ] Updated Render CORS_ORIGIN with Netlify URL
- [ ] Tested the site

## Next Steps After Deployment

1. ✅ Test login functionality
2. ✅ Test audit creation
3. ✅ Test metrics display
4. ✅ Check all features work
5. ✅ (Optional) Set up custom domain

## Your Deployment URLs

After completing these steps, you'll have:

- **Backend:** `https://aquapure-backend-zfms.onrender.com`
- **Frontend:** `https://your-site-name.netlify.app`
- **Database:** Render PostgreSQL (connected)

Your app will be fully deployed and accessible! 🎉

