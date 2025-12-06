# Render PostgreSQL Database - Quick Visual Guide

## Where to Find "New +" Button

The **"New +"** button appears in different places depending on your Render dashboard view:

### Option 1: Main Dashboard
- When you first log in, you'll see the main dashboard
- Look for a **blue "New +" button** in the top-right corner
- Or a **"New" button** in the center of the page

### Option 2: Inside a Project
- If you're inside a project, the **"New +"** button is usually:
  - Top-right corner of the page
  - Or in the left sidebar

### Option 3: If You Don't See It
- Make sure you're logged in to Render
- Try refreshing the page
- Look for any button that says "New", "Add", or has a "+" icon

## Step-by-Step: Creating PostgreSQL Database

### Step 1: Click "New +"
```
Render Dashboard
┌─────────────────────────────────────┐
│  Render Logo    [Dashboard] [New +] │ ← Click here
└─────────────────────────────────────┘
```

### Step 2: Select "PostgreSQL"
After clicking "New +", you'll see a dropdown menu:
```
┌─────────────────────┐
│ Web Service         │
│ Background Worker   │
│ PostgreSQL    ←─────│ Click this
│ Redis               │
│ Static Site         │
└─────────────────────┘
```

### Step 3: Fill in the Form
You'll see a form like this:

```
Create a PostgreSQL Database
┌─────────────────────────────────────┐
│ Name: [aquapure-db____________]      │
│ Database: [aquapure__________]       │
│ User: [auto-generated]               │
│ Region: [Oregon (US West) ▼]         │
│ PostgreSQL Version: [15 ▼]           │
│ Plan: ○ Free  ● Starter  ○ Standard  │ ← Select Free!
│                                      │
│ [Cancel]  [Create Database] ← Click │
└─────────────────────────────────────┘
```

**Important Settings:**
- **Name:** `aquapure-db` (or any name)
- **Database:** `aquapure` (or leave default)
- **Region:** Choose closest to you
- **Plan:** **Must select "Free"** (leftmost option)

### Step 4: Wait for Provisioning
- Click "Create Database"
- You'll see a loading screen
- Wait ~1 minute
- Status will change to "Available"

### Step 5: Get Database URL
Once the database is ready:

1. **Click on the database service** (in your dashboard)
2. You'll see several tabs: **Info**, **Connections**, **Logs**, etc.
3. **Click "Info" tab** or **"Connections" tab**
4. Look for **"Internal Database URL"**
5. It will look like:
   ```
   postgresql://user:password@dpg-xxxxx-a.oregon-postgres.render.com/aquapure
   ```
6. **Copy this entire URL** (click the copy icon or select all)

### Step 6: Save the URL
- Paste it somewhere safe (text file, notes app)
- You'll need it for the backend service environment variables
- **Use the "Internal Database URL"** (not External) for better performance

## Visual Guide: Database Dashboard

After creating, your database dashboard looks like:

```
aquapure-db
┌─────────────────────────────────────┐
│ [Info] [Connections] [Logs] [Data]  │ ← Click "Info" or "Connections"
│                                      │
│ Status: Available ✓                  │
│                                      │
│ Internal Database URL:               │
│ postgresql://user:pass@host/db      │ ← Copy this!
│ [📋 Copy]                            │
│                                      │
│ External Database URL:               │
│ postgresql://user:pass@host/db      │ (Use Internal for better performance)
└─────────────────────────────────────┘
```

## Troubleshooting

### Can't Find "New +" Button
- Make sure you're on the main Render dashboard (not inside a specific service)
- Try clicking "Dashboard" in the top navigation
- Refresh the page
- Make sure you're logged in

### Don't See "PostgreSQL" Option
- Make sure you're clicking "New +" from the main dashboard
- PostgreSQL should be in the list of services
- If not, try logging out and back in

### Can't Find Database URL
- Click on your database service name
- Look for tabs: "Info", "Connections", "Settings"
- The URL is usually in "Info" or "Connections" tab
- Look for "Internal Database URL" or "Connection String"

### Database Status Shows "Unavailable"
- Wait a bit longer (can take 1-2 minutes)
- Check the "Logs" tab for any errors
- Try refreshing the page
- If still unavailable after 5 minutes, delete and recreate

## Quick Checklist

- [ ] Logged into Render dashboard
- [ ] Found "New +" button
- [ ] Selected "PostgreSQL"
- [ ] Filled in name: `aquapure-db`
- [ ] Selected "Free" plan
- [ ] Clicked "Create Database"
- [ ] Waited for "Available" status
- [ ] Clicked on database service
- [ ] Found "Internal Database URL"
- [ ] Copied the URL
- [ ] Saved it somewhere safe

## Next Step

After getting the database URL, proceed to **Step 1.3: Create Web Service** in the migration guide.

