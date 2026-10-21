import { INTRO_SRC } from '@/lib/intro/assets'

/**
 * Server-rendered first frame of the intro. Shown only while
 * html[data-intro="play"], underneath the client intro layer, inside the
 * same 16:9 stage box the video uses, so it paints at first contentful
 * paint and the video takes over pixel-for-pixel. This is the LCP element.
 */
export default function IntroPosterCover() {
  return (
    <div className="intro-root intro-cover" aria-hidden="true">
      <div className="intro-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="intro-video"
          src={INTRO_SRC.poster}
          alt=""
          width={1280}
          height={720}
          decoding="sync"
          fetchPriority="high"
        />
      </div>
    </div>
  )
}
