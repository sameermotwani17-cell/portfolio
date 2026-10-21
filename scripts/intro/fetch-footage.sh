#!/usr/bin/env bash
# Downloads the generated Higgsfield clips (and the keyframes they were built
# from) into assets-src/intro/, then runs the intro build with the trim
# points the cues in lib/intro/cues.ts were timed against.
#
#   bash scripts/intro/fetch-footage.sh
#
# Needs network access to d8j0ntlcm91z4.cloudfront.net.
set -euo pipefail
cd "$(dirname "$0")/../.."
mkdir -p assets-src/intro
B="https://d8j0ntlcm91z4.cloudfront.net/user_38Q4h7vnwh9Dhc7ZIwHLZdT7Jtt"
curl -fL -o assets-src/intro/clip1.mp4 "$B/hf_20261021_023821_6741a820-9cc5-4904-b11c-366667d2ca30.mp4"
curl -fL -o assets-src/intro/clip2.mp4 "$B/hf_20261021_023834_41444cf9-236e-4819-b879-19f43f02606b.mp4"
curl -fL -o assets-src/intro/k1.png "$B/hf_20261021_023111_30cf949b-45e1-4750-b6ed-ef96d1bf7ed6.png"
curl -fL -o assets-src/intro/k2.png "$B/hf_20261021_023611_4079af33-c74b-4ebe-91e3-215432f1e308.png"
curl -fL -o assets-src/intro/k3.png "$B/hf_20261021_023648_9230cbd2-17c8-4b4e-bfd7-420d8172e898.png"

# clip 1 from 1.2s (typing already underway), clip 2 from 0.6s (just before
# the hand enters). Both clips start/end on the same K2 frame, so the join
# is a straight cut.
CLIPS="assets-src/intro/clip1.mp4 assets-src/intro/clip2.mp4" \
TRIMS="1.2:- 0.6:-" \
bash scripts/intro/build-intro.sh
