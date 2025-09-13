import React from 'react'

function Card({heading, subHeading, className, children}) {
  return (
    <div
      className={`
        ${className}
        w-full
        bg-white border border-gray-200 rounded-2xl
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        mx-auto p-4 md:p-8
        
      `}
    >
      {heading && <h1 className="text-lg md:text-2xl text-center font-bold mb-2">{heading}</h1>}
      {subHeading && <p className="text-sm text-center text-gray-500 mb-4">{subHeading}</p>}
      {children}
    </div>
  );
}

export default Card
