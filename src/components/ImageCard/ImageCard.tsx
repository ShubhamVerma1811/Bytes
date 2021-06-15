import React, { ReactNode } from "react"
import { classnames } from "tailwindcss-classnames"

type ImageCardProps = {
  src: string
}

export const ImageCard = ({ src }: ImageCardProps) => {
  return (
    <div className={classnames("rounded-lg", "overflow-hidden", "shadow-lg")}>
      <img src={src} alt='byte-cover' className='w-full h-full object-cover' />
    </div>
  )
}

export default ImageCard
