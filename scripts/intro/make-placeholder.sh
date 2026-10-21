#!/usr/bin/env bash
# Generates a dark 16:9 test clip that stands in for the Higgsfield footage so
# the build runs end to end before the real clips exist. The beats are
# roughly visible: a lit "keyboard" that goes dark at TYPING_END, and a short
# flash on the "Enter key" at ENTER_PRESS.
#
#   bash scripts/intro/make-placeholder.sh
#
# Outputs assets-src/intro/placeholder.mp4, then runs build-intro.sh on it.
set -euo pipefail
cd "$(dirname "$0")/../.."
mkdir -p assets-src/intro

DUR=6
ffmpeg -v error -y \
  -f lavfi -i "color=c=0x0b0806:s=1920x1080:d=${DUR}:r=30" \
  -vf "\
drawbox=x=0:y=0:w=1920:h=40:color=0xd8b890@0.9:t=fill,\
drawbox=x=0:y=40:w=1920:h=90:color=0x6a4a28@0.35:t=fill,\
drawbox=x=330:y=360:w=1260:h=470:color=0x16130f:t=fill,\
drawgrid=x=330:y=360:w=84:h=78:color=0x2a2420@0.9:t=3,\
drawbox=x=330:y=360:w=1260:h=470:color=0x7a6246@0.45:t=fill:enable='lt(t,1.5)',\
drawbox=x=330:y=360:w=1260:h=470:color=0x7a6246@0.22:t=fill:enable='between(t,1.5,2.1)',\
drawbox=x=1510:y=572:w=100:h=56:color=0xffc48c@0.75:t=fill:enable='between(t,3.4,3.75)',\
noise=alls=6:allf=t,\
format=yuv420p" \
  -c:v libx264 -preset slow -crf 24 -an assets-src/intro/placeholder.mp4

CLIPS="assets-src/intro/placeholder.mp4" bash scripts/intro/build-intro.sh
