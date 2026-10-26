"""
The TikTok album art, drawn from the real TikTok mark (no AI imagery): the note
glyph with its cyan and red split on black, the handle underneath.
  python scripts/creative/tiktok-cover.py
Needs Chrome (headless screenshot), Pillow and ffmpeg.
"""
import os, subprocess, tempfile
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
PATH = ('M16.6 3c.4 2.2 1.8 3.7 4 3.9v3.1c-1.5.1-2.8-.4-4-1.1v6.2c0 3.6-2.8 5.9-5.8 5.9A5.8 5.8 0 0 1 5 15.2'
        'c0-3.6 3.1-6.2 6.7-5.6v3.2c-1.6-.4-3.4.6-3.4 2.4 0 1.5 1.2 2.6 2.6 2.6 1.6 0 2.6-1 2.6-2.9V3h3.1z')

html = f'''<html><body style="margin:0;width:1600px;height:1600px;background:#000;position:relative;overflow:hidden;font-family:'Segoe UI',Arial,sans-serif">
<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 44%,#14161a 0,#000 62%)"></div>
<div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.035) 0 2px,transparent 2px 6px)"></div>
<svg viewBox="0 0 24 24" style="position:absolute;left:300px;top:200px;width:1000px;height:1000px;overflow:visible">
  <path d="{PATH}" fill="#25f4ee" transform="translate(-0.55 -0.35)"/>
  <path d="{PATH}" fill="#fe2c55" transform="translate(0.55 0.35)"/>
  <path d="{PATH}" fill="#fff"/>
</svg>
<div style="position:absolute;left:0;right:0;top:1230px;text-align:center;color:#fff;font:700 76px 'Courier New',monospace;letter-spacing:6px">@we_love_you_retro</div>
<div style="position:absolute;left:0;right:0;top:1340px;text-align:center;color:#8a8f98;font:400 38px 'Courier New',monospace;letter-spacing:10px">VIRAL CLIPS · STORY · JAPAN</div>
</body></html>'''

tmp = tempfile.mkdtemp()
hp = os.path.join(tmp, 'c.html')
png = os.path.join(tmp, 'c.png')
open(hp, 'w', encoding='utf-8').write(html)
subprocess.run([CHROME, '--headless=new', '--disable-gpu', f'--screenshot={png}', '--window-size=1600,1600', '--hide-scrollbars',
                '--force-device-scale-factor=1', 'file:///' + hp.replace('\\', '/')], check=True, capture_output=True)
im = Image.open(png).convert('RGB').crop((0, 0, 1600, 1600))
cover = os.path.join(ROOT, 'public', 'creative', 'covers', 'content-tiktok.webp')
im.save(cover, 'WEBP', quality=88, method=5)

dst = os.path.join(ROOT, 'public', 'creative', 'works', 'sleeve-content-tiktok.webp')
fc = (
    "[0:v]split=3[bg][fg][vn];"
    "[bg]scale=1600:1600,crop=1600:1000,boxblur=40:6,eq=brightness=-0.42:saturation=1.2[b];"
    "[vn]scale=760:760,format=rgba,geq=r='20+10*sin(hypot(X-380,Y-380)*0.9)':g='20+10*sin(hypot(X-380,Y-380)*0.9)':b='22+10*sin(hypot(X-380,Y-380)*0.9)':a='if(lt(hypot(X-380,Y-380),378),255,0)'[v];"
    "[fg]scale=800:800[c];"
    "[b][v]overlay=770:120[t1];"
    "[t1][c]overlay=300:100[out]"
)
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', cover, '-filter_complex', fc, '-map', '[out]', '-frames:v', '1',
                '-c:v', 'libwebp', '-quality', '82', dst], check=True)
print('ok', os.path.getsize(cover) // 1024, 'KB cover')
