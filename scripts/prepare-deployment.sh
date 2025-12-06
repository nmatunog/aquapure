#!/bin/bash

# Deployment Preparation Script
# This script helps prepare the application for deployment

set -e

echo "🚀 Preparing Aquapure for deployment..."

# Check if we're in the project root
if [ ! -f "package.json" ] && [ ! -d "frontend" ] && [ ! -d "backend" ]; then
  echo "❌ Error: Please run this script from the project root directory"
  exit 1
fi

echo ""
echo "📦 Checking dependencies..."

# Check frontend dependencies
if [ -d "frontend" ]; then
  echo "  ✓ Frontend directory found"
  cd frontend
  if [ ! -d "node_modules" ]; then
    echo "  📥 Installing frontend dependencies..."
    npm install
  else
    echo "  ✓ Frontend dependencies installed"
  fi
  cd ..
else
  echo "  ⚠️  Frontend directory not found"
fi

# Check backend dependencies
if [ -d "backend" ]; then
  echo "  ✓ Backend directory found"
  cd backend
  if [ ! -d "node_modules" ]; then
    echo "  📥 Installing backend dependencies..."
    npm install
  else
    echo "  ✓ Backend dependencies installed"
  fi
  cd ..
else
  echo "  ⚠️  Backend directory not found"
fi

echo ""
echo "🔨 Building applications..."

# Build frontend
if [ -d "frontend" ]; then
  echo "  🔨 Building frontend..."
  cd frontend
  npm run build
  if [ $? -eq 0 ]; then
    echo "  ✅ Frontend build successful"
  else
    echo "  ❌ Frontend build failed"
    exit 1
  fi
  cd ..
fi

# Build backend
if [ -d "backend" ]; then
  echo "  🔨 Building backend..."
  cd backend
  npm run build
  if [ $? -eq 0 ]; then
    echo "  ✅ Backend build successful"
  else
    echo "  ❌ Backend build failed"
    exit 1
  fi
  cd ..
fi

echo ""
echo "📋 Checking environment variables..."

# Check frontend .env
if [ -d "frontend" ]; then
  if [ ! -f "frontend/.env.local" ] && [ ! -f "frontend/.env.production" ]; then
    echo "  ⚠️  Frontend .env files not found"
    echo "     Create frontend/.env.production with:"
    echo "     NEXT_PUBLIC_API_URL=https://your-backend-url.com"
  else
    echo "  ✓ Frontend environment files found"
  fi
fi

# Check backend .env
if [ -d "backend" ]; then
  if [ ! -f "backend/.env" ]; then
    echo "  ⚠️  Backend .env file not found"
    echo "     Create backend/.env with required variables (see DEPLOYMENT_PLAN.md)"
  else
    echo "  ✓ Backend environment file found"
  fi
fi

echo ""
echo "🗄️  Checking database setup..."

if [ -d "backend" ]; then
  cd backend
  if command -v npx &> /dev/null; then
    echo "  🔍 Checking Prisma setup..."
    if npx prisma validate &> /dev/null; then
      echo "  ✅ Prisma schema is valid"
    else
      echo "  ⚠️  Prisma schema validation failed"
    fi
  else
    echo "  ⚠️  npx not found, skipping Prisma check"
  fi
  cd ..
fi

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Review DEPLOYMENT_PLAN.md for detailed deployment instructions"
echo "   2. Review DEPLOYMENT_QUICKSTART.md for quick deployment guide"
echo "   3. Set up your production database"
echo "   4. Configure environment variables in your deployment platform"
echo "   5. Deploy backend first, then frontend"
echo ""

