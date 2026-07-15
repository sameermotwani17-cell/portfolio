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

export const metadata: Metadata = {
  title: 'Sameer Motwani — Engineer · Founder · Builder',
  description:
    'Engineer and founder in Beppu, Japan. Production infrastructure, AI systems, and the occasional game built as a side quest.',
  keywords: ['AI', 'Software Engineer', 'Founder', 'Portfolio', 'Sameer Motwani'],
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${spaceGrotesk.variable} ${blackOps.variable}`}>
      <body className="bg-ink text-paper antialiased">
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
