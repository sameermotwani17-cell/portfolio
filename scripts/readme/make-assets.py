"""
Builds the animated README art into /docs:
  banner.svg   spinning record, shimmering title, typed subtitle
  marquee.svg  the album covers scrolling past (inlined, GitHub blocks external images in SVG)
  divider.svg  a gradient line that travels
Run:  python scripts/readme/make-assets.py   (needs ffmpeg on PATH)
"""
import base64, os, subprocess, tempfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DOCS = os.path.join(ROOT, 'docs')
os.makedirs(DOCS, exist_ok=True)

# ── banner ────────────────────────────────────────────────────────────────
rings = ''.join(
    f'<circle r="{r}" fill="none" stroke="rgba(255,255,255,{0.05 + (i % 3) * 0.03})" stroke-width="1.2"/>'
    for i, r in enumerate(range(48, 176, 7))
)
banner = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 400" width="1280" height="400" role="img" aria-label="Sameer Motwani, RETRO. Engineer, creative director, builder.">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#07070b"/><stop offset="1" stop-color="#190a26"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.35" stop-color="#ffffff"/>
      <stop offset="0.5" stop-color="#ff7a3d"/>
      <stop offset="0.65" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#ffffff"/>
      <animateTransform attributeName="gradientTransform" type="translate" from="-1.2 0" to="1.2 0" dur="4.5s" repeatCount="indefinite"/>
    </linearGradient>
    <radialGradient id="glowA"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".55"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></radialGradient>
    <radialGradient id="glowB"><stop offset="0" stop-color="#6a4bff" stop-opacity=".5"/><stop offset="1" stop-color="#6a4bff" stop-opacity="0"/></radialGradient>
    <clipPath id="typed"><rect x="80" y="238" width="0" height="40">
      <animate attributeName="width" values="0;640;640;0;0" keyTimes="0;.45;.8;.92;1" dur="9s" repeatCount="indefinite"/>
    </rect></clipPath>
  </defs>
  <rect width="1280" height="400" fill="url(#bg)"/>
  <circle r="260" fill="url(#glowA)"><animate attributeName="cx" values="1000;1100;1000" dur="9s" repeatCount="indefinite"/><animate attributeName="cy" values="120;260;120" dur="9s" repeatCount="indefinite"/></circle>
  <circle r="240" fill="url(#glowB)"><animate attributeName="cx" values="240;120;240" dur="11s" repeatCount="indefinite"/><animate attributeName="cy" values="360;300;360" dur="11s" repeatCount="indefinite"/></circle>

  <g transform="translate(1030 200)">
    <g>
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite"/>
      <circle r="178" fill="#0b0b0f" stroke="rgba(255,255,255,.12)"/>
      {rings}
      <circle r="44" fill="#ff5a1f"/>
      <circle r="44" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="3"/>
      <circle cx="0" cy="-26" r="5" fill="#fff" opacity=".9"/>
      <circle r="5" fill="#0b0b0f"/>
    </g>
  </g>

  <g font-family="'Segoe UI',Helvetica,Arial,sans-serif">
    <circle cx="86" cy="92" r="7" fill="#ff2d2d"><animate attributeName="opacity" values="1;.15;1" dur="1.2s" repeatCount="indefinite"/></circle>
    <text x="104" y="97" font-family="'Courier New',monospace" font-size="15" letter-spacing="3" fill="rgba(255,255,255,.7)">REC  00:03:42  ·  182°C  ·  12 g</text>
    <text x="78" y="196" font-size="86" font-weight="800" letter-spacing="-2" fill="url(#shine)">SAMEER MOTWANI</text>
    <g clip-path="url(#typed)">
      <text x="80" y="268" font-family="'Courier New',monospace" font-size="26" letter-spacing="4" fill="#ffb08a">ENGINEER · CREATIVE DIRECTOR · BUILDER</text>
    </g>
    <text x="80" y="330" font-size="17" fill="rgba(255,255,255,.55)" letter-spacing="1">Finance student at APU, Japan.  I build AI products, ship client work and release music as RETRO.</text>
  </g>
  <rect x="0" y="394" width="1280" height="6" fill="#ff5a1f" opacity=".85">
    <animate attributeName="width" values="0;1280;1280;0" keyTimes="0;.5;.9;1" dur="6s" repeatCount="indefinite"/>
  </rect>
</svg>
'''
open(os.path.join(DOCS, 'banner.svg'), 'w', encoding='utf-8').write(banner)

# ── marquee of cover art ─────────────────────────────────────────────────
covers = [
    'public/creative/covers/dk2r.webp', 'public/creative/covers/retro-studios.webp', 'public/creative/covers/ajiwow.webp',
    'public/creative/covers/too-easy.webp', 'public/creative/covers/plastivore.webp', 'public/creative/covers/afro-week.webp',
    'public/creative/covers/danflix.webp', 'public/creative/covers/first-light.webp',
    'public/creative/covers/content-instagram.webp', 'public/creative/covers/content-tiktok.webp', 'public/creative/covers/streams.webp',
    'public/creative/music/best-friend.webp', 'public/creative/music/desire.webp', 'public/creative/music/easy-come-easy-go.webp',
    'public/creative/music/suavemente.webp', 'public/creative/music/fairy-tales.webp', 'public/creative/music/drop-top.webp',
    'public/creative/music/deux-mille-vingt-six.webp',
]
SIZE, GAP = 200, 18
tiles = []
tmp = tempfile.mkdtemp()
for i, rel in enumerate(covers):
    out = os.path.join(tmp, f'{i}.jpg')
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', os.path.join(ROOT, rel), '-vf', f'scale={SIZE}:{SIZE}', '-q:v', '6', out], check=True)
    tiles.append(base64.b64encode(open(out, 'rb').read()).decode())
span = len(covers) * (SIZE + GAP)


def row(offset):
    return ''.join(
        f'<g transform="translate({offset + i * (SIZE + GAP)} 10)"><image width="{SIZE}" height="{SIZE}" clip-path="url(#r)" href="data:image/jpeg;base64,{b}"/></g>'
        for i, b in enumerate(tiles)
    )


marquee = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 220" width="1280" height="220" role="img" aria-label="Album cover art for every project">
  <defs>
    <clipPath id="r"><rect width="{SIZE}" height="{SIZE}" rx="14"/></clipPath>
    <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#0d1117"/><stop offset=".08" stop-color="#0d1117" stop-opacity="0"/><stop offset=".92" stop-color="#0d1117" stop-opacity="0"/><stop offset="1" stop-color="#0d1117"/></linearGradient>
  </defs>
  <rect width="1280" height="220" fill="#0d1117"/>
  <g>
    <animateTransform attributeName="transform" type="translate" from="0 0" to="-{span} 0" dur="{len(covers) * 3}s" repeatCount="indefinite"/>
    {row(0)}
    {row(span)}
  </g>
  <rect width="1280" height="220" fill="url(#fade)"/>
</svg>
'''
open(os.path.join(DOCS, 'marquee.svg'), 'w', encoding='utf-8').write(marquee)

# ── divider ──────────────────────────────────────────────────────────────
divider = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 8" width="1280" height="8" role="presentation">
  <defs><linearGradient id="g" x1="0" x2="1" gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#ff5a1f" stop-opacity="0"/><stop offset=".5" stop-color="#ff5a1f"/><stop offset="1" stop-color="#6a4bff" stop-opacity="0"/>
    <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="3.2s" repeatCount="indefinite"/>
  </linearGradient></defs>
  <rect y="3" width="1280" height="2" rx="1" fill="rgba(255,255,255,.08)"/>
  <rect y="2" width="1280" height="4" rx="2" fill="url(#g)"/>
</svg>
'''
open(os.path.join(DOCS, 'divider.svg'), 'w', encoding='utf-8').write(divider)
print('banner', os.path.getsize(os.path.join(DOCS, 'banner.svg')) // 1024, 'KB; marquee', os.path.getsize(os.path.join(DOCS, 'marquee.svg')) // 1024, 'KB')
