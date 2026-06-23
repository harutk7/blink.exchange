export const SushiIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="102"
      height="104"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_blink)">
        <rect
          y="0.969727"
          width="102"
          height="102.743"
          rx="12.5446"
          fill="white"
          fillOpacity="0.1"
        />
        <path
          fill="url(#blink-gradient)"
          d="M256 16c132.55 0 240 107.45 240 240S388.55 496 256 496 16 388.55 16 256 123.45 16 256 16z"
        />
        <path
          fill="#fff"
          d="M284 72 148 288h84l-24 152 160-216h-84l36-152z"
        />
      </g>
      <defs>
        <filter
          id="filter0_blink"
          x="-21.744"
          y="-20.7742"
          width="145.488"
          height="146.231"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="10.872" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur"
            result="shape"
          />
        </filter>
        <linearGradient
          id="blink-gradient"
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
