# Fix: Render Database URL Configuration

## Error
```
PrismaClientInitializationError: error: Error validating datasource 'db': 
the URL must start with the protocol 'postgresql://' or 'postgres://'.
errorCode: 'P1012'
```

## Problem
The `DATABASE_URL` environment variable in Render is either:
1. ❌ Not set
2. ❌ Set incorrectly (missing protocol)
3. ❌ Using External URL instead of Internal URL

## Solution: Fix DATABASE_URL in Render

### Step 1: Get the Correct Database URL

1. **Go to Render Dashboard**
2. **Click on your PostgreSQL database service** (e.g., `aquapure-db`)
3. **Go to "Info" tab** or **"Connections" tab**
4. **Look for "Internal Database URL"** (NOT External!)
5. **Copy the entire URL** - it should look like:
   ```
   postgresql://user:password@dpg-xxxxx-a.oregon-postgres.render.com/aquapure
   ```

**⚠️ Important:** Use the **Internal Database URL**, not the External one. Internal is faster and more secure.

### Step 2: Update Environment Variable in Web Service

1. **Go to your Web Service** (e.g., `aquapure-backend`)
2. **Click "Environment" tab** (or "Settings" → "Environment")
3. **Find `DATABASE_URL`** in the list
4. **Click "Edit"** or the pencil icon
5. **Paste the Internal Database URL** you copied
6. **Click "Save"**

### Step 3: Verify the URL Format

The URL should:
- ✅ Start with `postgresql://` or `postgres://`
- ✅ Include username, password, host, and database name
- ✅ Be the **Internal** URL (not External)

**Example of correct format:**
```
postgresql://aquapure_user:password123@dpg-xxxxx-a.oregon-postgres.render.com/aquapure
```

### Step 4: Redeploy

After updating the environment variable:
- Render will **automatically redeploy** your service
- Or manually trigger: Click "Manual Deploy" → "Deploy latest commit"
- Wait for deployment to complete (~2-3 minutes)

### Step 5: Check Logs

After redeployment, check the logs:
- Should see: `[NestFactory] Starting Nest application...`
- Should see: `PrismaModule dependencies initialized`
- Should **NOT** see: `P1012` error

## Common Mistakes

### ❌ Wrong: External Database URL
```
postgresql://user:pass@external-host.render.com/aquapure
```
**Problem:** External URLs are slower and may have connection limits.

### ✅ Correct: Internal Database URL
```
postgresql://user:pass@dpg-xxxxx-a.oregon-postgres.render.com/aquapure
```
**Solution:** Use Internal URL for better performance.

### ❌ Wrong: Missing Protocol
```
dpg-xxxxx-a.oregon-postgres.render.com/aquapure
```
**Problem:** Prisma requires `postgresql://` or `postgres://` prefix.

### ✅ Correct: With Protocol
```
postgresql://user:pass@dpg-xxxxx-a.oregon-postgres.render.com/aquapure
```
**Solution:** Always include the protocol.

### ❌ Wrong: Empty or Not Set
```
DATABASE_URL = (empty)
```
**Problem:** Environment variable not set at all.

### ✅ Correct: Properly Set
```
DATABASE_URL = postgresql://user:pass@host/db
```
**Solution:** Set the variable with the full URL.

## Quick Checklist

- [ ] Opened PostgreSQL database service in Render
- [ ] Found "Internal Database URL" (not External)
- [ ] Copied the entire URL (including `postgresql://`)
- [ ] Opened Web Service → Environment tab
- [ ] Updated `DATABASE_URL` with Internal URL
- [ ] Saved the changes
- [ ] Waited for auto-redeploy (or manually triggered)
- [ ] Checked logs - no more P1012 error

## Still Having Issues?

### Check Environment Variables
1. Go to Web Service → Environment
2. Verify `DATABASE_URL` is set
3. Verify it starts with `postgresql://` or `postgres://`
4. Verify it's the Internal URL

### Test Database Connection
In Render Shell, you can test:
```bash
cd backend
node -e "console.log(process.env.DATABASE_URL)"
```

Should output the database URL (without showing password).

### Check Database Status
1. Go to PostgreSQL service
2. Verify status is "Available" (green)
3. If "Unavailable", wait a bit or recreate

## Next Steps After Fix

Once the database connection works:
1. ✅ Run migrations (if not already done):
   ```bash
   cd backend
   npx prisma migrate deploy
   npx prisma generate
   ```
2. ✅ Test the API endpoints
3. ✅ Update frontend (Netlify) with backend URL
4. ✅ Update CORS in backend

