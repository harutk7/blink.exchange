import React from 'react'

import type { IconComponent } from '../types'

export const SushiIcon: IconComponent = (props) => {
  const id = React.useId()
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="none"
      viewBox="0 0 512 512"
    >
      <path
        fill={`url(#blink-${id})`}
        d="M256 16c132.55 0 240 107.45 240 240S388.55 496 256 496 16 388.55 16 256 123.45 16 256 16z"
      />
      <path
        fill="#fff"
        d="M284 72 148 288h84l-24 152 160-216h-84l36-152z"
      />
      <defs>
        <linearGradient
          id={`blink-${id}`}
          x1="0"
          y1="0"
          x2="512"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00D9FF" />
          <stop offset="1" stopColor="#7B2FBE" />
        </linearGradient>
      </defs>
    </svg>
  )
}
