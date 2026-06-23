import { useIsSmScreen } from '@sushiswap/hooks'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/legacy/image'
import { useRef } from 'react'

export const GuardImage = () => {
  const isSmallScreen = useIsSmScreen()
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    axis: 'y',
    offset: ['end end', 'start end'],
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])

  return (
    <div className="relative w-[420px] h-[420px] flex justify-center items-center">
      <motion.div
        className="z-[1] relative w-[420px] h-[420px]"
        ref={scrollRef}
        {...(!isSmallScreen && { ...{ style: { opacity, scale } } })}
      >
        <Image
          alt="stellar"
          objectFit="contain"
          src="/og-image.png"
          layout="fill"
        />
      </motion.div>
      <div className="absolute inset-[-60px] w-[calc(100%+120px)] h-[calc(100%+120px)] opacity-60">
        <Image
          alt="stellar"
          objectFit="contain"
          src="/og-image.png"
          layout="fill"
        />
      </div>
    </div>
  )
}
