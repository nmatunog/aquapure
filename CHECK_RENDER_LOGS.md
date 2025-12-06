# How to Check Render Logs for 500 Error

## Step 1: Access Render Logs

1. Go to https://render.com
2. Log in to your account
3. Click on your **backend web service** (e.g., `aquapure-backend`)

## Step 2: View Logs

1. Click on **"Logs"** tab (top navigation)
2. You'll see a chronological list of log messages

## Step 3: Find the Error

Look for:
- **Red text** - indicates errors
- **Recent timestamps** - errors that happened when you tried to login
- **Error messages** containing:
  - `PrismaClientKnownRequestError`
  - `Table does not exist`
  - `Migration failed`
  - `Cannot find module`
  - `Connection refused`

## Step 4: Common Error Patterns

### Error 1: Table Does Not Exist
```
PrismaClientKnownRequestError: 
The table `public.users` does not exist
```
**Fix:** Migrations haven't run. Update start command to: `npm run migrate:deploy && npm run start:prod`

### Error 2: Database Connection Failed
```
Can't reach database server
Connection refused
```
**Fix:** Check `DATABASE_URL` environment variable is set correctly

### Error 3: Prisma Client Not Found
```
Cannot find module '@prisma/client'
```
**Fix:** Prisma client not generated. Should run automatically via `postinstall` script.

### Error 4: Migration Failed
```
Migration failed: ...
```
**Fix:** Check the specific migration error message

## Step 5: Share the Error

Copy the **full error message** including:
- The error type (e.g., `PrismaClientKnownRequestError`)
- The error message
- The stack trace (if available)

This will help identify the exact issue!

