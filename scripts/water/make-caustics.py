"""
Renders a seamless, tiling water-caustics loop (256 x 256, 48 frames) as an
animated WebP. Used as a soft-light overlay on the album covers.
Run:  python scripts/water/make-caustics.py   (needs numpy and ffmpeg)
"""
import os
import numpy as np

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(ROOT, 'public', 'creative', 'water')
os.makedirs(OUT, exist_ok=True)

N, S, ITER, INTEN = 48, 256, 5, 0.005
TAU = 2 * np.pi
# integer multiples of the loop so frame N lands exactly on frame 0
MULT = [1, -1, 2, -2, 3]

ys, xs = np.mgrid[0:S, 0:S].astype(np.float64)
px0 = np.mod((xs / S) * TAU * 2.0, TAU) - 250.0
py0 = np.mod((ys / S) * TAU * 2.0, TAU) - 250.0


def frame(f):
    t = (f / N) * TAU
    px, py = px0.copy(), py0.copy()
    ix, iy = px.copy(), py.copy()
    c = 1.0
    for n in range(ITER):
        tn = t * MULT[n]
        ix, iy = px + (np.cos(tn - ix) + np.sin(tn + iy)), py + (np.sin(tn - iy) + np.cos(tn + ix))
        a = px / (np.sin(ix + tn) / INTEN + 1e-6)
        b = py / (np.cos(iy + tn) / INTEN + 1e-6)
        c += 1.0 / np.sqrt(a * a + b * b + 1e-9)
    c /= ITER
    c = 1.17 - np.power(np.abs(c), 1.4)
    v = np.power(np.abs(c), 8.0)
    return v


frames = [frame(f) for f in range(N)]
m = max(float(fr.max()) for fr in frames)
from PIL import Image

imgs = []
for fr in frames:
    g = np.clip((fr / m) * 1.6, 0, 1) ** 0.8
    # blue-white light on black
    rgb = np.stack([g * 0.75, g * 0.92, g * 1.0], axis=-1)
    imgs.append(Image.fromarray((rgb * 255).astype(np.uint8)))

dst = os.path.join(OUT, 'caustics.webp')
imgs[0].save(dst, save_all=True, append_images=imgs[1:], duration=50, loop=0, quality=70, method=4)
print('max', m)
print('caustics.webp', os.path.getsize(dst) // 1024, 'KB')
