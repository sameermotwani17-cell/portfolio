/** The offers that are not engineering. They live on /creative; the engineering pitch lives on /tech. */
export const CREATIVE_PACKS = [
  {
    name: 'Clipping sprint',
    for: 'Streamers, podcasts, founders and brands with long footage and no time to cut it.',
    get: ['Hooks picked from your footage', 'Animated captions and clean pacing', 'Audio mastered to broadcast level', 'Vertical cuts for TikTok, Reels and Shorts'],
    ref: 'Creator clips, the Ajiwow shorts and the Showroom',
  },
  {
    name: 'Launch pack',
    for: 'Startups that have a product and no identity, site or launch content.',
    get: ['A brand system with tokens and templates', 'A bilingual website on your own cloud', 'Print and video, directed and delivered', 'A design skill so your team stays on brand'],
    ref: 'Ajiwow: brand in 4 days, site draft in 10',
  },
] as const

export const CREATIVE_QUOTE = { text: 'Mind blowing!! You really are a pro!!!', who: 'Tomoko Nomoto, CEO, Ajiwow, on the brand system' } as const
