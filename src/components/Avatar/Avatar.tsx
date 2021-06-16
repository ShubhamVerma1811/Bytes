import React from 'react'

type AvatarProps = {
  src: string
}

export const Avatar = ({ src }: AvatarProps) => {
  return (
    <img className='w-full h-full object-cover' src={src} alt='user_avatar' />
  )
}

export default Avatar
