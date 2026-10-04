#!/bin/bash
# Run this once after installing Xcode CLT: xcode-select --install
# Usage: bash setup.sh YOUR_GITHUB_PAT
# Get a PAT at https://github.com/settings/tokens (needs repo + workflow scopes)

set -e

GITHUB_USER="RawwnBuilds"
REPO_NAME="ujjwalsrivastava"
GITHUB_PAT="${1:-}"

if [ -z "$GITHUB_PAT" ]; then
  echo "Usage: bash setup.sh YOUR_GITHUB_PAT"
  echo "Create a PAT at: https://github.com/settings/tokens?scopes=repo,workflow"
  exit 1
fi

cd "$(dirname "$0")"

echo "==> Initializing git..."
git init
git checkout -b main

echo "==> Staging files..."
git add .
git commit -m "Initial Hugo blog setup with PaperMod + Tina CMS"

echo "==> Creating GitHub repo and pushing..."
curl -s -X POST \
  -H "Authorization: token $GITHUB_PAT" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"description\":\"Personal blog\",\"private\":false,\"auto_init\":false}" \
  | grep -E '"full_name"|"html_url"'

git remote add origin "https://$GITHUB_PAT@github.com/$GITHUB_USER/$REPO_NAME.git"
git push -u origin main

echo ""
echo "✅ Done! Your code is live at: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo "==> NEXT STEPS:"
echo "1. Go to https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
echo "   → Source: GitHub Actions → Save"
echo ""
echo "2. Sign up at https://tina.io (free)"
echo "   → New project → Connect to GitHub → select $REPO_NAME"
echo "   → Copy your Client ID and Token"
echo ""
echo "3. Add secrets at https://github.com/$GITHUB_USER/$REPO_NAME/settings/secrets/actions"
echo "   → TINA_CLIENT_ID = (your client ID)"
echo "   → TINA_TOKEN = (your token)"
echo ""
echo "4. Re-run the workflow: https://github.com/$GITHUB_USER/$REPO_NAME/actions"
echo "   → Your blog goes live at: https://$GITHUB_USER.github.io/$REPO_NAME/"
echo "   → Your CMS dashboard: https://$GITHUB_USER.github.io/$REPO_NAME/admin"
