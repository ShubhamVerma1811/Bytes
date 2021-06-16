import React from 'react'
import { classnames } from 'tailwindcss-classnames'

type ImageCardProps = {
  src: string
}

export const ImageCard = ({ src }: ImageCardProps) => {
  return (
    <div className={classnames('rounded-lg', 'overflow-hidden', 'shadow-lg')}>
      <img
        src={src}
        alt='byte-cover'
        className='object-cover w-full h-full max-w-102 max-h-102'
      />
    </div>
  )
}

export default ImageCard
