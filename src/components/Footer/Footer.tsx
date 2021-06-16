import React from 'react'

export const Navbar = () => {
  return (
    <footer className='max-w-6xl m-auto text-center py-4'>
      Made with ❤ by{' '}
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
