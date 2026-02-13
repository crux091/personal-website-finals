/**
 * Performance Optimization Utilities
 */

// Preload critical resources
export function preloadCriticalAssets() {
  if (typeof window === 'undefined') return

  // Preload fonts
  const fonts = [
    '/fonts/inter.woff2',
    '/fonts/outfit.woff2',
  ]

  fonts.forEach((font) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.href = font
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Performance monitoring (optional - for development)
export function measurePerformance() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return

  // Simple performance marks
  performance.mark('app-start')
  
  window.addEventListener('load', () => {
    performance.mark('app-loaded')
    performance.measure('app-load-time', 'app-start', 'app-loaded')
    
    const measure = performance.getEntriesByName('app-load-time')[0]
    if (measure) {
      console.log('App Load Time:', measure.duration.toFixed(2), 'ms')
    }
  })
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  if (typeof window === 'undefined') return null

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.01,
    ...options,
  })
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
