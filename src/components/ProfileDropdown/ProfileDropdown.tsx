import React from 'react'
import { handleFirebaseLogOut } from 'services/authentication'

export const ProfileDropDown = () => {
  return (
    <div>
      <div className='flex flex-row items-center mr-4'>
        <div className='relative inline-block text-left'>
          {
            <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
              <div
                className='py-1'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'>
                <button
                  onClick={handleFirebaseLogOut}
                  type='submit'
                  className='block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
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
