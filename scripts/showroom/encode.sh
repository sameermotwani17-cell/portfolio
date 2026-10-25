#!/usr/bin/env bash
# Encode one showroom clip: web mp4 (longest side <= 1280, audio kept) plus a poster frame.
# usage: encode.sh <source file> <id> [max seconds]
# Output goes to public/creative/showroom/<id>.mp4 and <id>.webp
set -euo pipefail
SRC="$1"
ID="$2"
MAXS="${3:-45}"
OUT="$(cd "$(dirname "$0")/../.." && pwd)/public/creative/showroom"
TMP="$(mktemp -d)"
cp "$SRC" "$TMP/in.mp4" # plain ascii path, ffmpeg on Windows chokes on odd filenames
ffmpeg -loglevel error -y -t "$MAXS" -i "$TMP/in.mp4" \
  -vf "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))',fps=30" \
  -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p \
  -c:a aac -b:a 96k -ac 2 -movflags +faststart "$OUT/$ID.mp4"
ffmpeg -loglevel error -y -ss 1 -i "$OUT/$ID.mp4" -frames:v 1 -c:v libwebp -quality 75 "$OUT/$ID.webp"
echo "$ID $(stat -c %s "$OUT/$ID.mp4") $(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$OUT/$ID.mp4")"
rm -rf "$TMP"
