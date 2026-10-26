#!/usr/bin/env bash
# Clone each repo, copy the staged README and assets over it, commit and push.
# usage: publish.sh <stage dir> <work dir> [repo ...]
# Uses whatever git credentials are already set up for the account.
set -euo pipefail
STAGE="$1"
WORK="$2"
shift 2
USER_NAME="sameermotwani17-cell"
REPOS=("$@")
if [ ${#REPOS[@]} -eq 0 ]; then
  REPOS=(millennium-hall-booking akamatsu-system sgm-group-of-companies too-easy miru-backend miru-frontend retro_github_agent mamba-point-hotel)
fi
mkdir -p "$WORK"
for r in "${REPOS[@]}"; do
  echo "== $r"
  rm -rf "$WORK/$r"
  git clone -q "https://github.com/$USER_NAME/$r.git" "$WORK/$r"
  cp -r "$STAGE/$r/." "$WORK/$r/"
  cd "$WORK/$r"
  git add -A
  if git diff --cached --quiet; then echo "no changes"; cd - >/dev/null; continue; fi
  git commit -q -m "README: animated banner, plain-English overview and a clearer structure

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
  git push -q origin HEAD 2>&1 | tail -2
  cd - >/dev/null
done
