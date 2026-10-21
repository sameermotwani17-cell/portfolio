# Intro assets

One landscape (16:9) video for every device. No separate mobile render: on
phones the stage is fitted (not cropped) and the same footage, blurred, fills
the space above and below it.

| File | Spec |
|---|---|
| `intro.mp4` | 1920×1080, H.264 high, no audio, `+faststart`, ≤ 3 MB |
| `intro.webm` | VP9, ≤ 2.5 MB (served first; Safari falls back to the mp4) |
| `poster.jpg` | First frame, ≤ 120 KB. Preloaded; the LCP element |
| `endframe.jpg` | Last frame, ≤ 120 KB. Used to measure the overlay anchors |

## Rebuilding from new footage

```bash
CLIPS="assets-src/intro/clip1.mp4 assets-src/intro/clip2.mp4" bash scripts/intro/build-intro.sh
# XFADE=1 adds a 4-frame crossfade at the join if the cut jumps
```

`assets-src/intro/` is gitignored: the raw Higgsfield clips live there.

## Placeholder

Until the footage exists, `bash scripts/intro/make-placeholder.sh` generates a
dark test clip with the beats roughly visible and runs the build on it.

## After swapping footage

1. Scrub `intro.mp4` frame by frame and set `ENTER_PRESS` (and the other cues)
   in `lib/intro/cues.ts`.
2. Measure the home-row centre and the Enter-key centre on `endframe.jpg`, as
   percentages of the frame, and set `WORDMARK` / `ENTER_KEY` in
   `lib/intro/anchors.ts`.
