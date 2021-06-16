import Avatar, { AvatarProps as BoringAvatarProps } from 'boring-avatars'
import React from 'react'

export const BoringAvatar = ({ name, variant, size }: BoringAvatarProps) => {
  return (
    <Avatar
      size={size}
      name={name}
      variant={variant}
      colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
    />
  )
}

export default BoringAvatar
