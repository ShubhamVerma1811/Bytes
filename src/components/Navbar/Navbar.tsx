import { BoringAvatar, ProfileDropDown } from 'components'
import { UserContext } from 'context/UserContext'
import Link from 'next/link'
import React, { Fragment, useContext, useState } from 'react'
import { handleFirebaseLogOut } from 'services/authentication'
import { classnames } from 'tailwindcss-classnames'

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const [showDropDown, setShowDropDownTo] = useState(false)

  const handleLogOut = () => {
    handleFirebaseLogOut()
    setUser({})
  }

  return (
    <nav
      className={classnames(
        'flex',
        'items-center',
        'justify-around',
        'h-14',
        'px-1'
      )}>
      <div className={classnames('w-full')}>
        <Link href='/'>
          <h1
            className={classnames(
              'text-2xl',
              'font-bold',
              'cursor-pointer',
              'uppercase'
            )}>
            Bytes
          </h1>
        </Link>
      </div>

      <div className={classnames('flex', 'justify-around', 'items-center')}>
        <div className={classnames('mx-4')}>
          <Link href='/'>Explore</Link>
        </div>
        <div className={classnames('mx-4')}>
          <Link href='/upload'>Upload</Link>
        </div>
        <div className={classnames('px-3', 'py-2')}>
          {/* @ts-ignore */}
          {user.isLoggedIn ? (
            <Fragment>
              <span onClick={() => setShowDropDownTo(!showDropDown)}>
                <BoringAvatar name={user.name} variant='beam' />
              </span>
              {showDropDown && <ProfileDropDown />}
            </Fragment>
          ) : (
            <Link href='/login'>Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
