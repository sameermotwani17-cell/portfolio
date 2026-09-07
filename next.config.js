/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimization is ON so release covers get resized to the size the card
    // actually renders. The originals are full-resolution art from each
    // project's own deployment (Afro Week's is 1.6MB, Plastivore's 1.0MB) and
    // shipping those raw into a 520px sleeve was the single heaviest thing on
    // the page. The LCP hero is a hand-rolled <picture>, so it is unaffected.
    remotePatterns: [
      { protocol: 'https', hostname: 'too-easy-seven.vercel.app' },
      { protocol: 'https', hostname: 'plastivore-plum.vercel.app' },
      { protocol: 'https', hostname: 'millennium-hall.vercel.app' },
      { protocol: 'https', hostname: 'danflix-murex.vercel.app' },
      { protocol: 'https', hostname: 'first-light-alpha.vercel.app' },
    ],
  },
  async headers() {
    return [
      {
        // pre-optimized static imagery — cache hard, revalidate in background
        source: '/:dir(scenes|dk2r|blocks)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:file(stickem|gomi-logo|aiful-logo|og)\\.:ext(png|jpg|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
