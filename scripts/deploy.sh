#!/bin/bash
# Deployment script with Git checks
# Ensures all changes are pushed to GitHub before deployment

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 Starting deployment process..."

# Run pre-deployment checks
"$SCRIPT_DIR/pre-deploy-check.sh"

# Change to project root
cd "$PROJECT_ROOT"

# Determine what to deploy
DEPLOY_TARGET="${1:-all}"

case "$DEPLOY_TARGET" in
  frontend)
    echo "📦 Deploying frontend..."
    cd frontend
    npm run build
    echo "✅ Frontend build complete"
    ;;
  backend)
    echo "📦 Deploying backend..."
    cd backend
    npm run build
    echo "✅ Backend build complete"
    ;;
  all)
    echo "📦 Deploying both frontend and backend..."
    
    echo "Building backend..."
    cd backend
    npm run build
    cd ..
    
    echo "Building frontend..."
    cd frontend
    npm run build
    cd ..
    
    echo "✅ All builds complete"
    ;;
  *)
    echo "❌ Unknown deployment target: $DEPLOY_TARGET"
    echo "Usage: ./scripts/deploy.sh [frontend|backend|all]"
    exit 1
    ;;
esac

echo "🎉 Deployment process completed successfully!"

