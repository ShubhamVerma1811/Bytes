import React from 'react'
import { classnames } from 'tailwindcss-classnames'

type TitleProps = {
  title: string
  med?: boolean
}

export const Title = ({ title, med }: TitleProps) => {
  return (
    <div>
      <p
        className={classnames(
          'text-center',
          'font-medium',
          classnames(med ? 'text-2xl' : 'text-4xl')
        )}>
        {title}
      </p>
    </div>
  )
}

export default Title
