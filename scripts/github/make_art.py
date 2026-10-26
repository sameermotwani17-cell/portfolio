"""
Black and white art for the GitHub profile, made from the studio shoot.
  python scripts/github/make_art.py <folder with DSC*.png exports> <out dir>
Writes banner.svg (animated, the photo embedded), avatar.png (ink portrait),
portrait.jpg (the intro photo) and the link buttons.
"""
import base64, io, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

SRC = sys.argv[1]
OUT = sys.argv[2]
os.makedirs(OUT, exist_ok=True)
FONT = r'C:\Windows\Fonts\impact.ttf'
MONO = r'C:\Windows\Fonts\cour.ttf'


def load(n):
    return Image.open(os.path.join(SRC, f'DSC0{n}.png')).convert('RGB')


def curve(g, lo=0.04, hi=0.92, gamma=0.8):
    a = np.asarray(g, dtype=np.float32) / 255.0
    a = np.clip((a - lo) / (hi - lo), 0, 1) ** gamma
    return Image.fromarray((a * 255).astype(np.uint8))


# ───────────── banner ─────────────
W, H = 1600, 500
img = Image.new('L', (W, H), 0)

p = load('8906')
w, h = p.size
ph = int(w * 500 / 556)  # full-height band so the whole head and hand show
crop = p.crop((0, int(h * 0.03), w, int(h * 0.03) + ph))
crop = crop.resize((556, 500), Image.LANCZOS).convert('L')
crop = curve(ImageOps.autocontrast(crop, cutoff=0.5), 0.03, 0.85, 0.72)
mask = Image.new('L', (556, 500), 255)
md = ImageDraw.Draw(mask)
for x in range(200):  # fade into black on the left
    md.line([(x, 0), (x, 500)], fill=int(255 * (x / 200) ** 1.5))
for x in range(556 - 90, 556):  # and a little on the right
    md.line([(x, 0), (x, 500)], fill=int(255 * ((555 - x) / 90) ** 1.2))
img.paste(crop, (W - 700, 0), mask)

d = ImageDraw.Draw(img)
big = ImageFont.truetype(FONT, 250)
mid = ImageFont.truetype(FONT, 118)
mono = ImageFont.truetype(MONO, 30)
small = ImageFont.truetype(MONO, 22)
d.text((70, 52), 'SAMEER', font=mid, fill=0, stroke_width=2, stroke_fill=255)
d.text((64, 150), 'MOTWANI', font=big, fill=255)
d.text((74, 412), 'SOFTWARE ENGINEER  /  CREATIVE DIRECTOR  /  MODEL', font=mono, fill=215)
d.text((74, 456), 'BEPPU, JAPAN  -  LOCKED IN', font=small, fill=140)
# crop marks
for (x, y, sx, sy) in [(24, 24, 1, 1), (W - 24, 24, -1, 1), (24, H - 24, 1, -1), (W - 24, H - 24, -1, -1)]:
    d.line([(x, y), (x + 34 * sx, y)], fill=170, width=2)
    d.line([(x, y), (x, y + 34 * sy)], fill=170, width=2)

# film grain baked in
rng = np.random.default_rng(7)
a = np.asarray(img, dtype=np.float32)
a = np.clip(a + rng.normal(0, 7, a.shape), 0, 255)
img = Image.fromarray(a.astype(np.uint8))
buf = io.BytesIO()
img.save(buf, 'JPEG', quality=86, optimize=True)
b64 = base64.b64encode(buf.getvalue()).decode()

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Sameer Motwani, software engineer, creative director, model">
  <defs>
    <linearGradient id="sw" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"><animate attributeName="seed" values="1;5;9;3;7" dur="0.5s" repeatCount="indefinite" calcMode="discrete"/></feTurbulence><feColorMatrix type="saturate" values="0"/></filter>
  </defs>
  <image width="{W}" height="{H}" href="data:image/jpeg;base64,{b64}" xlink:href="data:image/jpeg;base64,{b64}"/>
  <rect width="{W}" height="{H}" filter="url(#gr)" opacity=".10" style="mix-blend-mode:overlay"/>
  <rect y="0" width="260" height="{H}" fill="url(#sw)"><animate attributeName="x" values="-300;{W};{W}" keyTimes="0;.55;1" dur="6s" repeatCount="indefinite"/></rect>
  <circle cx="{W - 86}" cy="62" r="7" fill="#fff"><animate attributeName="opacity" values="1;.1;1" dur="1.2s" repeatCount="indefinite"/></circle>
  <text x="{W - 70}" y="68" font-family="'Courier New',monospace" font-size="16" letter-spacing="3" fill="#fff" opacity=".8">REC</text>
  <rect x="0" y="{H - 5}" width="{W}" height="5" fill="#fff" opacity=".9"><animate attributeName="width" values="0;{W};{W};0" keyTimes="0;.5;.9;1" dur="6s" repeatCount="indefinite"/></rect>
</svg>
'''
open(os.path.join(OUT, 'banner.svg'), 'w', encoding='utf-8', newline='\n').write(svg)

# ───────────── intro portrait ─────────────
q = load('9054')
w, h = q.size
q = q.crop((0, int(h * 0.06), w, int(h * 0.06) + int(w * 1.25))).resize((560, 700), Image.LANCZOS).convert('L')
q = curve(ImageOps.autocontrast(q, cutoff=0.5), 0.03, 0.97, 0.9)
q.save(os.path.join(OUT, 'portrait.jpg'), quality=88)

# ───────────── ink avatar ─────────────
f = load('8898')
w, h = f.size
cx, cy, s = int(w * 0.51) - 300, int(h * 0.355), 3000
f = f.crop((cx - s // 2, cy - s // 2, cx + s // 2, cy + s // 2)).resize((1024, 1024), Image.LANCZOS).convert('L')
f = curve(ImageOps.autocontrast(f, cutoff=0.3), 0.02, 0.80, 0.62)
f = f.filter(ImageFilter.GaussianBlur(3.0))
arr = np.asarray(f, dtype=np.float32) / 255.0
yy, xx = np.mgrid[0:1024, 0:1024] / 1024.0
rr = np.sqrt((xx - 0.5) ** 2 + (yy - 0.52) ** 2)
arr = (arr ** 0.62) * np.clip(1 - (rr - 0.34) / 0.12, 0, 1)
ink = np.zeros_like(arr)
ink[arr > 0.20] = 0.30
ink[arr > 0.36] = 0.62
ink[arr > 0.60] = 1.0
out = ink * 255
av = Image.fromarray(out.astype(np.uint8))
av.save(os.path.join(OUT, 'avatar-noir.png'))

# the white outfit, drawn as ink on white
f = load('9057')
w, h = f.size
cx, cy, side = int(w * 0.46), int(h * 0.325), 1950
f = f.crop((cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)).resize((1024, 1024), Image.LANCZOS).convert('L')
f = ImageOps.autocontrast(f, cutoff=0.3).filter(ImageFilter.GaussianBlur(2.4))
arr = np.asarray(f, dtype=np.float32) / 255.0
yy, xx = np.mgrid[0:1024, 0:1024] / 1024.0
rr = np.sqrt((xx - 0.5) ** 2 + (yy - 0.5) ** 2)
ink = np.ones_like(arr)
ink[arr < 0.80] = 0.82
ink[arr < 0.62] = 0.56
ink[arr < 0.42] = 0.26
ink[arr < 0.22] = 0.0
ink = np.where(rr > 0.47, 1.0, ink)  # clean white corners
Image.fromarray((ink * 255).astype(np.uint8)).save(os.path.join(OUT, 'avatar.png'))
print('ok', os.path.getsize(os.path.join(OUT, 'banner.svg')) // 1024, 'KB banner')
