import React from 'react'

function Button({ className, children,...props}) {
  return (
    <button className={`${className} px-4 py-2 font-medium border-black  rounded-md  `} {...props}>
      {children}
    </button>
  )
}

export default Button
