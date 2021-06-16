import React from 'react'
import { classnames } from 'tailwindcss-classnames'

export const GridLayout = ({ children }) => {
  return (
    <div
      className={classnames(
        'grid',
        'grid-cols-1',
        'gap-4',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        classnames('gap-y-6')
      )}>
      {children}
    </div>
  )
}
