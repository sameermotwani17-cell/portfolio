import { EB_Garamond } from 'next/font/google'

/**
 * The creative universe's serif: Act 2's book page and the `Retro.` mark.
 * Loaded only by the creative components, never preloaded on the home page.
 */
export const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  preload: false,
})
