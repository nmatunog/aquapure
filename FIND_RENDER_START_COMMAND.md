# How to Find and Update Render Start Command

## Step-by-Step Guide

### Step 1: Go to Your Backend Service
1. Go to https://render.com
2. Log in to your account
3. You should see a list of your services
4. **Click on your backend web service** (e.g., `aquapure-backend` or similar name)

### Step 2: Navigate to Settings
Once you're in your backend service dashboard, you'll see several tabs at the top:
- **Logs** (shows deployment logs)
- **Metrics** (shows performance data)
- **Events** (shows deployment history)
- **Settings** ← **Click this one!**

### Step 3: Find Start Command
In the Settings page, scroll down. You'll see several sections:

**Look for these sections (in order):**
1. **Service Details** (name, region, etc.)
2. **Build & Deploy** ← **The Start Command is here!**
3. **Environment Variables**
4. **Health Checks**
5. **Networking**

### Step 4: Update Start Command
In the **Build & Deploy** section, you'll see:

**Build Command:**
```
npm install && npm run build
```

**Start Command:** ← **This is what you need to update!**
```
npm run start:prod
```

**Change it to:**
```
npm run migrate:deploy && npm run start:prod
```

### Step 5: Save Changes
1. Click **"Save Changes"** button (usually at the bottom of the Settings page)
2. Render will automatically trigger a new deployment

## Alternative: If You Don't See Settings Tab

If you don't see a Settings tab, try:

### Option 1: Check Service Type
- Make sure you're looking at a **Web Service**, not a Database
- Web Services have Settings, Databases don't

### Option 2: Look for "Configure" Button
- Some Render interfaces show a **"Configure"** button instead
- Click that to access settings

### Option 3: Check Service Dashboard
- In the service dashboard, look for a **gear icon** ⚙️ or **"Edit"** button
- This usually opens settings

## Visual Guide

```
Render Dashboard
┌─────────────────────────────────────┐
│  [Logs] [Metrics] [Events] [Settings] ← Click Settings
└─────────────────────────────────────┘
         ↓
Settings Page
┌─────────────────────────────────────┐
│ Service Details                      │
│   Name: aquapure-backend             │
│   Region: Oregon                    │
│                                      │
│ Build & Deploy  ← Look here!        │
│   Build Command:                     │
│   npm install && npm run build      │
│                                      │
│   Start Command:  ← UPDATE THIS!    │
│   npm run start:prod                │
│   ↓ Change to:                      │
│   npm run migrate:deploy && npm run start:prod
│                                      │
│ Environment Variables                │
│   DATABASE_URL=...                  │
│   ...                               │
└─────────────────────────────────────┘
```

## Still Can't Find It?

### Check Your Service Type
1. Go to your Render dashboard
2. Look at your services list
3. Make sure you're clicking on the **Web Service** (not PostgreSQL database)
4. Web Services have a blue/teal icon
5. Databases have a different icon

### What Your Service Should Look Like
- **Name:** Something like `aquapure-backend` or `backend`
- **Type:** "Web Service"
- **Status:** "Live" or "Deployed"
- **Has tabs:** Logs, Metrics, Events, Settings

### If It's a Database Service
- Databases don't have a Start Command
- You need to find your **Web Service** instead
- Look for the service that runs your Node.js/NestJS code

## Quick Checklist

- [ ] Logged into Render
- [ ] Found your backend **Web Service** (not database)
- [ ] Clicked on the service name
- [ ] See tabs: Logs, Metrics, Events, Settings
- [ ] Clicked "Settings" tab
- [ ] Scrolled to "Build & Deploy" section
- [ ] Found "Start Command" field
- [ ] Updated to: `npm run migrate:deploy && npm run start:prod`
- [ ] Clicked "Save Changes"

## Need More Help?

If you still can't find it:
1. **Take a screenshot** of your Render dashboard
2. Or describe what you see:
   - What tabs are visible?
   - What sections do you see?
   - Are you looking at a Web Service or Database?

This will help me guide you more specifically!

