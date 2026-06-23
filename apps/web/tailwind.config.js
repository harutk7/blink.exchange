import sharedConfig from '@sushiswap/tailwindcss-config'

// @ts-check
/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: 'class',
  presets: [sharedConfig],
  content: [...sharedConfig.content],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-space-grotesk)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      colors: {
        primary: 'var(--primary)',
        blue: {
          DEFAULT: '#00d9ff',
          50: '#e6fbff',
          100: '#b3f4ff',
          200: '#80edff',
          300: '#4de6ff',
          400: '#1adfff',
          500: '#00d9ff',
          600: '#00aec9',
          700: '#008394',
          800: '#00585f',
          900: '#002d2b',
        },
        pink: {
          DEFAULT: '#7b2fbe',
          50: '#f4e9fb',
          100: '#e3c2f4',
          200: '#d29ced',
          300: '#c175e6',
          400: '#b04fdf',
          500: '#7b2fbe',
          600: '#622698',
          700: '#4a1c72',
          800: '#31134c',
          900: '#190926',
        },
        yellow: {
          DEFAULT: '#ffb800',
        },
        red: {
          DEFAULT: '#ff3b5c',
        },
        green: {
          DEFAULT: 'rgb(var(--green))',
        },
      },
      display: ['group-hover'],
      visibility: ['group-hover'],
      keyframes: {
        dash: {
          to: {
            'stroke-dashoffset': '0',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-833px)' },
        },
        slide: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-60px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        marquee: 'marquee 5s linear infinite',
        slide: 'slide .5s',
      },
    },
  },
}

export default tailwindConfig
