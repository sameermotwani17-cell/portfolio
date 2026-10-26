"""
SVG builders for the GitHub makeover: animated banners, a skills marquee, an
activity board and a divider. Pure SMIL, no scripts, no external fonts or
images, so they render inside a GitHub README <img>.
"""
from xml.sax.saxutils import escape

BG = '#07080c'
FONT = "'Segoe UI',Helvetica,Arial,sans-serif"
MONO = "'Courier New',ui-monospace,monospace"


def _rings(r0=34, r1=122, step=6):
    return ''.join(
        f'<circle r="{r}" fill="none" stroke="rgba(255,255,255,{0.05 + (i % 3) * 0.03})" stroke-width="1.2"/>'
        for i, r in enumerate(range(r0, r1, step))
    )


def banner(slug, title, sub, lines, chips, accent='#ff6a2b', accent2='#6a4bff', w=1280, h=340):
    """An animated repo banner: shimmer title, typed lines, chips, a spinning record."""
    n = max(len(lines), 1)
    slot = 4.2
    dur = n * slot
    typed = ''
    clips = ''
    for i, line in enumerate(lines):
        t0 = i / n
        t1 = t0 + 0.32 / n
        t2 = t0 + 0.92 / n
        t3 = (i + 1) / n
        width = max(60, int(len(line) * 15.2))
        clips += (
            f'<clipPath id="{slug}c{i}"><rect x="80" y="196" height="44" width="0">'
            f'<animate attributeName="width" dur="{dur}s" repeatCount="indefinite" '
            f'values="0;0;{width};{width};0" keyTimes="0;{t0:.4f};{t1:.4f};{t3:.4f};1"/></rect></clipPath>'
        )
        typed += (
            f'<g clip-path="url(#{slug}c{i})" opacity="0">'
            f'<animate attributeName="opacity" dur="{dur}s" repeatCount="indefinite" '
            f'values="0;0;1;1;0;0" keyTimes="0;{t0:.4f};{min(t0 + 0.004, t1):.4f};{t2:.4f};{t3:.4f};1"/>'
            f'<text x="80" y="228" font-family="{MONO}" font-size="25" letter-spacing="1.2" fill="#ffd3bf">{escape(line)}</text></g>'
        )
    chip_svg = ''
    x = 80
    for i, c in enumerate(chips):
        cw = int(len(c) * 8.4 + 30)
        chip_svg += (
            f'<g opacity="0"><animate attributeName="opacity" from="0" to="1" begin="{0.5 + i * 0.18:.2f}s" dur="0.5s" fill="freeze"/>'
            f'<rect x="{x}" y="274" width="{cw}" height="30" rx="15" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.22)"/>'
            f'<text x="{x + cw / 2}" y="294" text-anchor="middle" font-family="{MONO}" font-size="13" fill="#e9ecf0">{escape(c)}</text></g>'
        )
        x += cw + 10
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{escape(title)}">
  <defs>
    <linearGradient id="{slug}bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{BG}"/><stop offset="1" stop-color="#150b10"/></linearGradient>
    <radialGradient id="{slug}ga"><stop offset="0" stop-color="{accent}" stop-opacity=".5"/><stop offset="1" stop-color="{accent}" stop-opacity="0"/></radialGradient>
    <radialGradient id="{slug}gb"><stop offset="0" stop-color="{accent2}" stop-opacity=".42"/><stop offset="1" stop-color="{accent2}" stop-opacity="0"/></radialGradient>
    <linearGradient id="{slug}sh" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#fff"/><stop offset=".38" stop-color="#fff"/><stop offset=".5" stop-color="{accent}"/><stop offset=".62" stop-color="#fff"/><stop offset="1" stop-color="#fff"/>
      <animateTransform attributeName="gradientTransform" type="translate" from="-1.2 0" to="1.2 0" dur="5s" repeatCount="indefinite"/>
    </linearGradient>
    <pattern id="{slug}gr" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,.045)"/></pattern>
    {clips}
  </defs>
  <rect width="{w}" height="{h}" fill="url(#{slug}bg)"/>
  <rect width="{w}" height="{h}" fill="url(#{slug}gr)"/>
  <circle r="280" fill="url(#{slug}ga)"><animate attributeName="cx" values="1010;1120;1010" dur="9s" repeatCount="indefinite"/><animate attributeName="cy" values="90;230;90" dur="9s" repeatCount="indefinite"/></circle>
  <circle r="240" fill="url(#{slug}gb)"><animate attributeName="cx" values="220;110;220" dur="11s" repeatCount="indefinite"/><animate attributeName="cy" values="330;280;330" dur="11s" repeatCount="indefinite"/></circle>
  <g transform="translate(1100 170)">
    <g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="16s" repeatCount="indefinite"/>
      <circle r="132" fill="#0b0b0f" stroke="rgba(255,255,255,.12)"/>{_rings()}
      <circle r="36" fill="{accent}"/><circle r="36" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="3"/>
      <circle cx="0" cy="-20" r="4" fill="#fff" opacity=".9"/><circle r="4" fill="#0b0b0f"/></g>
  </g>
  <circle cx="86" cy="64" r="6" fill="#ff2d2d"><animate attributeName="opacity" values="1;.15;1" dur="1.2s" repeatCount="indefinite"/></circle>
  <text x="104" y="69" font-family="{MONO}" font-size="14" letter-spacing="3" fill="rgba(255,255,255,.62)">{escape(sub)}</text>
  <text x="78" y="164" font-family="{FONT}" font-size="76" font-weight="800" letter-spacing="-2" fill="url(#{slug}sh)">{escape(title)}</text>
  {typed}
  {chip_svg}
  <rect x="0" y="{h - 5}" width="{w}" height="5" fill="{accent}" opacity=".85"><animate attributeName="width" values="0;{w};{w};0" keyTimes="0;.5;.9;1" dur="6s" repeatCount="indefinite"/></rect>
</svg>
'''


def divider(accent='#ff6a2b', accent2='#6a4bff'):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 8" width="1280" height="8" role="presentation">
  <defs><linearGradient id="g" x1="0" x2="1" gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="{accent}" stop-opacity="0"/><stop offset=".5" stop-color="{accent}"/><stop offset="1" stop-color="{accent2}" stop-opacity="0"/>
    <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="3.2s" repeatCount="indefinite"/></linearGradient></defs>
  <rect y="3" width="1280" height="2" rx="1" fill="rgba(255,255,255,.08)"/><rect y="2" width="1280" height="4" rx="2" fill="url(#g)"/>
</svg>
'''


def marquee(items, accent='#ff6a2b'):
    """A scrolling strip of skill chips."""
    gap = 12
    widths = [int(len(t) * 9.4 + 34) for t in items]
    span = sum(widths) + gap * len(items)

    def row(off):
        out = ''
        x = off
        for t, cw in zip(items, widths):
            out += (
                f'<g><rect x="{x}" y="14" width="{cw}" height="38" rx="19" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.2)"/>'
                f'<text x="{x + cw / 2}" y="38" text-anchor="middle" font-family="{MONO}" font-size="15" fill="#e9ecf0">{escape(t)}</text></g>'
            )
            x += cw + gap
        return out

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 66" width="1280" height="66" role="img" aria-label="Stack">
  <defs><linearGradient id="f" x1="0" x2="1"><stop offset="0" stop-color="{BG}"/><stop offset=".07" stop-color="{BG}" stop-opacity="0"/><stop offset=".93" stop-color="{BG}" stop-opacity="0"/><stop offset="1" stop-color="{BG}"/></linearGradient></defs>
  <rect width="1280" height="66" fill="{BG}"/>
  <g><animateTransform attributeName="transform" type="translate" from="0 0" to="-{span} 0" dur="{max(24, len(items) * 2.4):.0f}s" repeatCount="indefinite"/>{row(0)}{row(span)}</g>
  <rect width="1280" height="66" fill="url(#f)"/>
</svg>
'''


def activity(rows, accent='#ff6a2b', mid='#6a4bff'):
    """rows: (name, tier, pushed_label, days_ago, lang)"""
    rh = 46
    h = 70 + rh * len(rows)
    out = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {h}" width="1000" height="{h}" role="img" aria-label="Repositories by recent activity">
  <rect width="1000" height="{h}" rx="10" fill="{BG}" stroke="rgba(255,255,255,.12)"/>
  <text x="28" y="40" font-family="{MONO}" font-size="13" letter-spacing="3" fill="rgba(255,255,255,.55)">SHIPPING LOG · SORTED BY LAST PUSH</text>
'''
    maxd = max(r[3] for r in rows) or 1
    for i, (name, tier, label, days, lang) in enumerate(rows):
        y = 70 + i * rh
        bar = max(40, int(430 * (1 - days / (maxd + 60))))
        hot = days <= 30
        col = accent if hot else (mid if days <= 120 else '#4a5163')
        out += (
            f'<g><text x="28" y="{y + 20}" font-family="{MONO}" font-size="15" fill="#e9ecf0">{escape(name)}</text>'
            f'<text x="28" y="{y + 36}" font-family="{MONO}" font-size="11" fill="rgba(255,255,255,.45)">{escape(lang)} · {escape(tier)}</text>'
            f'<rect x="330" y="{y + 12}" width="430" height="10" rx="5" fill="rgba(255,255,255,.07)"/>'
            f'<rect x="330" y="{y + 12}" width="0" height="10" rx="5" fill="{col}"><animate attributeName="width" from="0" to="{bar}" begin="{0.15 + i * 0.12:.2f}s" dur="1.1s" fill="freeze" calcMode="spline" keySplines=".2 .7 .2 1" keyTimes="0;1"/></rect>'
        )
        if hot:
            out += f'<circle cx="{330 + bar}" cy="{y + 17}" r="5" fill="{col}"><animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.35;1" dur="2s" repeatCount="indefinite"/></circle>'
        out += f'<text x="980" y="{y + 22}" text-anchor="end" font-family="{MONO}" font-size="13" fill="rgba(255,255,255,.7)">{escape(label)}</text></g>\n'
    out += '</svg>\n'
    return out


def button(label, delay=0.0, w=None):
    """A small outlined black and white link button, drawn in a pulse."""
    w = w or int(len(label) * 11 + 46)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} 44" width="{w}" height="44" role="img" aria-label="{escape(label)}">
  <rect x="1" y="1" width="{w - 2}" height="42" rx="21" fill="#07080c" stroke="#e9ecf0" stroke-opacity=".55"/>
  <rect x="1" y="1" width="{w - 2}" height="42" rx="21" fill="none" stroke="#fff" stroke-width="1.6" stroke-dasharray="40 {2 * w}">
    <animate attributeName="stroke-dashoffset" values="0;-{2 * w + 40}" dur="3.6s" begin="{delay:.2f}s" repeatCount="indefinite"/></rect>
  <text x="{w / 2}" y="28" text-anchor="middle" font-family="{MONO}" font-size="14" letter-spacing="2" fill="#fff">{escape(label)}</text>
</svg>
'''
