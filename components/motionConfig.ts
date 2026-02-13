// Shared motion settings for consistent, calmer animations
export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

export const transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1]
}

export const hoverLift = {
  whileHover: { y: -4, scale: 1.01, transition: { duration: 0.25 } }
}
