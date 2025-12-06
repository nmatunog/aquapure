# Render Build Fix: "nest: not found" Error

## Problem
Build fails with error:
```
sh: 1: nest: not found
==> Build failed
```

## Root Cause
The `nest` command isn't in PATH during Render's build process, even though `@nestjs/cli` is installed in `node_modules`.

## Solution
Updated `backend/package.json` to use `npx` which ensures the command is found:

**Before:**
```json
"build": "nest build"
```

**After:**
```json
"build": "npx nest build"
```

## What Changed
- ✅ Updated `build` script to use `npx nest build`
- ✅ Updated `start` script to use `npx nest start`
- ✅ Updated `start:dev` script to use `npx nest start --watch`
- ✅ Updated `start:debug` script to use `npx nest start --debug --watch`

## Why This Works
- `npx` automatically finds executables in `node_modules/.bin`
- Works even if the binary isn't in system PATH
- Standard practice for npm scripts

## Next Steps
1. **Commit and push the fix:**
   ```bash
   git add backend/package.json
   git commit -m "fix: use npx for nest commands in build scripts"
   git push origin main
   ```

2. **Render will auto-redeploy** (if connected to GitHub)
   - Or manually trigger a new deployment in Render dashboard

3. **Monitor the build logs** to confirm it succeeds

## Alternative Solutions (if npx doesn't work)

### Option 1: Use TypeScript directly
```json
"build": "tsc -p tsconfig.json"
```

### Option 2: Install @nestjs/cli globally in build
Add to build command:
```bash
npm install -g @nestjs/cli && npm install && npm run build
```

### Option 3: Use full path
```json
"build": "./node_modules/.bin/nest build"
```

But `npx` should work fine! ✅

