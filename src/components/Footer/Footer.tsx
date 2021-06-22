import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { classnames } from 'tailwindcss-classnames'

export const Navbar = () => {
  return (
    <footer className={classnames('py-6', 'text-center')}>
      Made with <AiFillHeart className='inline' style={{ color: 'red' }} /> by{' '}
      <a
        href='https://shubhamverma.me'
        target='_blank'
        rel='noopener noreferrer'>
        <span className='font-bold text-red-500 hover:underline'>
          Shubham Verma
        </span>
      </a>
    </footer>
  )
}

export default Navbar
