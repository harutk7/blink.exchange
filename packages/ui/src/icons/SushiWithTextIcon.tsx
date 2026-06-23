import React from 'react'

import type { IconComponent } from '../types'

export const SushiWithTextIcon: IconComponent = (props) => {
  const id = React.useId()
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      fill="none"
      viewBox="0 0 140 28"
    >
      <path
        fill={`url(#blink-wordmark-${id})`}
        fillRule="evenodd"
        d="M14 1c7.18 0 13 5.82 13 13s-5.82 13-13 13S1 21.18 1 14 6.82 1 14 1z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        d="M15.5 4 8 18h5l-1.5 7 10-13.5h-5l2.25-7.5z"
      />
      <text
        x="30"
        y="19"
        fill="currentColor"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="bold"
        letterSpacing="0.5"
      >
        BLINK
      </text>
      <defs>
        <linearGradient
          id={`blink-wordmark-${id}`}
          x1="1"
          y1="1"
          x2="27"
          y2="27"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00D9FF" />
          <stop offset="1" stopColor="#7B2FBE" />
        </linearGradient>
      </defs>
    </svg>
  )
}
