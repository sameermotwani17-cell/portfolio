"""
The black and white GitHub profile: banner and avatar from make_art.py, link
buttons, a shipping log sorted by activity, and the README.
  python scripts/github/make_art.py <shoot folder> <art dir>
  python scripts/github/build_profile.py <art dir> <stage dir>
Then push the contents of <stage dir>/profile to sameermotwani17-cell/sameermotwani17-cell.
"""
import os, shutil, sys
sys.path.insert(0, os.path.dirname(__file__))
from svg import activity, button, divider, marquee  # noqa: E402

ART = sys.argv[1]
STAGE = sys.argv[2]
OUT = os.path.join(STAGE, 'profile')
shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(os.path.join(OUT, 'assets'), exist_ok=True)

USER = 'sameermotwani17-cell'
P = 'https://portfolio-sameermotwani17-cells-projects.vercel.app'
R = lambda n: f'https://github.com/{USER}/{n}'


def put(rel, text):
    open(os.path.join(OUT, rel), 'w', encoding='utf-8', newline='\n').write(text)


for f in ('banner.svg', 'avatar.png', 'portrait.jpg'):
    shutil.copy(os.path.join(ART, f), os.path.join(OUT, 'assets', f))

put('assets/divider.svg', divider('#ffffff', '#8a8f98'))
SKILLS = ['TypeScript', 'Python', 'Next.js', 'React', 'FastAPI', 'Astro', 'Supabase', 'Postgres', 'Azure', 'GitHub Actions',
          'Vercel', 'Cloudflare', 'Claude API', 'OpenAI', 'LightGBM', 'CatBoost', 'n8n', 'Three.js']
put('assets/stack.svg', marquee(SKILLS, '#ffffff'))

BOARD = [
    ('portfolio', 'shipping now', 'Oct 26', 0, 'TypeScript'),
    ('miru-backend', 'shipped · hackathon', 'Aug 13', 74, 'Python'),
    ('millennium-hall-booking', 'shipped · live', 'Jun 26', 122, 'TypeScript'),
    ('too-easy', 'shipped · live', 'Apr 27', 182, 'HTML'),
    ('akamatsu-system', 'client build', 'Apr 23', 186, 'TypeScript'),
    ('sgm-group-of-companies', 'client build', 'Apr 16', 193, 'TypeScript'),
    ('mamba-point-hotel', 'demo', 'Apr 8', 201, 'HTML'),
    ('chat-tobira', 'placeholder', 'Mar 28', 212, 'none yet'),
    ('miru-frontend', 'shipped · hackathon', 'Mar 21', 219, 'TypeScript'),
    ('retro_github_agent', 'tool', 'Feb 27', 241, 'JavaScript'),
]
put('assets/activity.svg', activity(BOARD, '#ffffff', '#9aa0aa'))

LINKS = [
    ('EMAIL', 'mailto:sameermotwani17@gmail.com'),
    ('PORTFOLIO', P),
    ('TECH', P + '/tech'),
    ('CREATIVE', P + '/creative'),
    ('CV', P + '/cv.pdf'),
    ('LINKEDIN', 'https://www.linkedin.com/in/sameer-motwani-2625a62b5'),
    ('TIKTOK', 'https://www.tiktok.com/@we_love_you_retro'),
    ('INSTAGRAM', 'https://www.instagram.com/retro.studios_'),
    ('SPOTIFY', 'https://open.spotify.com/artist/2vNpaYQTU7PNUh3BjOx07b'),
    ('APPLE MUSIC', 'https://music.apple.com/jp/artist/retro/1803961641'),
]
buttons = ''
for i, (label, href) in enumerate(LINKS):
    name = 'btn-' + label.lower().replace(' ', '-') + '.svg'
    put('assets/' + name, button(label, i * 0.35))
    buttons += f'  <a href="{href}"><img src="assets/{name}" alt="{label.title()}" height="44" /></a>\n'

README = f'''<p align="center"><img src="assets/banner.svg" alt="Sameer Motwani, software engineer, creative director, model" width="100%" /></p>

<p align="center">
{buttons}</p>

<table>
<tr>
<td valign="top">

## Yo, I'm Sameer, aka RETRO

Software engineer, creative director and now **open to modeling work**. I build and ship production software and AI systems, run **Retro Studios**, and release music as RETRO. I measure first, keep a fallback for every failure and verify with data instead of trusting a report.

**In plain English:** I make software that works for real people on bad internet, I test it honestly, and I plan for the day something breaks.

Born in Monrovia, Liberia. Studied the IB in Israel. Now based in **Beppu, Japan** (JST), studying finance at APU and open to new contract work.

</td>
<td width="300" valign="top"><img src="assets/portrait.jpg" alt="Sameer Motwani" width="300" /></td>
</tr>
</table>

<p align="center"><img src="assets/divider.svg" alt="" width="100%" /></p>

## Now

- **Taking new contract work.** My **Stick'Em** contract ended in September and **Ajiwow** wraps in November, so I have open capacity now and more from then.
- **Stick'Em** (Singapore EdTech, 2025 Hult Prize Global winner), contract software engineer, May to Sep 2026. Rebuilt slide delivery for classrooms in Brunei and the Philippines: about **15x faster on Slow-3G** (678 ms vs 10 s+), with the old iframe kept as an automatic fallback.
- **Ajiwow** (Tokyo food-tech, Techstars Tokyo 2026), freelance creative technologist, Sep 30 to Nov 2026. Brand system, a bilingual site on Azure with push-to-deploy, a print pipeline and video direction.
- **Founder of Retro Studios** under StarLabs, and **B.B.A. in Finance at APU**, Beppu. 1st place at the APU Annual Hackathon 2025 and Hult Prize APU runner-up with Best Speaker.

## Shipping log

Every repo below, sorted by the last time I pushed to it.

<p align="center"><img src="assets/activity.svg" alt="Repositories sorted by recent activity" width="100%" /></p>

| Repo | What it is | Stack |
|---|---|---|
| [**portfolio**]({R('portfolio')}) | This whole portfolio: a tech side and a creative side, with case files, a showroom and a CV. | Next.js, TypeScript, Tailwind |
| [**miru-backend**]({R('miru-backend')}) and [**miru-frontend**]({R('miru-frontend')}) | MIRU, a voice AI interview coach for foreigners job-hunting in Japan. Bronze at a 15-team hackathon. | Next.js 16, FastAPI, Postgres |
| [**millennium-hall-booking**]({R('millennium-hall-booking')}) | Seat booking for AFRO WEEK 2026: 732 seats in live availability, QR e-tickets, a door scanner. | Next.js 14, Supabase |
| [**too-easy**]({R('too-easy')}) | A streetwear site built on restraint: five pieces, one grid. | HTML, CSS |
| [**akamatsu-system**]({R('akamatsu-system')}) | Bilingual e-commerce for a Japanese organic store, with pickup, delivery and an owner admin. | Next.js 16, Supabase |
| [**sgm-group-of-companies**]({R('sgm-group-of-companies')}) | An installable parts marketplace for a Liberian company, priced in LRD and USD. | Next.js 14, PWA |
| [**mamba-point-hotel**]({R('mamba-point-hotel')}) | A cinematic luxury hotel demo with zero dependencies. | Vanilla JS |
| [**retro_github_agent**]({R('retro_github_agent')}) | Manage any GitHub repo by sending one sentence to an n8n webhook. | n8n, Claude Code, Express |

## Case files

The longer write-ups live on the portfolio, each with the problem, constraints, approach, decisions and result.

| | Build | Headline |
|---|---|---|
| 01 | [Stick'Em SlideViewer]({P}/tech#builds) | 678 ms vs 10 s+ on Slow-3G, with a fallback for every failure |
| 02 | [Ajiwow site and pipelines]({P}/tech#builds) | Astro on Azure, push-to-deploy, a 31-point print check |
| 03 | [SCRAPYARD]({P}/tech#builds) | A multiplayer shooter from a 200-line spec in one day, 91 tests |
| 04 | [AI Hack 2026]({P}/tech#builds) | AUC 0.7635, Kyoto finalist, the only all-freshman team |
| 05 | [Curriculum engine]({P}/tech#builds) | An AI that picks from a list and never invents a standard |
| 06 | [GOMI Snap]({P}/tech#builds) | 520+ organic users, 95.3% adoption intent (n=400) |

## Stack

<p align="center"><img src="assets/stack.svg" alt="TypeScript, Python, Next.js, React, FastAPI, Astro, Supabase, Postgres, Azure, GitHub Actions, Vercel, Cloudflare, Claude API, OpenAI, LightGBM, CatBoost, n8n, Three.js" width="100%" /></p>

## Recognition

- **AI Hack 2026**, Kyoto finalist, top 8 nationwide, the only all-freshman team
- **Hult Prize APU Campus Round 2026**, 1st runner-up and Best Speaker
- **Kyutech x Science Tokyo x APU Hackathon 2026**, Bronze for MIRU
- **APU Annual Hackathon 2025**, 1st place for GOMI Snap

<p align="center"><img src="assets/divider.svg" alt="" width="100%" /></p>

## Work with me

Contract and freelance: software engineering, AI-first builds and agents, clipping and short-form, and brand-plus-build launches. Part-time, remote worldwide or Japan. Also open to modeling work.

[**Pitch me a project**](mailto:sameermotwani17@gmail.com?subject=Project) · [How I work]({P}/tech#hire) · [Modeling book]({P}/creative#modeling)
'''
put('README.md', README)
print('profile staged:', ', '.join(sorted(os.listdir(os.path.join(OUT, 'assets')))))
