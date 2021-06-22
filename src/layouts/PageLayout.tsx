import React from 'react'
import { classnames } from 'tailwindcss-classnames'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'

export const PageLayout = ({ children }) => {
  return (
    <div className={classnames('flex', 'flex-col', 'h-screen', 'my-3')}>
      <Navbar />
      <div className={classnames('md:mx-4', 'flex-grow')}>{children}</div>
      <Footer />
    </div>
  )
}
