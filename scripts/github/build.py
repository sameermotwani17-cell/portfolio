"""
Builds the GitHub makeover into a staging folder, one subfolder per repo, each
holding the files to copy in (README.md plus assets/*.svg).
  python scripts/github/build.py <stage dir>
Then scripts/github/publish.sh clones each repo, copies the stage over it and pushes.
Every claim below was read from the repo itself (package.json, routes, the
existing README or spec) or from the CV. Nothing is invented.
"""
import os, re, sys, urllib.request
sys.path.insert(0, os.path.dirname(__file__))
from svg import activity, banner, divider, marquee  # noqa: E402

STAGE = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.getcwd(), 'gh-stage')
USER = 'sameermotwani17-cell'
PORTFOLIO = 'https://portfolio-sameermotwani17-cells-projects.vercel.app'


def put(repo, rel, text):
    p = os.path.join(STAGE, repo, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w', encoding='utf-8', newline='\n').write(text)


def raw(repo, path):
    with urllib.request.urlopen(f'https://raw.githubusercontent.com/{USER}/{repo}/HEAD/{path}') as r:
        return r.read().decode('utf-8')


FOOT = (
    '<p align="center"><img src="assets/divider.svg" alt="" width="100%" /></p>\n\n'
    '<p align="center"><sub>Built by <a href="https://github.com/' + USER + '">Sameer Motwani</a> · <a href="' + PORTFOLIO + '">portfolio</a></sub></p>\n'
)
HEAD = '<p align="center"><img src="assets/banner.svg" alt="%s" width="100%%" /></p>\n\n'


def assets(repo, slug, title, sub, lines, chips, accent='#ff6a2b', accent2='#6a4bff'):
    put(repo, 'assets/banner.svg', banner(slug, title, sub, lines, chips, accent, accent2))
    put(repo, 'assets/divider.svg', divider(accent, accent2))


# ───────────────────────── AFRO WEEK ─────────────────────────
assets('millennium-hall-booking', 'mh', 'AFRO WEEK 2026', f'{USER} / millennium-hall-booking',
       ['732 seats in live availability', 'Seat picker, QR e-ticket, door scanner', 'Next.js 14 + Supabase'],
       ['Next.js 14', 'Supabase', 'TypeScript', 'Tailwind', 'Resend', 'QR'], '#fcd116', '#ce1126')
put('millennium-hall-booking', 'README.md', HEAD % 'AFRO WEEK 2026 booking' + '''<p align="center">
  <a href="https://millennium-hall.vercel.app"><img alt="Live" src="https://img.shields.io/badge/live-millennium--hall.vercel.app-fcd116?style=for-the-badge&labelColor=0b0d11" /></a>
  <img alt="Next.js 14" src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Postgres-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

## What it is

The ticketing site for **AFRO WEEK 2026**, a theatrical production at Millennium Hall, APU. Pick a seat from a live map of the hall, book it with a name and an email, and get an instant **QR e-ticket**. On the night, ushers scan tickets at the door.

**In plain English:** you choose your seat, you get a ticket on your phone, and the person at the door scans it. Nobody can book the same seat twice.

## What it does

| Page | What happens |
|---|---|
| `/` and `/the-line` | The story of the production, told as a scroll-driven film with sound |
| `/seats` and `/reserve` | A live hall map with 732 seats in real-time availability, then the booking form |
| `/ticket` | The e-ticket with its QR code, downloadable as a PDF |
| `/usher` | A door scanner that reads tickets with the camera and checks them against the database |
| `/admin` | Bookings, live stats and a button to resend a confirmation email |

## How it is built

```text
Browser ──► Next.js 14 (App Router, TypeScript, Tailwind)
              ├─ /api/seats    live availability
              ├─ /api/book     validated with zod, rate limited
              ├─ /api/ticket   ticket by reference
              ├─ /api/scan     door check-in
              └─ /api/admin/*  bookings, stats, resend
                       │
                       ▼
            Supabase (Postgres + SQL migrations)   ──►  Resend (confirmation email)
```

- **No double bookings.** Seat state lives in Postgres and the book route checks it, so two people cannot take the same seat.
- **Tickets are QR codes** generated with `qrcode`, rendered to PDF with `jspdf`, and read at the door with `jsqr`.
- **Rate limiting** on the booking route, and a `demo-store` so the site still runs with no database for demos.
- **Migrations** are plain SQL in `supabase/migrations`: the initial schema, a reseed of the hall, and seat blocks reserved for the cast.

## Run it

```bash
npm install
cp .env.example .env.local   # Supabase URL and keys, Resend key, app URL
npm run dev                  # http://localhost:3000
```

Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NEXT_PUBLIC_APP_URL`.

''' + FOOT)

# ───────────────────────── Akamatsu ─────────────────────────
assets('akamatsu-system', 'ak', '赤松 Health & Lifestyle', f'{USER} / akamatsu-system',
       ['Bilingual e-commerce, Phase 1', 'Pickup and delivery, with an owner admin', 'Japanese first, English second'],
       ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'next-intl', 'Zustand', 'Radix UI'], '#c0392b', '#d4a017')
put('akamatsu-system', 'README.md', HEAD % 'Akamatsu Health and Lifestyle' + '''<p align="center">
  <a href="https://akamatsu-system.vercel.app"><img alt="Live" src="https://img.shields.io/badge/live-akamatsu--system.vercel.app-c0392b?style=for-the-badge&labelColor=0b0d11" /></a>
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white" />
</p>

## What it is

An online shop for **赤松 Health & Lifestyle**, a Japanese organic and gluten-free food and lifestyle store. Phase 1 is browse, order, and collect in store or have it delivered. It serves local Japanese residents and Korean and European tourists in Tokyo, so every screen is **bilingual**: Japanese first, English second.

**In plain English:** customers browse the shop, place an order and choose pickup or delivery. The owner sees every order in a simple admin and moves it from packed to delivered to paid.

## What it does

- **Browse and cart** with a Zustand store and Radix UI components, in Japanese and English through `next-intl`.
- **Checkout saves to the server** through `/api/orders`, not to browser storage, so an order survives a closed tab.
- **Pickup or delivery.** Delivery uses an estimated fee for now.
- **Confirmation email** through Resend when it is configured.
- **Owner admin.** Update an order's status (packed, delivered, paid), archive or reopen it, and work a queue of pending payments.
- **Safer public lookup.** Viewing an order confirmation needs both the order id and the order number.

## Stack

| Layer | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| UI | Tailwind, Radix UI, lucide-react, Noto Serif JP and Noto Sans JP |
| State and i18n | Zustand, next-intl |
| Data | Supabase (`@supabase/ssr`) |
| Email | Resend |

The brand is a warm Japanese apothecary look: cream and stone neutrals, a confident red `#C0392B` and a touch of gold.

## Docs in this repo

- [`PRODUCT_SPEC_V2.md`](PRODUCT_SPEC_V2.md) is the full product spec, brand tokens and phase plan.
- [`AGENTS.md`](AGENTS.md) and [`CLAUDE.md`](CLAUDE.md) hold the working rules for AI-assisted development.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
```

''' + FOOT)

# ───────────────────────── SGM ─────────────────────────
assets('sgm-group-of-companies', 'sg', 'SGM Marketplace', f'{USER} / sgm-group-of-companies',
       ['Automotive parts marketplace, Monrovia', 'Prices in LRD and USD', 'Installable, mobile-first PWA'],
       ['Next.js 14', 'React 18', 'Zustand', 'Framer Motion', 'next-pwa', 'Tailwind'], '#c0392b', '#1a2744')
put('sgm-group-of-companies', 'README.md', HEAD % 'SGM Marketplace' + '''<p align="center">
  <a href="https://sgm-group-of-companies.vercel.app"><img alt="Live" src="https://img.shields.io/badge/live-sgm--group--of--companies.vercel.app-c0392b?style=for-the-badge&labelColor=0b0d11" /></a>
  <img alt="Next.js 14" src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs" />
  <img alt="PWA" src="https://img.shields.io/badge/PWA-installable-5a0fc8?style=for-the-badge&logo=pwa&logoColor=white" />
</p>

## What it is

A company site and a **mobile-first parts marketplace** for **SGM Group** in Monrovia, Liberia. Customers browse engine oils, spare parts, tyres, batteries, fluids and accessories, see prices in **Liberian dollars and US dollars**, and check out from a phone. It installs like an app.

**In plain English:** a drivers' shop in your pocket. Find the part, see the price in your currency, add it to the cart.

## What it does

| Route | What it is |
|---|---|
| `/`, `/about`, `/contact` | The company website |
| `/marketplace` | The marketplace entry |
| `/app` | The installable shop: products, product detail, cart, checkout and orders |

- **Products** carry a brand, category, stock state, rating and review count, flash-deal and new flags, and **variants with their own LRD and USD prices**.
- **Six categories:** engine oils, spare parts, tyres, batteries, fluids and accessories.
- **Mobile layout** with a bottom navigation bar, and a desktop sidebar on larger screens.
- **Installable.** `public/manifest.json` makes it a standalone app that starts at `/app`, and `next-pwa` handles the service worker.

## Stack

Next.js 14 (App Router), React 18, Zustand for the cart, Framer Motion, Tailwind, `next-pwa` and lucide-react.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
```

''' + FOOT)

# ───────────────────────── TOO EASY ─────────────────────────
assets('too-easy', 'te', 'TOO EASY', f'{USER} / too-easy',
       ['Streetwear, restraint as a feature', 'Five pieces, one grid', 'Plain HTML and CSS, no framework'],
       ['HTML', 'CSS', 'Inter'], '#e9ecf0', '#6a4bff')
put('too-easy', 'README.md', HEAD % 'TOO EASY' + '''<p align="center">
  <a href="https://too-easy-seven.vercel.app"><img alt="Live" src="https://img.shields.io/badge/live-too--easy--seven.vercel.app-e9ecf0?style=for-the-badge&labelColor=0b0d11" /></a>
  <img alt="HTML" src="https://img.shields.io/badge/HTML5-no_framework-e34f26?style=for-the-badge&logo=html5&logoColor=white" />
  <img alt="CSS" src="https://img.shields.io/badge/CSS3-1572b6?style=for-the-badge&logo=css3&logoColor=white" />
</p>

## What it is

**TOO EASY** is a streetwear label built as an exercise in restraint. Five pieces, shot and priced like a real drop: a jersey, a puffer jacket, sneakers, sunglasses and track pants. The product grid carries the whole page. There is no manifesto and no lifestyle campaign.

**In plain English:** a shop page that trusts the clothes to do the talking.

## How it is built

- One `index.html` with its own CSS, set in Inter. No framework, no build step, nothing to install.
- Product photography lives in `images/`.
- Deployed as a static site on Vercel.

## Run it

```bash
# open index.html in a browser, or serve the folder
npx serve .
```

''' + FOOT)

# ───────────────────────── patches for READMEs that are already good ─────────────────────────
def patch(repo, slug, title, sub, lines, chips, accent, accent2, strip_first_fence=False, prepend_only=False):
    assets(repo, slug, title, sub, lines, chips, accent, accent2)
    body = raw(repo, 'README.md').replace('\r\n', '\n')
    if strip_first_fence:
        # drop the leading ASCII block (a fenced code block inside the first lines, possibly in a centered div)
        body = re.sub(r'\A(<div align="center">\s*\n)?```[^\n]*\n.*?```\n', '', body, count=1, flags=re.S)
        body = re.sub(r'\A\s*</div>\s*\n', '', body)
    put(repo, 'README.md', HEAD % title + body.lstrip('\n').rstrip('\n') + '\n\n' + FOOT)


patch('miru-backend', 'mb', 'MIRU 見る', f'{USER} / miru-backend',
      ['AI interview simulation for Japan', 'A Japanese HR interviewer, in voice', 'Bronze · the only APU team on the podium'],
      ['Next.js 16', 'React 19', 'FastAPI', 'Postgres', 'ElevenLabs'], '#2ec4b6', '#6a4bff')
patch('miru-frontend', 'mf', 'MIRU 見る', f'{USER} / miru-frontend',
      ['AI interview simulation for Japan', 'Simulate. Score. Succeed.', '72-hour hackathon build, Bronze prize'],
      ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Framer Motion'], '#2ec4b6', '#6a4bff', strip_first_fence=True)
patch('retro_github_agent', 'ra', 'RETRO GITHUB AGENT', f'{USER} / retro_github_agent',
      ['Manage any repo with one sentence', 'n8n webhook, then Claude Code, then a commit', 'Express + Docker'],
      ['n8n', 'Claude Code', 'Express', 'Docker', 'GitHub'], '#ff6a2b', '#6a4bff', strip_first_fence=True)
patch('mamba-point-hotel', 'mp', 'MAMBA POINT HOTEL', f'{USER} / mamba-point-hotel',
      ['A luxury hotel demo, Monrovia', 'Cinematic, no framework, zero dependencies', 'Canvas particles, 3D tilt, live pricing'],
      ['HTML5', 'CSS3', 'Vanilla JS', 'Canvas'], '#c9a84c', '#6a4bff')

# ───────────────────────── the profile README ─────────────────────────
SKILLS = ['TypeScript', 'Python', 'Next.js', 'React', 'FastAPI', 'Astro', 'Supabase', 'Postgres', 'Azure', 'GitHub Actions',
          'Vercel', 'Cloudflare', 'Claude API', 'OpenAI', 'LightGBM', 'CatBoost', 'n8n', 'Three.js']
put('profile', 'assets/banner.svg', banner('pf', 'SAMEER MOTWANI', f'{USER} · locked in',
    ['software engineer, AI systems', 'creative director, RETRO', 'shipping from Beppu, Japan'],
    ['Open to contract', 'JST · remote', 'TypeScript', 'Python', 'Next.js', 'Claude'], '#ff6a2b', '#6a4bff'))
put('profile', 'assets/divider.svg', divider())
put('profile', 'assets/stack.svg', marquee(SKILLS))

# (name, tier, pushed label, days ago as of 2026-10-26, language)
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
put('profile', 'assets/activity.svg', activity(BOARD))

R = lambda n: f'https://github.com/{USER}/{n}'
PROFILE = '''<p align="center"><img src="assets/banner.svg" alt="Sameer Motwani, software engineer and creative director" width="100%" /></p>

<p align="center">
  <a href="%(p)s/tech"><img alt="Tech portfolio" src="https://img.shields.io/badge/tech_portfolio-ff6a2b?style=for-the-badge&labelColor=0b0d11" /></a>
  <a href="%(p)s/creative"><img alt="Creative portfolio" src="https://img.shields.io/badge/creative_portfolio-6a4bff?style=for-the-badge&labelColor=0b0d11" /></a>
  <a href="%(p)s/cv.pdf"><img alt="CV" src="https://img.shields.io/badge/CV-e9ecf0?style=for-the-badge&labelColor=0b0d11" /></a>
  <a href="mailto:sameermotwani17@gmail.com"><img alt="Open to contract" src="https://img.shields.io/badge/open_to-contract_work-3ecf8e?style=for-the-badge&labelColor=0b0d11" /></a>
</p>

## Locked in

I build and ship production software and AI systems, and I run **Retro Studios**, a one-person creative studio. I measure first, keep a fallback for every failure, and verify with data instead of trusting a report.

**In plain English:** I make software that works for real people on bad internet, I test it honestly, and I plan for the day something breaks.

<p align="center"><img src="assets/divider.svg" alt="" width="100%" /></p>

## Now

- **Contract software engineer at Stick'Em**, a Singapore EdTech and 2025 Hult Prize Global winner. Rebuilt slide delivery for classrooms in Brunei and the Philippines: about **15x faster on Slow-3G** (678 ms vs 10 s+), with the old iframe kept as an automatic fallback.
- **Founder of Retro Studios** under StarLabs. A paid 12-country World Cup campaign, a solo-built store with live PayPal and Stripe, and brand, site and video work for a Techstars Tokyo startup.
- **B.B.A. in Finance at APU**, Beppu, Japan. 1st place at the APU Annual Hackathon 2025 and Hult Prize APU runner-up with Best Speaker.

## Shipping log

Every repo below, sorted by the last time I pushed to it.

<p align="center"><img src="assets/activity.svg" alt="Repositories sorted by recent activity" width="100%" /></p>

| Repo | What it is | Stack |
|---|---|---|
| [**portfolio**](%(portfolio)s) | This whole portfolio: a tech side and a creative side, with case files, a showroom and a CV. | Next.js, TypeScript, Tailwind |
| [**miru-backend**](%(mb)s) and [**miru-frontend**](%(mf)s) | MIRU, a voice AI interview coach for foreigners job-hunting in Japan. Bronze at a 15-team hackathon. | Next.js 16, FastAPI, Postgres |
| [**millennium-hall-booking**](%(mh)s) | Seat booking for AFRO WEEK 2026: 732 seats in live availability, QR e-tickets, a door scanner. | Next.js 14, Supabase |
| [**too-easy**](%(te)s) | A streetwear site built on restraint: five pieces, one grid. | HTML, CSS |
| [**akamatsu-system**](%(ak)s) | Bilingual e-commerce for a Japanese organic store, with pickup, delivery and an owner admin. | Next.js 16, Supabase |
| [**sgm-group-of-companies**](%(sg)s) | An installable parts marketplace for a Liberian company, priced in LRD and USD. | Next.js 14, PWA |
| [**mamba-point-hotel**](%(mp)s) | A cinematic luxury hotel demo with zero dependencies. | Vanilla JS |
| [**retro_github_agent**](%(ra)s) | Manage any GitHub repo by sending one sentence to an n8n webhook. | n8n, Claude Code, Express |

## Case files

The longer write-ups live on the portfolio, each with the problem, constraints, approach, decisions and result.

| | Build | Headline |
|---|---|---|
| 01 | [Stick'Em SlideViewer](%(p)s/tech#builds) | 678 ms vs 10 s+ on Slow-3G, with a fallback for every failure |
| 02 | [Ajiwow site and pipelines](%(p)s/tech#builds) | Astro on Azure, push-to-deploy, a 31-point print check |
| 03 | [SCRAPYARD](%(p)s/tech#builds) | A multiplayer shooter from a 200-line spec in one day, 91 tests |
| 04 | [AI Hack 2026](%(p)s/tech#builds) | AUC 0.7635, Kyoto finalist, the only all-freshman team |
| 05 | [Curriculum engine](%(p)s/tech#builds) | An AI that picks from a list and never invents a standard |
| 06 | [GOMI Snap](%(p)s/tech#builds) | 520+ organic users, 95.3% adoption intent (n=400) |

## Stack

<p align="center"><img src="assets/stack.svg" alt="TypeScript, Python, Next.js, React, FastAPI, Astro, Supabase, Postgres, Azure, GitHub Actions, Vercel, Cloudflare, Claude API, OpenAI, LightGBM, CatBoost, n8n, Three.js" width="100%" /></p>

## Recognition

- **AI Hack 2026**, Kyoto finalist, top 8 nationwide, the only all-freshman team
- **Hult Prize APU Campus Round 2026**, 1st runner-up and Best Speaker
- **Kyutech x Science Tokyo x APU Hackathon 2026**, Bronze for MIRU
- **APU Annual Hackathon 2025**, 1st place for GOMI Snap

<p align="center"><img src="assets/divider.svg" alt="" width="100%" /></p>

## Work with me

Contract and freelance: software engineering, AI-first builds and agents, clipping and short-form, and brand-plus-build launches. Part-time, remote worldwide or Japan.

<p align="center">
  <a href="mailto:sameermotwani17@gmail.com?subject=Project"><img alt="Pitch me a project" src="https://img.shields.io/badge/pitch_me_a_project-ff6a2b?style=for-the-badge&labelColor=0b0d11" /></a>
  <a href="%(p)s/tech#hire"><img alt="How I work" src="https://img.shields.io/badge/how_i_work-e9ecf0?style=for-the-badge&labelColor=0b0d11" /></a>
  <a href="https://www.linkedin.com/in/sameer-motwani-2625a62b5"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
</p>
'''
SUB = dict(p=PORTFOLIO, portfolio=R('portfolio'), mb=R('miru-backend'), mf=R('miru-frontend'), mh=R('millennium-hall-booking'),
           te=R('too-easy'), ak=R('akamatsu-system'), sg=R('sgm-group-of-companies'), mp=R('mamba-point-hotel'), ra=R('retro_github_agent'))
for k, v in SUB.items():
    PROFILE = PROFILE.replace('%(' + k + ')s', v)
put('profile', 'README.md', PROFILE)

print('staged:', ', '.join(sorted(os.listdir(STAGE))))
