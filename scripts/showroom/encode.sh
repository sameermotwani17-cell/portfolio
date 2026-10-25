#!/usr/bin/env bash
# Encode one showroom clip: web mp4 (longest side <= 1280, audio kept) plus a poster frame.
# usage: [LONG=1280] [CRF=28] [ABR=96k] encode.sh <source file> <id> [max seconds]
# Output goes to public/creative/showroom/<id>.mp4 and <id>.webp
set -euo pipefail
SRC="$1"
ID="$2"
MAXS="${3:-45}"
LONG="${LONG:-1280}"
CRF="${CRF:-28}"
ABR="${ABR:-96k}"
OUT="$(cd "$(dirname "$0")/../.." && pwd)/public/creative/showroom"
TMP="$(mktemp -d)"
cp "$SRC" "$TMP/in.mp4" # plain ascii path, ffmpeg on Windows chokes on odd filenames
ffmpeg -loglevel error -y -t "$MAXS" -i "$TMP/in.mp4" \
  -vf "scale='if(gt(iw,ih),min($LONG,iw),-2)':'if(gt(iw,ih),-2,min($LONG,ih))',fps=30" \
  -c:v libx264 -crf "$CRF" -preset slow -pix_fmt yuv420p \
  -c:a aac -b:a "$ABR" -ac 2 -movflags +faststart "$OUT/$ID.mp4"
ffmpeg -loglevel error -y -ss 1 -i "$OUT/$ID.mp4" -frames:v 1 -c:v libwebp -quality 75 "$OUT/$ID.webp"
echo "$ID $(stat -c %s "$OUT/$ID.mp4") $(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$OUT/$ID.mp4")"
rm -rf "$TMP"
