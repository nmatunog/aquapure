# Netlify Frontend Setup Guide

## Step-by-Step Instructions

### 1. Sign Up / Login to Netlify
- Go to https://netlify.com
- Sign up with GitHub (recommended) or email

### 2. Import Project
- Click "Add new site" → "Import an existing project"
- Click "Deploy with GitHub"
- Authorize Netlify to access your GitHub
- Select repository: `nmatunog/aquapure`

### 3. Configure Build Settings
**Important**: Netlify needs manual configuration for Next.js

Click "Show advanced" or "Edit settings" and configure:

**Base directory**: `frontend`

**Build command**: 
```
cd frontend && npm install && npm run build
```

**Publish directory**: 
```
frontend/.next
```

**OR** if the above doesn't work, try:
- Build command: `npm run build` (with base directory set to `frontend`)
- Publish directory: `.next`

### 4. Add Environment Variable
**IMPORTANT**: You need your Railway backend URL first!

- Scroll down to "Environment variables"
- Click "Add a variable"
- Add:
  ```
  Key: NEXT_PUBLIC_API_URL
  Value: https://your-backend.up.railway.app
  ```
- Click "Save"

### 5. Configure Next.js for Netlify
Netlify needs a special configuration for Next.js. Let's add it:

**Option A: Use Netlify Next.js Plugin (Recommended)**
- Netlify should auto-detect Next.js and configure it
- If not, the build settings above should work

**Option B: Add netlify.toml (if needed)**
Create `frontend/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 6. Deploy
- Click "Deploy site"
- Wait for build to complete (~3-5 minutes)
- Your app will be live at: `your-app-name.netlify.app`

### 7. Update Backend CORS
After deployment:
- Go back to Railway backend service
- Update `CORS_ORIGIN` environment variable to: `https://your-app-name.netlify.app`
- Railway will auto-redeploy

## Troubleshooting

### Build fails with "Cannot find module"
- Verify base directory is set to `frontend`
- Check that `package.json` exists in `frontend/` directory
- Try build command: `cd frontend && npm install && npm run build`

### Build succeeds but site shows 404
- Verify publish directory is set correctly
- For Next.js, it should be `.next` or `frontend/.next`
- Check Netlify build logs for warnings

### Can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check Railway backend is running
- Verify CORS is configured correctly in backend

### CORS errors
- Update `CORS_ORIGIN` in Railway to match your Netlify URL
- Include `https://` protocol
- No trailing slash

## Custom Domain (Optional)
- Go to Site settings → Domain management
- Click "Add custom domain"
- Follow DNS configuration instructions

## Netlify vs Vercel for Next.js

**Netlify Pros:**
- Good free tier
- Easy form handling
- Split testing features
- More flexible for various frameworks

**Netlify Cons:**
- Requires manual Next.js configuration
- Slower builds than Vercel
- Less optimized for Next.js

**Note**: Vercel is generally easier for Next.js, but Netlify works great too!

