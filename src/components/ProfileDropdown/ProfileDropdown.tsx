import React, { MouseEventHandler } from 'react'

type DropdownProps = {
  list: Array<{ name: string; onClick?: MouseEventHandler<any> }>
}

export const ProfileDropdown = ({ list }: DropdownProps) => {
  return (
    <div>
      {list.map(({ name, onClick }, idx) => {
        return <Item name={name} onClick={onClick} key={idx} />
      })}
    </div>
  )
}

export default ProfileDropdown

type ItemProps = {
  name: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

const Item = ({ name, onClick }: ItemProps) => {
  return (
    <div onClick={onClick}>
      <li>{name}</li>
    </div>
  )
}
