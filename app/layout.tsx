import type { Metadata, Viewport } from 'next'
import { Anton, Space_Grotesk, Black_Ops_One, Permanent_Marker, Bebas_Neue, Inter, Cormorant } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const blackOps = Black_Ops_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-stencil',
  display: 'swap',
})

const marker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-scrawl',
  display: 'swap',
})

/* ── Retro Studios discography: each release borrows the real typeface its own
      site ships, so the six read as six different labels, not six skins ── */

// Afro Week 2026 (millennium-hall) renders its display type in Bebas Neue
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

// Too Easy loads Inter and nothing else — the quietest record in the set
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-grid',
  display: 'swap',
})

// First Light pairs Cormorant with Inter for its warm, editorial keepsake feel
const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-editorial',
  display: 'swap',
})

const SITE_URL = 'https://portfolio-gamma-two-d8j6b2mgkq.vercel.app'
const TITLE = 'Sameer Motwani — Engineer · Creative Director · Builder'
const DESCRIPTION =
  'Engineer and creative director in Beppu, Japan. Production infrastructure rebuilds, AI systems and agent pipelines — and Retro Studios, a one-person creative studio that delivered a paid 12-country World Cup campaign end to end.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'AI Engineer',
    'Software Engineer',
    'Creative Director',
    'Multimedia Designer',
    'Founder',
    'n8n',
    'Agents',
    'Portfolio',
    'Sameer Motwani',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Sameer Motwani',
    images: [
      { url: '/og.jpg', width: 1200, height: 630, alt: 'Sameer Motwani at dusk — engineer, creative director, builder' },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.jpg'],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sameer Motwani',
  jobTitle: 'Software Engineer, Creative Director & Founder',
  url: SITE_URL,
  email: 'mailto:sameermotwani17@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Beppu', addressCountry: 'JP' },
  alumniOf: 'Ritsumeikan Asia Pacific University',
  sameAs: [
    'https://github.com/sameermotwani17-cell',
    'https://www.linkedin.com/in/sameer-motwani-2625a62b5/',
    'https://www.instagram.com/retro.studios_',
    'https://open.spotify.com/artist/2vNpaYQTU7PNUh3BjOx07b',
  ],
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceGrotesk.variable} ${blackOps.variable} ${marker.variable} ${bebas.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body className="bg-ink text-paper antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
