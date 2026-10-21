#!/usr/bin/env bash
# Post-process the generated footage into the shipped intro assets.
#
#   CLIPS="assets-src/intro/clip1.mp4 assets-src/intro/clip2.mp4" \
#   bash scripts/intro/build-intro.sh
#
# Steps
#   1. Concatenate the clips (default: straight cut; XFADE=1 adds a 4-frame
#      crossfade at each join if the seam jumps).
#   2. Encode public/intro/intro.mp4  (H.264, no audio, +faststart, <= 3 MB)
#      and  public/intro/intro.webm   (VP9, <= 2.5 MB).
#   3. Extract poster.jpg (first frame) and endframe.jpg (last frame), <= 120 KB.
#
# Env
#   CLIPS     space-separated input clips, in order (required)
#   XFADE     1 to crossfade joins (default 0)
#   FPS       output frame rate (default 30)
#   WIDTH     output width (default 1920; height follows 16:9)
#   TRIM_END  seconds to drop from the end of the final cut (default 0)
set -euo pipefail
cd "$(dirname "$0")/../.."

: "${CLIPS:?set CLIPS to the input clips, in order}"
XFADE="${XFADE:-0}"
FPS="${FPS:-30}"
WIDTH="${WIDTH:-1920}"
TRIM_END="${TRIM_END:-0}"
OUT=public/intro
WORK=assets-src/intro/.work
mkdir -p "$OUT" "$WORK"

read -r -a INPUTS <<<"$CLIPS"
N=${#INPUTS[@]}

# ── 1. concatenate ────────────────────────────────────────────────────────────
norm() { # normalise every clip to the same fps/size/pixfmt so the cut is clean
  local i=0
  for f in "${INPUTS[@]}"; do
    ffmpeg -v error -y -i "$f" \
      -vf "fps=${FPS},scale=${WIDTH}:-2:flags=lanczos,setsar=1,format=yuv420p" \
      -an -c:v libx264 -preset fast -crf 14 "$WORK/n$i.mp4"
    i=$((i + 1))
  done
}
norm

if [ "$N" -eq 1 ]; then
  cp "$WORK/n0.mp4" "$WORK/cut.mp4"
elif [ "$XFADE" = "1" ]; then
  # 4-frame crossfade at each join
  D=$(awk "BEGIN{print 4/${FPS}}")
  FILTER=""
  PREV="[0:v]"
  OFFSET=0
  for ((i = 1; i < N; i++)); do
    LEN=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$WORK/n$((i - 1)).mp4")
    OFFSET=$(awk "BEGIN{print ${OFFSET} + ${LEN} - ${D}}")
    OUTL="[v$i]"
    [ "$i" -eq $((N - 1)) ] && OUTL="[v]"
    FILTER="${FILTER}${PREV}[$i:v]xfade=transition=fade:duration=${D}:offset=${OFFSET}${OUTL};"
    PREV="[v$i]"
  done
  ARGS=()
  for ((i = 0; i < N; i++)); do ARGS+=(-i "$WORK/n$i.mp4"); done
  ffmpeg -v error -y "${ARGS[@]}" -filter_complex "${FILTER%;}" -map "[v]" \
    -c:v libx264 -preset fast -crf 14 "$WORK/cut.mp4"
else
  : >"$WORK/list.txt"
  for ((i = 0; i < N; i++)); do echo "file 'n$i.mp4'" >>"$WORK/list.txt"; done
  ffmpeg -v error -y -f concat -safe 0 -i "$WORK/list.txt" -c copy "$WORK/cut.mp4"
fi

if [ "$TRIM_END" != "0" ]; then
  LEN=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$WORK/cut.mp4")
  TO=$(awk "BEGIN{print ${LEN} - ${TRIM_END}}")
  ffmpeg -v error -y -i "$WORK/cut.mp4" -t "$TO" -c:v libx264 -preset fast -crf 14 "$WORK/cut2.mp4"
  mv "$WORK/cut2.mp4" "$WORK/cut.mp4"
fi

# ── 2. encode ─────────────────────────────────────────────────────────────────
ffmpeg -v error -y -i "$WORK/cut.mp4" \
  -c:v libx264 -profile:v high -level 4.1 -preset slow -crf 27 \
  -pix_fmt yuv420p -movflags +faststart -an "$OUT/intro.mp4"

ffmpeg -v error -y -i "$WORK/cut.mp4" \
  -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -deadline good -cpu-used 2 \
  -pix_fmt yuv420p -an "$OUT/intro.webm"

# ── 3. poster + endframe ──────────────────────────────────────────────────────
# The poster is the LCP element: keep it light (1280 wide is plenty for a
# frame that is on screen for a few hundred ms before the video takes over).
ffmpeg -v error -y -i "$WORK/cut.mp4" -frames:v 1 -vf "scale=1280:-2" -q:v 9 "$OUT/poster.jpg"
ffmpeg -v error -y -sseof -0.1 -i "$WORK/cut.mp4" -update 1 -frames:v 1 -q:v 5 "$OUT/endframe.jpg"

# ── report ────────────────────────────────────────────────────────────────────
echo "built:"
for f in intro.mp4 intro.webm poster.jpg endframe.jpg; do
  printf '  %-14s %8s KB\n' "$f" "$(du -k "$OUT/$f" | cut -f1)"
done
ffprobe -v error -show_entries format=duration:stream=width,height,r_frame_rate -of default=nw=1 "$OUT/intro.mp4"
