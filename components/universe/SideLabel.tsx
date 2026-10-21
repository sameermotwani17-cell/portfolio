import type { UniverseCopy } from '@/lib/universe/sides'

/** Big display label + sub-line at the foot of each half. Always visible: it is the call to action. */
export default function SideLabel({ u }: { u: UniverseCopy }) {
  return (
    <span className={`uni-label uni-label--${u.side}`}>
      <span className="uni-label__title">{u.label}</span>
      <span className="uni-label__sub">{u.sub}</span>
      <span className="uni-label__enter" aria-hidden="true">
        ENTER <i>→</i>
      </span>
    </span>
  )
}
