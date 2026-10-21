/**
 * Act 2's centre line. Only things I actually do, taken from the main-branch
 * audit (DK2R, the concept brands, Afro Week, Danflix, the music) and from my
 * own Section 03 copy (motion, content, streams). RETRO hits print in signal red.
 */
export const KEYWORDS = [
  'RETRO',
  'RETRO',
  'motion',
  'RETRO',
  'campaigns',
  'DK2R',
  'RETRO',
  'AI visuals',
  'ads',
  'TOO EASY',
  'content',
  'streams',
  'music',
  'RETRO',
  'PLASTIVORE',
  'direction',
  'story',
  'RETRO STUDIOS',
] as const

export const isRetro = (w: string) => w.startsWith('RETRO')

/**
 * Filler prose for the blurred lines. My own copy from the audit, never the
 * reference reel's book text.
 */
export const FILLER = [
  'Twelve country editions for the 2026 World Cup, three hundred numbered pieces each, run solo.',
  'Morocco got Zellige tiles, Japan got kintsugi through the sakura, Brazil got the rhinestone crest.',
  'One person, an AI-native stack, and a Director’s Brief written before every single generation.',
  'Eight prompt layers underneath it, one of them there purely to kill the tells that give AI imagery away.',
  'A minimal streetwear line, five pieces, no manifesto, a product-first grid and a lot of restraint.',
  'Every step eats plastic: a concept shoe, three colorways and the enzyme that was found in 2016.',
  'Seven hundred and thirty-two seats in Millennium Hall, pick your seat, show the QR at the door.',
  'A birthday gift dressed up as a streaming service, an ident with its own sting and a finale called The Bench.',
  'Original production, lyrics written before code was ever a thing, light, then fire, then dusk.',
] as const
