#!/bin/bash
# Migration script for Render deployment
# This runs migrations before the app starts

set -e

echo "🔄 Running database migrations..."

# Ensure we're in the backend directory
cd "$(dirname "$0")/.." || exit 1

# Run migrations
npx prisma migrate deploy

echo "✅ Database migrations completed"

