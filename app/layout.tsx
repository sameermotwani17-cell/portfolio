import type { Metadata, Viewport } from 'next'
import { Anton, Space_Grotesk, Black_Ops_One } from 'next/font/google'
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

const SITE_URL = 'https://portfolio-gamma-two-d8j6b2mgkq.vercel.app'
const DESCRIPTION =
  'Engineer and founder in Beppu, Japan. Production infrastructure rebuilds, AI systems and agent pipelines, n8n automation — and the occasional multiplayer FPS built from a 200-line spec.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Sameer Motwani — Engineer · Founder · Builder',
  description: DESCRIPTION,
  keywords: ['AI Engineer', 'Software Engineer', 'Founder', 'n8n', 'Agents', 'Portfolio', 'Sameer Motwani'],
  openGraph: {
    title: 'Sameer Motwani — Engineer · Founder · Builder',
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Sameer Motwani',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Sameer Motwani at dusk — engineer, founder, builder' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sameer Motwani — Engineer · Founder · Builder',
    description: DESCRIPTION,
    images: ['/og.jpg'],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sameer Motwani',
  jobTitle: 'Software Engineer & Founder',
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
    <html lang="en" className={`${anton.variable} ${spaceGrotesk.variable} ${blackOps.variable}`}>
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
