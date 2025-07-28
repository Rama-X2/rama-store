'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { X, ShoppingCart, Star, Clock, Shield } from 'lucide-react'
import { Game } from '../types/game'
import Button from './ui/Button'
import Input from './ui/Input'
import { PurchaseConfirmModal } from './ui/ConfirmModal'
import { useToastContext } from './ui/ToastProvider'
import { paymentMethods, getPaymentMethodsByCategory } from '../lib/payment-images'
import { throttle, getMobileAnimationConfig, isMobile } from '../lib/mobile-performance'
import { usePerformanceMonitor, useTouchOptimization, useViewportOptimization, useMemoryCleanup } from '../lib/performance-hooks'
// Removed VirtualizedComponents import - using direct implementation

// Debounce utility function for performance optimization
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Get optimized animation config based on device
const animationConfig = getMobileAnimationConfig()

interface GameDetailProps {
  game: Game
  onClose: () => void
}

const topupPackages = [
  { id: 1, amount: '86 Diamonds', price: 'Rp 20.000', popular: false },
  { id: 2, amount: '172 Diamonds', price: 'Rp 40.000', popular: false },
  { id: 3, amount: '257 Diamonds', price: 'Rp 60.000', popular: true },
  { id: 4, amount: '344 Diamonds', price: 'Rp 80.000', popular: false },
  { id: 5, amount: '429 Diamonds', price: 'Rp 100.000', popular: false },
  { id: 6, amount: '514 Diamonds', price: 'Rp 120.000', popular: false },
  { id: 7, amount: '878 Diamonds', price: 'Rp 200.000', popular: false },
  { id: 8, amount: '1159 Diamonds', price: 'Rp 250.000', popular: false },
  { id: 9, amount: '2195 Diamonds', price: 'Rp 500.000', popular: false },
  { id: 10, amount: '4830 Diamonds', price: 'Rp 1.000.000', popular: false },
]

export default function GameDetail({ game, onClose }: GameDetailProps) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [userId, setUserId] = useState('')
  const [serverId, setServerId] = useState('')
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { showSuccess, showError } = useToastContext()

  // Performance optimization hooks
  const fps = usePerformanceMonitor()
  useTouchOptimization()
  useViewportOptimization()
  useMemoryCleanup()

  // Memoize payment methods to prevent unnecessary re-renders
  const paymentMethodsData = useMemo(() => ({
    ewallet: getPaymentMethodsByCategory('e-wallet').map(p => ({ ...p, image: p.icon })),
    bank: [...getPaymentMethodsByCategory('bank'), ...getPaymentMethodsByCategory('qr-code')].map(p => ({ ...p, image: p.icon })),
    convenience: getPaymentMethodsByCategory('convenience-store').map(p => ({ ...p, image: p.icon })),
    mobile: getPaymentMethodsByCategory('mobile-provider').map(p => ({ ...p, image: p.icon }))
  }), [])

  // Throttled scroll handler for better performance
  const throttledScrollHandler = useCallback(
    throttle(() => {
      // Handle scroll events efficiently
    }, 16), // 60fps
    []
  )

  // Debounced input handlers for better performance
  const debouncedSetUserId = useCallback(
    debounce((value: string) => setUserId(value), 300),
    []
  )
  
  const debouncedSetServerId = useCallback(
    debounce((value: string) => setServerId(value), 300),
    []
  )

  // Disable body scroll when popup is open with performance optimization
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    const originalWidth = document.body.style.width
    const originalHeight = document.body.style.height
    
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.width = originalWidth
      document.body.style.height = originalHeight
    }
  }, [])

  const handlePurchase = () => {
    if (!selectedPackage || !userId || !serverId) {
      showError('Data Tidak Lengkap', 'Mohon lengkapi User ID dan Server ID terlebih dahulu.')
      return
    }
    if (!selectedPayment) {
      showError('Metode Pembayaran Belum Dipilih', 'Mohon pilih metode pembayaran terlebih dahulu.')
      return
    }
    setShowConfirmModal(true)
  }

  const handleConfirmPurchase = async () => {
    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showSuccess('Pembelian Berhasil!', 'Item akan segera dikirim ke akun game Anda.')
      setShowConfirmModal(false)
      onClose()
    } catch (error) {
      showError('Pembelian Gagal', 'Terjadi kesalahan saat memproses pembayaran.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: animationConfig.duration }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-hidden game-detail-popup"
      onClick={onClose}
      style={{
        contain: 'layout style paint',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: animationConfig.duration, ease: animationConfig.ease }}
        className="w-full max-w-4xl max-h-[95vh] mx-auto rounded-3xl bg-dark border border-gray-700 shadow-2xl overflow-hidden flex flex-col will-change-transform motion-div"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        style={{ 
          contain: 'layout style paint size',
          isolation: 'isolate',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        {/* Header dengan banner game yang lebih besar dan menarik */}
        <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden rounded-t-3xl flex-shrink-0">
          {/* Parallax background */}
          <motion.div 
            className="absolute inset-0 scale-110"
            animate={{
              scale: [1.1, 1.12, 1.1],
              rotate: [0, 0.5, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image 
              src={game.banner} 
              alt={`${game.name} banner`}
              width={800}
              height={400}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
              }}
            />
          </motion.div>
          
          {/* Enhanced gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          
          {/* Floating particles effect - reduced for mobile performance */}
          {!isMobile() && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: '110%',
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  y: '-10%',
                  opacity: [0, 0.8, 0],
                  scale: [0, Math.random() * 0.6 + 0.4, 0]
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeOut"
                }}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
              />
              ))}
            </div>
          )}
          
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/60 rounded-2xl 
                     flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200 backdrop-blur-md border border-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} className="md:w-6 md:h-6" />
          </motion.button>
          
          {/* Game info dengan desain yang lebih menarik */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex items-center space-x-3 md:space-x-6 z-10">
            {/* Game icon dengan efek glow */}
            <motion.div 
              className="relative"
              animate={isMobile() ? {} : {
                y: [0, -3, 0],
                rotate: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-xl md:rounded-2xl 
                            flex items-center justify-center text-2xl md:text-4xl font-bold backdrop-blur-sm
                            border border-white/20 shadow-2xl relative overflow-hidden">
                {/* Fallback character */}
                <div className="absolute inset-0 flex items-center justify-center z-10 text-white">
                  {game.name.charAt(0)}
                </div>
                {/* Game icon */}
                <Image 
                  src={game.icon} 
                  alt={game.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded-xl md:rounded-2xl opacity-0 transition-opacity duration-300"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.opacity = '1';
                    const fallback = img.parentElement?.querySelector('div');
                    if (fallback) (fallback as HTMLElement).style.opacity = '0';
                  }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                  }}
                />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              {/* Pulsing ring - reduced for mobile */}
              {!isMobile() && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-white/30"
                />
              )}
            </motion.div>
            
            {/* Game details */}
            <div className="flex-1 min-w-0">
              <motion.h1 
                className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg truncate"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {game.name}
              </motion.h1>
              <motion.p 
                className="text-white/90 mb-2 md:mb-4 text-sm md:text-lg drop-shadow-md line-clamp-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {game.description}
              </motion.p>
              <motion.div 
                className="flex items-center space-x-2 md:space-x-6 text-xs md:text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center space-x-1 md:space-x-2 bg-black/30 px-2 md:px-3 py-1 md:py-2 rounded-full backdrop-blur-sm">
                  <Star size={14} className="text-yellow-400 md:w-[18px] md:h-[18px]" fill="currentColor" />
                  <span className="text-white font-medium hidden sm:inline">4.8</span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2 bg-black/30 px-2 md:px-3 py-1 md:py-2 rounded-full backdrop-blur-sm">
                  <Clock size={14} className="text-green-400 md:w-[18px] md:h-[18px]" />
                  <span className="text-white font-medium hidden sm:inline">Instant</span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2 bg-black/30 px-2 md:px-3 py-1 md:py-2 rounded-full backdrop-blur-sm">
                  <Shield size={14} className="text-blue-400 md:w-[18px] md:h-[18px]" />
                  <span className="text-white font-medium hidden sm:inline">Aman</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div 
          className="custom-scrollbar flex-1 overflow-y-auto pb-8 will-change-scroll scroll-container" 
          onScroll={throttledScrollHandler}
          style={{
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            contain: 'layout style paint size',
            transform: 'translateZ(0)',
            WebkitOverflowScrolling: 'touch',
            isolation: 'isolate',
            overscrollBehavior: 'contain'
          }}
        >
          {/* Game Info Section - No 12 */}
          <div className="p-4 md:p-6 border-b border-gray-700">
            <div className="grid lg:grid-cols-5 gap-4 md:gap-8">
              {/* Left side - User Input (2 columns) - Yellow Border */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                <div className="glass-effect rounded-lg md:rounded-xl p-4 md:p-6 border-2 border-yellow-400">
                  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Data Akun</h3>
                  <div className="space-y-3 md:space-y-4">
                    <Input
                      label="User ID"
                      type="text"
                      defaultValue={userId}
                      onChange={(e) => debouncedSetUserId(e.target.value)}
                      placeholder="Masukkan User ID"
                      helperText="ID pengguna akun game Anda"
                    />
                    <Input
                      label="Server ID"
                      type="text"
                      defaultValue={serverId}
                      onChange={(e) => debouncedSetServerId(e.target.value)}
                      placeholder="Masukkan Server ID"
                      helperText="ID server tempat Anda bermain"
                    />
                  </div>
                </div>
              </div>

              {/* Middle - Payment Methods */}
              <div className="lg:col-span-2">
                <div className="glass-effect rounded-lg md:rounded-xl p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Metode Pembayaran</h3>
                  
                  {/* E-Wallet */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">E-Wallet</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'gopay', name: 'GoPay', color: 'bg-blue-500', icon: 'G' },
                        { id: 'dana', name: 'DANA', color: 'bg-blue-600', icon: 'D' },
                        { id: 'ovo', name: 'OVO', color: 'bg-purple-500', icon: 'O' },
                        { id: 'shopeepay', name: 'ShopeePay', color: 'bg-orange-500', icon: 'S' }
                      ].map((method) => (
                        <motion.button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                            selectedPayment === method.id
                              ? 'border-primary bg-primary/10 shadow-glow'
                              : 'border-gray-600 hover:border-gray-500 glass-effect'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div className={`w-8 h-8 ${method.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                              {method.icon}
                            </div>
                            <span className="text-xs text-white font-medium">{method.name}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Bank & QRIS */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Bank Transfer & QRIS</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { id: 'bank_transfer', name: 'Bank Transfer', color: 'bg-green-600', icon: 'B' },
                        { id: 'qris', name: 'QRIS', color: 'bg-red-500', icon: 'Q' },
                        { id: 'bca', name: 'BCA', color: 'bg-blue-800', icon: 'BC' }
                      ].map((method) => (
                        <motion.button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                            selectedPayment === method.id
                              ? 'border-primary bg-primary/10 shadow-glow'
                              : 'border-gray-600 hover:border-gray-500 glass-effect'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div className={`w-8 h-8 ${method.color} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>
                              {method.icon}
                            </div>
                            <span className="text-xs text-white font-medium">{method.name}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Minimarket */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Minimarket</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'indomaret', name: 'Indomaret', color: 'bg-yellow-500', icon: 'I' },
                        { id: 'alfamart', name: 'Alfamart', color: 'bg-red-600', icon: 'A' }
                      ].map((method) => (
                        <motion.button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                            selectedPayment === method.id
                              ? 'border-primary bg-primary/10 shadow-glow'
                              : 'border-gray-600 hover:border-gray-500 glass-effect'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div className={`w-8 h-8 ${method.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                              {method.icon}
                            </div>
                            <span className="text-xs text-white font-medium">{method.name}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Pulsa */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Pulsa</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'telkomsel', name: 'Telkomsel', color: 'bg-red-500', icon: 'T' },
                        { id: 'indosat', name: 'Indosat', color: 'bg-yellow-600', icon: 'I' },
                        { id: 'xl', name: 'XL Axiata', color: 'bg-blue-700', icon: 'XL' },
                        { id: 'tri', name: 'Tri', color: 'bg-pink-500', icon: '3' }
                      ].map((method) => (
                        <motion.button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                            selectedPayment === method.id
                              ? 'border-primary bg-primary/10 shadow-glow'
                              : 'border-gray-600 hover:border-gray-500 glass-effect'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div className={`w-8 h-8 ${method.color} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>
                              {method.icon}
                            </div>
                            <span className="text-xs text-white font-medium">{method.name}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Game Detail Info (1 column) */}
              <div className="lg:col-span-1">
                <div className="glass-effect rounded-lg md:rounded-xl p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Informasi Game</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-400">Developer:</span>
                      <p className="text-white font-medium">Game Studio</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Rating:</span>
                      <p className="text-white font-medium flex items-center">
                        <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                        4.8/5
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Proses:</span>
                      <p className="text-white font-medium flex items-center">
                        <Clock size={16} className="text-green-400 mr-1" />
                        Instant
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Keamanan:</span>
                      <p className="text-white font-medium flex items-center">
                        <Shield size={16} className="text-green-400 mr-1" />
                        100% Aman
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Packages Section - No 13 */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <ShoppingCart className="w-6 h-6 text-primary mr-2" />
              Pilih Nominal Top Up
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {topupPackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedPackage === pkg.id
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'border-gray-700 bg-dark-light hover:border-gray-600 hover:bg-gray-800/50'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 left-4 px-3 py-1 bg-gradient-to-r 
                                  from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black">
                      POPULER
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white mb-1">{pkg.amount}</h4>
                      <p className="text-2xl font-bold text-primary">{pkg.price}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 transition-colors ${
                      selectedPackage === pkg.id
                        ? 'border-primary bg-primary'
                        : 'border-gray-500'
                    }`}>
                      {selectedPackage === pkg.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-full h-full rounded-full bg-white/20"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Purchase Section - No 14 */}
          <div className="p-6 pb-8 border-t border-gray-700 bg-dark-light/30 rounded-b-3xl">
            {/* Order Summary */}
            {selectedPackage && (
              <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animationConfig.duration }}
                  className="glass-effect rounded-xl p-6 mb-6"
              >
                <h3 className="text-lg font-semibold mb-4 text-white">Ringkasan Pesanan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Game:</span>
                    <span className="text-white font-medium">{game.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Item:</span>
                    <span className="text-white font-medium">
                      {topupPackages.find(p => p.id === selectedPackage)?.amount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User ID:</span>
                    <span className="text-white font-medium">{userId || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Server:</span>
                    <span className="text-white font-medium">{serverId || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pembayaran:</span>
                    <span className="text-white font-medium">
                      {selectedPayment === 'gopay' ? 'GoPay' :
                       selectedPayment === 'dana' ? 'DANA' :
                       selectedPayment === 'ovo' ? 'OVO' :
                       selectedPayment === 'shopeepay' ? 'ShopeePay' :
                       selectedPayment === 'bank_transfer' ? 'Bank Transfer' :
                       selectedPayment === 'qris' ? 'QRIS' :
                       selectedPayment === 'bca' ? 'BCA' :
                       selectedPayment === 'indomaret' ? 'Indomaret' :
                       selectedPayment === 'alfamart' ? 'Alfamart' :
                       selectedPayment === 'telkomsel' ? 'Telkomsel' :
                       selectedPayment === 'indosat' ? 'Indosat' :
                       selectedPayment === 'xl' ? 'XL Axiata' :
                       selectedPayment === 'tri' ? 'Tri' : '-'}
                    </span>
                  </div>
                  <div className="border-t border-gray-600 pt-3 flex justify-between text-lg">
                    <span className="text-white font-semibold">Total:</span>
                    <span className="text-primary font-bold">
                      {topupPackages.find(p => p.id === selectedPackage)?.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Purchase Button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: animationConfig.duration }}
            >
              <Button
                onClick={handlePurchase}
                disabled={!selectedPackage || !userId || !serverId || !selectedPayment}
                size="lg"
                glow
                icon={<ShoppingCart size={20} />}
                className="px-8 py-4"
              >
                Beli Sekarang
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: animationConfig.duration }}
              className="mt-6 grid grid-cols-3 gap-4 text-center"
            >
              <div className="flex flex-col items-center">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-400 mb-1 md:mb-2" />
                <span className="text-xs md:text-sm text-gray-400">100% Aman</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mb-1 md:mb-2" />
                <span className="text-xs md:text-sm text-gray-400">Proses Instan</span>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 mb-1 md:mb-2" fill="currentColor" />
                <span className="text-xs md:text-sm text-gray-400">Rating 4.8</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Purchase Confirmation Modal */}
      <PurchaseConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmPurchase}
        game={game.name}
        package={topupPackages.find(p => p.id === selectedPackage)?.amount || ''}
        price={topupPackages.find(p => p.id === selectedPackage)?.price || ''}
        loading={isProcessing}
      />
    </motion.div>
  )
}