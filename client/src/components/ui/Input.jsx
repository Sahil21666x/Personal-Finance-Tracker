import React from 'react'

const Input = React.forwardRef(({ className, placeholder, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full text-base px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-black ${className}`}
      placeholder={placeholder}
      {...props}
    />
  )
})

Input.displayName = "Input";

export default Input
