import { Fragment } from 'react'

/** The story copy marks italics with *asterisks* (book and Hebrew-word titles). */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g)
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : <Fragment key={i}>{p}</Fragment>))}
    </>
  )
}
