import React from "react"
import { classnames } from "tailwindcss-classnames"

export const Title = ({ title }: { title: string }) => {
  return (
    <div>
      <p className={classnames("text-center", "text-4xl", "font-medium")}>
        {title}
      </p>
    </div>
  )
}

export default Title
