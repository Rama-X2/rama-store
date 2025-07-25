import { motion as framerMotion } from 'framer-motion'

declare module 'framer-motion' {
  interface MotionComponents {
    input: typeof framerMotion.input
    textarea: typeof framerMotion.textarea
    select: typeof framerMotion.select
  }
}
