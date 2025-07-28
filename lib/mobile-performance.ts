// Mobile Performance Optimization Utilities

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  let previous = 0
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = wait - (now - previous)
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func(...args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func(...args)
      }, remaining)
    }
  }
}

// Detect mobile device
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768
}

// Optimize animations for mobile
export const getMobileAnimationConfig = () => ({
  duration: isMobile() ? 0.15 : 0.3,
  ease: "easeOut" as const,
  scale: {
    hover: isMobile() ? 1.01 : 1.02,
    tap: isMobile() ? 0.99 : 0.98
  }
})

// Performance monitor for mobile
export class MobilePerformanceMonitor {
  private frameCount = 0
  private lastTime = performance.now()
  private fps = 60
  
  start() {
    this.measureFPS()
  }
  
  private measureFPS() {
    this.frameCount++
    const currentTime = performance.now()
    
    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
      this.frameCount = 0
      this.lastTime = currentTime
      
      // Adjust performance based on FPS
      if (this.fps < 30) {
        this.enablePerformanceMode()
      }
    }
    
    requestAnimationFrame(() => this.measureFPS())
  }
  
  private enablePerformanceMode() {
    // Disable expensive animations
    document.documentElement.style.setProperty('--animation-duration', '0.1s')
    document.documentElement.style.setProperty('--transition-duration', '0.1s')
    
    // Reduce blur effects
    const elements = document.querySelectorAll('.backdrop-blur-sm, .backdrop-blur-md')
    elements.forEach(el => {
      (el as HTMLElement).style.backdropFilter = 'blur(2px)'
    })
  }
  
  getFPS(): number {
    return this.fps
  }
}

// Virtual scrolling for large lists
export class VirtualScroller {
  private container: HTMLElement
  private items: any[]
  private itemHeight: number
  private visibleCount: number
  private scrollTop = 0
  
  constructor(container: HTMLElement, items: any[], itemHeight: number) {
    this.container = container
    this.items = items
    this.itemHeight = itemHeight
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2
    
    this.setupScrollListener()
  }
  
  private setupScrollListener() {
    const throttledScroll = throttle(() => {
      this.scrollTop = this.container.scrollTop
      this.render()
    }, 16) // 60fps
    
    this.container.addEventListener('scroll', throttledScroll, { passive: true })
  }
  
  private render() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight)
    const endIndex = Math.min(startIndex + this.visibleCount, this.items.length)
    
    // Return visible items for rendering
    return {
      visibleItems: this.items.slice(startIndex, endIndex),
      offsetY: startIndex * this.itemHeight,
      totalHeight: this.items.length * this.itemHeight
    }
  }
  
  getVisibleItems() {
    return this.render()
  }
}

// Image lazy loading with performance optimization
export const createLazyImageObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  const options = {
    root: null,
    rootMargin: isMobile() ? '50px' : '100px', // Smaller margin on mobile
    threshold: 0.1
  }
  
  return new IntersectionObserver((entries) => {
    entries.forEach(callback)
  }, options)
}

// Memory cleanup utilities
export const cleanupResources = () => {
  // Clear unused images from memory
  const images = document.querySelectorAll('img[data-loaded="true"]')
  images.forEach((img) => {
    const htmlImg = img as HTMLImageElement
    if (!htmlImg.getBoundingClientRect().width) {
      htmlImg.src = ''
    }
  })
  
  // Force garbage collection if available
  if ('gc' in window) {
    (window as any).gc()
  }
}

// Touch event optimization
export const optimizeTouchEvents = () => {
  // Prevent default touch behaviors that can cause lag
  document.addEventListener('touchstart', (e) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON') {
      e.preventDefault()
    }
  }, { passive: false })
  
  // Optimize scroll momentum
  document.addEventListener('touchmove', (e) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('scroll-container')) {
      // Allow smooth scrolling
      return
    }
  }, { passive: true })
}

// CSS containment helper
export const applyCSSContainment = (element: HTMLElement) => {
  element.style.contain = 'layout style paint'
  element.style.transform = 'translateZ(0)'
  element.style.willChange = 'auto'
}
