import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import StarField from '@/components/StarField'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sameer Motwani — AI Builder',
  description:
    'I build AI that ships. Combining computer vision, LLMs, and modern web infrastructure to create products people actually use.',
  keywords: ['AI', 'Machine Learning', 'Web Development', 'Portfolio', 'Sameer Motwani'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="text-[#f5f5f5] antialiased" style={{ backgroundColor: 'transparent' }}>
        <StarField />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
