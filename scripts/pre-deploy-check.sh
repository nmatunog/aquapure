#!/bin/bash
# Pre-deployment Git check script
# Ensures all changes are committed and pushed to GitHub before deployment

set -e

echo "🔍 Checking Git status before deployment..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "❌ Error: Not a git repository"
  exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "❌ Error: You have uncommitted changes"
  echo "Please commit or stash your changes before deploying"
  git status --short
  exit 1
fi

# Check for untracked files
if [ -n "$(git ls-files --others --exclude-standard)" ]; then
  echo "⚠️  Warning: You have untracked files"
  echo "Consider adding them to .gitignore or committing them"
  git ls-files --others --exclude-standard
  read -p "Continue anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Check if we're on the main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "⚠️  Warning: You're not on the main branch (currently on: $CURRENT_BRANCH)"
  read -p "Continue anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
  echo "❌ Error: No remote 'origin' configured"
  exit 1
fi

# Fetch latest from remote
echo "📥 Fetching latest from GitHub..."
git fetch origin

# Check if local branch is behind remote
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "")

if [ -z "$REMOTE" ]; then
  echo "⚠️  Warning: No upstream branch set. Run: git push -u origin $CURRENT_BRANCH"
else
  if [ "$LOCAL" != "$REMOTE" ]; then
    BASE=$(git merge-base @ @{u})
    if [ "$LOCAL" = "$BASE" ]; then
      echo "❌ Error: Your branch is behind origin/$CURRENT_BRANCH"
      echo "Please pull the latest changes: git pull origin $CURRENT_BRANCH"
      exit 1
    elif [ "$REMOTE" = "$BASE" ]; then
      echo "⚠️  Warning: Your branch is ahead of origin/$CURRENT_BRANCH"
      echo "Pushing local commits to GitHub..."
      git push origin "$CURRENT_BRANCH"
    else
      echo "❌ Error: Your branch has diverged from origin/$CURRENT_BRANCH"
      echo "Please sync your branch before deploying"
      exit 1
    fi
  fi
fi

# Check if there are unpushed commits
if [ -n "$(git log @{u}..@ 2>/dev/null)" ]; then
  echo "📤 Pushing unpushed commits to GitHub..."
  git push origin "$CURRENT_BRANCH"
fi

echo "✅ Git status check passed! Ready for deployment."
echo "📍 Current commit: $(git rev-parse --short HEAD)"
echo "📍 Branch: $CURRENT_BRANCH"

