'use client'

import React, { memo, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useVirtualScroll, useIntersectionObserver } from '../lib/performance-hooks'
import { getMobileAnimationConfig, isMobile } from '../lib/mobile-performance'

// Get optimized animation config
const animationConfig = getMobileAnimationConfig()

// Virtualized Payment Method Selector
interface OptimizedPaymentSelectorProps {
  payments: Array<{
    id: string
    name: string
    image: string
    category: string
  }>
  selectedPayment: string | null
  onSelect: (paymentId: string) => void
  category: string
}

export const OptimizedPaymentSelector = memo<OptimizedPaymentSelectorProps>(({
  payments,
  selectedPayment,
  onSelect,
  category
}) => {
  const containerHeight = isMobile() ? 200 : 150
  const itemHeight = isMobile() ? 60 : 50

  const {
    visibleItems,
    offsetY,
    totalHeight,
    handleScroll
  } = useVirtualScroll(payments, itemHeight, containerHeight)

  const handlePaymentSelect = useCallback((paymentId: string) => {
    onSelect(paymentId)
  }, [onSelect])

  return (
    <div 
      className="relative"
      style={{ height: Math.min(containerHeight, totalHeight) }}
    >
      <div
        className="overflow-y-auto h-full custom-scrollbar"
        onScroll={handleScroll}
        style={{
          contain: 'layout style paint',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {visibleItems.map((payment, index) => (
                <OptimizedPaymentItem
                  key={`${category}-${payment.id}`}
                  payment={payment}
                  isSelected={selectedPayment === payment.id}
                  onSelect={handlePaymentSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

OptimizedPaymentSelector.displayName = 'OptimizedPaymentSelector'

// Optimized Payment Item Component
interface OptimizedPaymentItemProps {
  payment: {
    id: string
    name: string
    image: string
  }
  isSelected: boolean
  onSelect: (paymentId: string) => void
}

const OptimizedPaymentItem = memo<OptimizedPaymentItemProps>(({
  payment,
  isSelected,
  onSelect
}) => {
  const handleClick = useCallback(() => {
    onSelect(payment.id)
  }, [payment.id, onSelect])

  // Intersection observer for lazy loading
  const { observe } = useIntersectionObserver((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      if (img.dataset.src && !img.dataset.loaded) {
        img.src = img.dataset.src
        img.dataset.loaded = 'true'
      }
    }
  })

  const imageRef = useCallback((node: HTMLImageElement | null) => {
    if (node) {
      observe(node)
    }
  }, [observe])

  return (
    <motion.button
      onClick={handleClick}
      className={`relative p-2 rounded-lg border-2 transition-all duration-200 touch-manipulation ${
        isSelected
          ? 'border-primary bg-primary/10'
          : 'border-gray-600 hover:border-gray-500'
      }`}
      whileTap={{ scale: animationConfig.scale.tap }}
      style={{
        contain: 'layout style paint',
        transform: 'translateZ(0)',
        willChange: isSelected ? 'transform' : 'auto'
      }}
    >
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 h-8 relative">
          <img
            ref={imageRef}
            data-src={payment.image}
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='100%25' height='100%25' fill='%23374151'/%3E%3C/svg%3E"
            alt={payment.name}
            width={32}
            height={32}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.style.display = 'none'
            }}
          />
        </div>
        <span className="text-xs text-white text-center truncate w-full">
          {payment.name}
        </span>
      </div>
    </motion.button>
  )
})

OptimizedPaymentItem.displayName = 'OptimizedPaymentItem'

// Virtualized Package Selector
interface OptimizedPackageSelectorProps {
  packages: Array<{
    id: number
    amount: string
    price: string
    popular?: boolean
  }>
  selectedPackage: number | null
  onSelect: (packageId: number) => void
}

export const OptimizedPackageSelector = memo<OptimizedPackageSelectorProps>(({
  packages,
  selectedPackage,
  onSelect
}) => {
  const containerHeight = isMobile() ? 400 : 300
  const itemHeight = isMobile() ? 80 : 60

  const {
    visibleItems,
    offsetY,
    totalHeight,
    handleScroll
  } = useVirtualScroll(packages, itemHeight, containerHeight)

  const handlePackageSelect = useCallback((packageId: number) => {
    onSelect(packageId)
  }, [onSelect])

  return (
    <div 
      className="relative"
      style={{ height: Math.min(containerHeight, totalHeight) }}
    >
      <div
        className="overflow-y-auto h-full custom-scrollbar"
        onScroll={handleScroll}
        style={{
          contain: 'layout style paint',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {visibleItems.map((pkg) => (
                <OptimizedPackageItem
                  key={pkg.id}
                  package={pkg}
                  isSelected={selectedPackage === pkg.id}
                  onSelect={handlePackageSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

OptimizedPackageSelector.displayName = 'OptimizedPackageSelector'

// Optimized Package Item Component
interface OptimizedPackageItemProps {
  package: {
    id: number
    amount: string
    price: string
    popular?: boolean
  }
  isSelected: boolean
  onSelect: (packageId: number) => void
}

const OptimizedPackageItem = memo<OptimizedPackageItemProps>(({
  package: pkg,
  isSelected,
  onSelect
}) => {
  const handleClick = useCallback(() => {
    onSelect(pkg.id)
  }, [pkg.id, onSelect])

  return (
    <motion.button
      onClick={handleClick}
      className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 touch-manipulation ${
        isSelected
          ? 'border-primary bg-primary/10 shadow-glow'
          : 'border-gray-600 hover:border-gray-500 glass-effect'
      }`}
      whileTap={{ scale: animationConfig.scale.tap }}
      style={{
        contain: 'layout style paint',
        transform: 'translateZ(0)',
        willChange: isSelected ? 'transform' : 'auto'
      }}
    >
      {pkg.popular && (
        <div className="absolute -top-2 -right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
          Popular
        </div>
      )}
      
      <div className="space-y-2">
        <h4 className="font-semibold text-white text-sm md:text-base">
          {pkg.amount}
        </h4>
        <p className="text-primary font-bold text-sm md:text-lg">
          {pkg.price}
        </p>
      </div>
    </motion.button>
  )
})

OptimizedPackageItem.displayName = 'OptimizedPackageItem'

// Virtualized Game List Component
interface OptimizedGameListProps {
  games: any[]
  onGameSelect: (game: any) => void
}

export const OptimizedGameList = memo<OptimizedGameListProps>(({
  games,
  onGameSelect
}) => {
  const containerHeight = 600
  const itemHeight = isMobile() ? 120 : 100

  const {
    visibleItems,
    offsetY,
    totalHeight,
    handleScroll
  } = useVirtualScroll(games, itemHeight, containerHeight)

  const handleGameClick = useCallback((game: any) => {
    onGameSelect(game)
  }, [onGameSelect])

  return (
    <div 
      className="relative"
      style={{ height: Math.min(containerHeight, totalHeight) }}
    >
      <div
        className="overflow-y-auto h-full custom-scrollbar"
        onScroll={handleScroll}
        style={{
          contain: 'layout style paint',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {visibleItems.map((game) => (
                <OptimizedGameCard
                  key={game.id}
                  game={game}
                  onClick={handleGameClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

OptimizedGameList.displayName = 'OptimizedGameList'

// Optimized Game Card Component
interface OptimizedGameCardProps {
  game: any
  onClick: (game: any) => void
}

const OptimizedGameCard = memo<OptimizedGameCardProps>(({
  game,
  onClick
}) => {
  const handleClick = useCallback(() => {
    onClick(game)
  }, [game, onClick])

  // Intersection observer for lazy loading
  const { observe } = useIntersectionObserver((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      if (img.dataset.src && !img.dataset.loaded) {
        img.src = img.dataset.src
        img.dataset.loaded = 'true'
      }
    }
  })

  const imageRef = useCallback((node: HTMLImageElement | null) => {
    if (node) {
      observe(node)
    }
  }, [observe])

  return (
    <motion.div
      onClick={handleClick}
      className="game-card p-4 cursor-pointer"
      whileTap={{ scale: animationConfig.scale.tap }}
      style={{
        contain: 'layout style paint',
        transform: 'translateZ(0)'
      }}
    >
      <div className="relative aspect-video mb-3 rounded-lg overflow-hidden">
        <img
          ref={imageRef}
          data-src={game.image}
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='169'%3E%3Crect width='100%25' height='100%25' fill='%23374151'/%3E%3C/svg%3E"
          alt={game.name}
          width={300}
          height={169}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.style.display = 'none'
          }}
        />
      </div>
      <h3 className="font-semibold text-white mb-1 truncate">{game.name}</h3>
      <p className="text-gray-400 text-sm line-clamp-2">{game.description}</p>
    </motion.div>
  )
})

OptimizedGameCard.displayName = 'OptimizedGameCard'
