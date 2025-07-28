'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { throttle } from './mobile-performance'

// Hook for monitoring FPS performance
export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60)
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const measureFPS = () => {
      frameCountRef.current++
      const currentTime = performance.now()

      if (currentTime >= lastTimeRef.current + 1000) {
        const newFps = Math.round(
          (frameCountRef.current * 1000) / (currentTime - lastTimeRef.current)
        )
        setFps(newFps)
        frameCountRef.current = 0
        lastTimeRef.current = currentTime

        // Enable performance mode for low FPS
        if (newFps < 30) {
          document.body.classList.add('performance-mode')
        } else {
          document.body.classList.remove('performance-mode')
        }
      }

      animationIdRef.current = requestAnimationFrame(measureFPS)
    }

    animationIdRef.current = requestAnimationFrame(measureFPS)

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return fps
}

// Hook for touch optimization
export const useTouchOptimization = () => {
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Prevent zoom on touch
      if (e.touches.length > 1 || e.scale !== 1) {
        e.preventDefault()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Optimize touch scrolling
      const target = e.target as HTMLElement
      if (target.closest('.scroll-container')) {
        return // Allow scrolling
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])
}

// Hook for viewport optimization
export const useViewportOptimization = () => {
  useEffect(() => {
    const updateViewport = () => {
      const vh = window.innerHeight * 0.01
      const vw = window.innerWidth * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      document.documentElement.style.setProperty('--vw', `${vw}px`)
    }

    const throttledUpdate = throttle(updateViewport, 100)

    updateViewport()
    window.addEventListener('resize', throttledUpdate)
    window.addEventListener('orientationchange', throttledUpdate)

    return () => {
      window.removeEventListener('resize', throttledUpdate)
      window.removeEventListener('orientationchange', throttledUpdate)
    }
  }, [])
}

// Hook for memory cleanup
export const useMemoryCleanup = () => {
  const cleanupRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const cleanup = () => {
      // Clean up unused images
      const images = document.querySelectorAll('img[data-src]')
      images.forEach((img) => {
        const htmlImg = img as HTMLImageElement
        const rect = htmlImg.getBoundingClientRect()
        
        // Remove images that are far from viewport
        if (rect.bottom < -1000 || rect.top > window.innerHeight + 1000) {
          htmlImg.src = ''
          htmlImg.removeAttribute('data-loaded')
        }
      })

      // Force garbage collection if available
      if ('gc' in window && performance.memory) {
        const memory = (performance as any).memory
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
          (window as any).gc()
        }
      }
    }

    // Run cleanup every 30 seconds
    cleanupRef.current = setInterval(cleanup, 30000)

    return () => {
      if (cleanupRef.current) {
        clearInterval(cleanupRef.current)
      }
    }
  }, [])
}

// Hook for virtual scrolling
export const useVirtualScroll = (items: any[], itemHeight: number, containerHeight: number) => {
  const [scrollTop, setScrollTop] = useState(0)
  const [visibleItems, setVisibleItems] = useState<any[]>([])
  const [offsetY, setOffsetY] = useState(0)

  const updateVisibleItems = useCallback(
    throttle((scrollTop: number) => {
      const startIndex = Math.floor(scrollTop / itemHeight)
      const visibleCount = Math.ceil(containerHeight / itemHeight) + 2
      const endIndex = Math.min(startIndex + visibleCount, items.length)

      setVisibleItems(items.slice(startIndex, endIndex))
      setOffsetY(startIndex * itemHeight)
    }, 16),
    [items, itemHeight, containerHeight]
  )

  useEffect(() => {
    updateVisibleItems(scrollTop)
  }, [scrollTop, updateVisibleItems])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  return {
    visibleItems,
    offsetY,
    totalHeight: items.length * itemHeight,
    handleScroll
  }
}

// Hook for intersection observer
export const useIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) => {
  const observerRef = useRef<IntersectionObserver>()

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(callback)
    }, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [callback, options])

  const observe = useCallback((element: Element) => {
    observerRef.current?.observe(element)
  }, [])

  const unobserve = useCallback((element: Element) => {
    observerRef.current?.unobserve(element)
  }, [])

  return { observe, unobserve }
}

// Hook for debounced value
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Hook for optimized animation frame
export const useAnimationFrame = (callback: () => void, deps: any[] = []) => {
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      callback()
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }, deps)

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])
}
