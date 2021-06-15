import React from "react"
import { classnames } from "tailwindcss-classnames"
import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar/Navbar"

export const PageLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className={classnames("md:mx-4")}>{children}</div>
      <Footer />
    </div>
  )
}
