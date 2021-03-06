import { UserContext } from 'context/UserContext'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useContext } from 'react'
import { handleFirebaseLogOut } from 'services/authentication'

export const ProfileDropDown = () => {
  const { theme, setTheme } = useTheme()
  const { user } = useContext(UserContext)

  return (
    <div>
      <div className='flex flex-row items-center mr-4'>
        <div className='relative inline-block text-left'>
          {
            <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
              <div
                className='py-1 dark:bg-gray-800 dark:text-white'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'>
                <Link href={`/profile/${user.username}`}>
                  <a>
                    <button
                      type='submit'
                      className='block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-800 dark:text-white'
                      role='menuitem'>
                      <span className='pr-4'></span>
                      Profile : {user.name}
                    </button>
                  </a>
                </Link>
                <hr />
                <button
                  onClick={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light')
                  }}
                  type='submit'
                  className='block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-gray-800 dark:text-white'
                  role='menuitem'>
                  <span className='pr-4'></span>
                  Current theme: {theme}
                </button>
                <hr />
                <button
                  onClick={handleFirebaseLogOut}
                  type='submit'
                  className='block w-full text-left px-4 py-2 text-sm text-red-700 dark:text-pink-300 font-medium hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
                  role='menuitem'>
                  <span className='pr-4'></span>
                  Logout
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ProfileDropDown
