import { NextRequest, NextResponse } from 'next/server'
import { LINKS, cleanSrc } from '@/lib/links'

export const dynamic = 'force-dynamic'

/**
 * Outbound redirect for the link hub: /go/tiktok?src=ig-clips
 * Logs one JSON line per click (slug + which account sent the visitor), then sends them on.
 */
export function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const link = LINKS.find((l) => l.slug === params.slug && l.external)
  if (!link) return NextResponse.redirect(new URL('/links', req.url), 302)

  const src = cleanSrc(req.nextUrl.searchParams.get('src')) || 'direct'
  console.log(JSON.stringify({ evt: 'link_click', slug: link.slug, src, at: new Date().toISOString() }))

  const res = NextResponse.redirect(link.href, 302)
  res.headers.set('Cache-Control', 'no-store')
  return res
}
