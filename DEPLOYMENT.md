# Deployment Guide

## Automatic Git Sync Before Deployment

This project is configured to automatically check and sync with GitHub before any deployment.

## Pre-Deployment Checks

The system automatically:
1. ✅ Checks for uncommitted changes
2. ✅ Verifies you're on the correct branch (main)
3. ✅ Fetches latest from GitHub
4. ✅ Ensures local branch is in sync with remote
5. ✅ Pushes any unpushed commits automatically

## Deployment Methods

### Method 1: Using npm scripts (Recommended)

**Frontend:**
```bash
cd frontend
npm run deploy
```

**Backend:**
```bash
cd backend
npm run deploy
```

The `predeploy` hook automatically runs the Git check before building.

### Method 2: Using deployment script

```bash
# Deploy everything
./scripts/deploy.sh all

# Deploy only frontend
./scripts/deploy.sh frontend

# Deploy only backend
./scripts/deploy.sh backend
```

### Method 3: Manual Git check

```bash
# Run pre-deployment check manually
./scripts/pre-deploy-check.sh

# Then build normally
cd frontend && npm run build
cd backend && npm run build
```

## What Happens During Pre-Deployment Check

1. **Uncommitted Changes**: Script will fail if there are uncommitted changes
2. **Untracked Files**: Warning shown, but you can continue
3. **Branch Check**: Warns if not on main branch
4. **Remote Sync**: Automatically fetches and checks sync status
5. **Auto-Push**: Automatically pushes any unpushed commits

## GitHub Actions CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Runs on every push to `main`
- Checks Git status
- Builds frontend and backend
- Runs linters
- Ensures code quality before deployment

## Manual Deployment Steps

If you need to deploy manually:

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Run pre-deployment check:**
   ```bash
   ./scripts/pre-deploy-check.sh
   ```

4. **Build and deploy:**
   ```bash
   # Frontend
   cd frontend && npm run build
   
   # Backend
   cd backend && npm run build
   ```

## Troubleshooting

### "You have uncommitted changes"
- Commit or stash your changes before deploying
- Use `git status` to see what's changed

### "Your branch is behind origin/main"
- Pull latest changes: `git pull origin main`
- Resolve any conflicts
- Push again: `git push origin main`

### "Your branch has diverged"
- Sync your branch: `git pull --rebase origin main`
- Resolve conflicts if any
- Push: `git push origin main`

### Script permission denied
```bash
chmod +x scripts/pre-deploy-check.sh scripts/deploy.sh
```

## Best Practices

1. **Always work on feature branches** for new features
2. **Merge to main** only after code review
3. **Run pre-deployment checks** before any deployment
4. **Keep main branch in sync** with GitHub
5. **Use semantic commit messages** for better tracking

## Production Deployment

For production deployments:

1. Ensure all tests pass
2. Run pre-deployment checks
3. Tag the release: `git tag -a v1.0.0 -m "Release v1.0.0"`
4. Push tag: `git push origin v1.0.0`
5. Deploy using your hosting platform's deployment process

