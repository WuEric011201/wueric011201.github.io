#!/usr/bin/env bash
#
# Publish the site.
#
#   bin/publish.sh "short description of the change"
#   bin/publish.sh                  # opens $EDITOR for the commit message
#
# Does the three things that are easy to forget, then commits and pushes:
#   1. throws away local Gemfile.lock churn, which breaks CI
#   2. refreshes the content/ editing symlinks
#   3. formats everything with the Prettier version this repo pins,
#      because the "Prettier code formatter" check fails the build otherwise
#
set -euo pipefail

cd "$(dirname "$0")/.."
say() { printf '\033[1;34m==>\033[0m %s\n' "$*"; }
die() { printf '\033[1;31mstopped:\033[0m %s\n' "$*" >&2; exit 1; }

[ -d .git ] || die "not a git repository"

branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" != "main" ]; then
  printf 'You are on "%s", not main. Push anyway? [y/N] ' "$branch"
  read -r reply </dev/tty
  [ "$reply" = "y" ] || [ "$reply" = "Y" ] || die "nothing pushed"
fi

# 1. Gemfile.lock -------------------------------------------------------------
if ! git diff --quiet -- Gemfile.lock; then
  say "discarding local Gemfile.lock changes (macOS-only entries CI does not want)"
  git checkout -- Gemfile.lock
fi

# 2. content/ symlinks --------------------------------------------------------
if [ -f bin/relink-content.py ]; then
  say "refreshing content/ editing links"
  python3 bin/relink-content.py
fi

# 3. Prettier -----------------------------------------------------------------
if [ ! -x node_modules/.bin/prettier ]; then
  say "installing the pinned Prettier (npm ci)"
  npm ci --silent
fi
say "formatting with Prettier $(node_modules/.bin/prettier --version)"
node_modules/.bin/prettier . --write --log-level warn
node_modules/.bin/prettier . --check >/dev/null \
  || die "Prettier still reports problems -- fix them before pushing"

# Commit ----------------------------------------------------------------------
git add -A
if git diff --cached --quiet; then
  say "no changes to publish"
  exit 0
fi

say "publishing:"
git diff --cached --stat | tail -n 20

if [ $# -gt 0 ]; then
  git commit -q -m "$*"
else
  git commit -q
fi

git push
say "pushed. Watch the build:"
echo "    https://github.com/WuEric011201/wueric011201.github.io/actions"
echo "    live in a minute or two: https://wueric011201.github.io/"
