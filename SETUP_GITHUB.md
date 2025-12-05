# Setup GitHub Remote

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `aquapure` (or your preferred name)
3. **Important:** Do NOT check "Add a README file", "Add .gitignore", or "Choose a license" (we already have these)
4. Click "Create repository"

## Step 2: Copy Your Repository URL

After creating the repository, GitHub will show you the URL. It will look like one of these:

**HTTPS:**
```
https://github.com/YOUR_USERNAME/aquapure.git
```

**SSH:**
```
git@github.com:YOUR_USERNAME/aquapure.git
```

## Step 3: Add Remote and Push

Replace `YOUR_USERNAME` with your actual GitHub username in the commands below:

### Option A: Using HTTPS

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/aquapure.git

# Verify
git remote -v

# Push to GitHub
git push -u origin main
```

### Option B: Using SSH (if you have SSH keys set up)

```bash
# Add remote
git remote add origin git@github.com:YOUR_USERNAME/aquapure.git

# Verify
git remote -v

# Push to GitHub
git push -u origin main
```

## Authentication

### For HTTPS:
- You'll be prompted for username and password
- Use a **Personal Access Token** as the password (not your GitHub password)
- Create token: GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
- Select `repo` scope

### For SSH:
- Make sure you have SSH keys set up with GitHub
- No password needed if keys are configured

## Example (Replace with YOUR username)

If your GitHub username is `nmatunog2`, the commands would be:

```bash
git remote add origin https://github.com/nmatunog2/aquapure.git
git push -u origin main
```

