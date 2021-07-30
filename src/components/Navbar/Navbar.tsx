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
          <a>
            <h1
              className={classnames(
                'text-2xl',
                'font-bold',
                'cursor-pointer',
                'uppercase',
                'hover:underline'
              )}>
              <span className={classnames('sm:block', 'hidden')}>Bytes | 🎉</span>
              <span className={classnames('sm:hidden')}>🎉</span>
            </h1>
          </a>
        </Link>
      </div>

      <div className={classnames('flex', 'justify-around', 'items-center')}>
        <div className={classnames('mx-4', 'hover:underline')}>
          <Link href='/'><a>Explore</a></Link>
        </div>
        <div className={classnames('mx-4', 'hover:underline')}>
          <Link href='/upload'><a>Upload</a></Link>
        </div>
        <div className={classnames('px-3', 'py-2')}>
          {user.isLoggedIn ? (
            <Fragment>
              <span
                onClick={() => setShowDropDownTo(!showDropDown)}
                className={classnames('cursor-pointer')}>
                <BoringAvatar name={user.name} variant='beam' />
              </span>
              {showDropDown && <ProfileDropDown />}
            </Fragment>
          ) : (
            <Link href='/login'>
              <a className={classnames('hover:underline', 'cursor-pointer')}>
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
