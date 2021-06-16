import contrast from 'contrast'
import React, { ReactNode } from 'react'
import { classnames } from 'tailwindcss-classnames'

type PillProps = {
  name: string
  color?: string
  curve?: boolean
  children?: ReactNode
}

export const Pill = ({ name, color, curve, children }: PillProps) => {
  return (
    <div
      className={classnames(
        'py-1',
        'px-3',
        'w-max',
        'cursor-pointer',
        'm-2',
        'flex',
        'items-center',
        classnames(!curve ? 'rounded-full' : 'rounded-md')
      )}
      style={{
        background: color,
      }}>
      <p
        className={classnames(
          'uppercase',
          'font-medium',
          classnames(contrast(color) === 'light' ? 'text-black' : 'text-white')
        )}>
        {name}
      </p>
      {children}
    </div>
  )
}

export default Pill
