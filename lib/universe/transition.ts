/**
 * Navigation between the split and the universe pages. Uses the View
 * Transitions API when the browser has it (the named `universe-bg` element
 * morphs from the clicked half to the full-screen shell); otherwise the caller's
 * own animation covers the gap and this just pushes the route.
 */
type VTDocument = Document & {
  startViewTransition?: (cb: () => Promise<void> | void) => { finished: Promise<void> }
}
type Pusher = { push: (href: string) => void }

let pending: (() => void) | null = null

export const VT_NAME = 'universe-bg'
export const FROM_KEY = 'retro:universe:from'

export function navigateWithTransition(router: Pusher, href: string) {
  const doc = document as VTDocument
  if (!doc.startViewTransition) {
    router.push(href)
    return
  }
  doc.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        pending = resolve
        router.push(href)
        // never leave the page frozen if the route is slow
        window.setTimeout(() => {
          if (pending === resolve) {
            pending = null
            resolve()
          }
        }, 1500)
      }),
  )
}

/** Called by a page once its new content is mounted. */
export function notifyRouteReady() {
  const done = pending
  pending = null
  done?.()
}
