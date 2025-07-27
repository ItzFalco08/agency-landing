import React from 'react'
import {motion} from 'framer-motion'

function Graph(props: React.ComponentProps<typeof motion.svg>) {
  return (
    <motion.svg
      className="w-[500px]"
      viewBox="0 0 594 183"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2 149.5C2 149.5 24.8363 117.65 47 111.5C78.3808 102.792 92.4976 143.045 125 141C168.419 138.268 171.094 81.1918 214 74C252.915 67.4772 272.433 106.036 311.5 100.5C352.262 94.7241 359.421 46.7242 400.5 44C442.937 41.1858 456.17 95.6142 498.5 91.5C549.079 86.5842 592 1 592 1" stroke="#7BBC70" strokeWidth="4"/>
      <path d="M47 111.5C24.8363 117.65 2 149.5 2 149.5V182.5H592V1C592 1 549.079 86.5842 498.5 91.5C456.169 95.6142 442.937 41.1858 400.5 44C359.421 46.7242 352.262 94.7241 311.5 100.5C272.433 106.036 252.915 67.4772 214 74C171.094 81.1918 168.419 138.268 125 141C92.4976 143.045 78.3808 102.792 47 111.5Z" fill="url(#paint0_linear_180_1259)"/>
      <defs>
      <linearGradient id="paint0_linear_180_1259" x1="297" y1="1" x2="297" y2="183" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B0DDA9"/>
        <stop offset="1" stopColor="#262626"/>
      </linearGradient>
      </defs>
    </motion.svg>
  )
}

export default Graph