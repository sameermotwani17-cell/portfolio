# Section 03 back-view image

The split (`components/universe/`) ships with a synthetic placeholder in
`public/universe/`. Replace it with the generated photo:

1. Generate it in Higgsfield (settings and prompt below), desktop 16:9 and mobile 4:5.
2. Save the picks as `desktop.png` and `mobile.png` anywhere, then run:

   ```
   node scripts/universe/build-backview.mjs path/to/desktop.png path/to/mobile.png
   ```

   This writes `public/universe/backview-{desktop,mobile}.webp` (warm) and
   `backview-{desktop,mobile}-tech.webp` (graphite grade), sized to the 350 KB / 250 KB budgets.
3. Commit the four `.webp` files. Nothing else changes.

## Higgsfield settings

| | Desktop | Mobile |
|---|---|---|
| Model | `gpt_image_2_5` | `gpt_image_2_5` |
| Aspect | 16:9 | 4:5 |
| Quality / resolution | high / 4k | high / 4k |
| References | `IMG_0530.HEIC` (hair/identity) | same, plus the chosen desktop result |
| Variants | 2, pick one | 1 |

Preflight cost (get_cost) for 2 variants at 16:9, high, 4k was 4.25 credits.
Use the moody back-view reference photo for composition and light only, never
for text or branding.

## Prompt

```
A cinematic 35mm film photograph of a young man seen from directly behind, sitting at a home studio desk, both hands raised adjusting large black over-ear studio headphones on his head. Thick, dark, voluminous curly hair exactly matching the hair in the identity reference photograph: same volume, curl pattern, colour and length, tight curls visible above the headband. A plain dark charcoal t-shirt with relaxed shoulders. In front of him, a large multi-pane window with white wooden mullions, bright late-afternoon sunlight pouring through blurred green foliage, volumetric light rays and floating dust motes cutting diagonally across the room. On the desk: an open laptop, a small studio lamp on a stand, a condenser microphone on a boom arm, a few cables. Symmetrical composition with his head and shoulders centred so a vertical line down the middle splits his head in half, deep shadows and soft vignetting at the frame edges, warm-green film tone, soft halation around the window highlights, fine film grain, shallow depth of field, shot on 35mm. No visible face, no text, no logos, no watermark.
```

Mobile (4:5): same scene, tighter crop, silhouette centred.
