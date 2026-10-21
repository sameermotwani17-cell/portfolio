/**
 * One graded copy of the back-view photo. The left half uses the baked
 * graphite grade, the right half the warm original; both are positioned
 * identically so the picture reads as one image across the seam.
 */
export default function SplitPortrait({ variant }: { variant: 'tech' | 'warm' }) {
  const suffix = variant === 'tech' ? '-tech' : ''
  return (
    <picture className={`uni-photo uni-photo--${variant}`}>
      <source media="(max-width: 767px)" srcSet={`/universe/backview-mobile${suffix}.webp`} />
      <img
        src={`/universe/backview-desktop${suffix}.webp`}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </picture>
  )
}
