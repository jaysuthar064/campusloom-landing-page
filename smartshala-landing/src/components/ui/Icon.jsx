import { Suspense } from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'

/**
 * Renders a Lucide icon by name.
 *
 * Icon names come from the CMS as kebab-case strings ("graduation-cap"), so
 * they cannot be imported statically. DynamicIcon loads them on demand, which
 * means any Lucide icon can be chosen in wp-admin without a code change.
 *
 * A same-sized placeholder is reserved while the icon loads so nothing shifts.
 */
export default function Icon({ name, size = 24, className = '', ...rest }) {
  if (!name) return null

  const placeholder = (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="inline-block shrink-0"
    />
  )

  return (
    <Suspense fallback={placeholder}>
      <DynamicIcon
        name={name}
        size={size}
        className={className}
        fallback={() => placeholder}
        {...rest}
      />
    </Suspense>
  )
}
