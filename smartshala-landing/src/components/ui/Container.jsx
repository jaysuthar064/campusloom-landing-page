/**
 * The page's content column.
 *
 * The design puts 1334px of content inside a 1440px viewport, i.e. 53px
 * gutters. Capping the *outer* width at 1440 and setting the gutter as padding
 * gives exactly that at 1440+, and degrades to sensible gutters below it.
 * (Capping the inner width instead would stack padding on top of the cap and
 * push content in too far.)
 */
export default function Container({ className = '', children }) {
  return (
    <div
      className={`mx-auto w-full max-w-page px-5 sm:px-8 xl:px-13.25 ${className}`}
    >
      {children}
    </div>
  )
}
