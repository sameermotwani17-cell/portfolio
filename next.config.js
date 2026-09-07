/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    // RETRO Studios release covers are served by each project's own deployment,
    // so the art on a card is always the art that project actually ships
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
