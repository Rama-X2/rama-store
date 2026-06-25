'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Game } from '../types/game'

interface SplashAnimationProps {
  game: Game
  onComplete: () => void
}

export default function SplashAnimation({ game, onComplete }: SplashAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [particles, setParticles] = useState<{ id: number; startX: number; scale: number; endX: number; delay: number }[]>([])

  // Detect if mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Generate stable particle properties once on mount to avoid layout thrashing
  useEffect(() => {
    const width = window.innerWidth || 1000
    const count = window.innerWidth < 768 ? 10 : 30
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      startX: Math.random() * width,
      scale: Math.random() * 0.8 + 0.5,
      endX: Math.random() * width,
      delay: Math.random() * 2
    }))
    setParticles(generated)
  }, [])

  // Timers representing phases: accelerated total to 1.8s for snappy feel
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 100)  // Show icon
    const timer2 = setTimeout(() => setAnimationPhase(2), 800)  // Start banner transition
    const timer3 = setTimeout(() => setAnimationPhase(3), 1300) // Banner visible, icon gone
    const timer4 = setTimeout(() => setAnimationPhase(4), 1600) // Prepare for game detail
    const timer5 = setTimeout(() => onComplete(), 1800)        // Complete

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Banner Background - appears from phase 2 */}
      <AnimatePresence>
        {animationPhase >= 2 && (
          <motion.div
            initial={{ 
              scale: 3, 
              opacity: 0,
              filter: isMobile ? 'none' : 'blur(50px)',
              rotate: 5
            }}
            animate={{ 
              scale: animationPhase >= 4 ? 1 : 1.2,
              opacity: animationPhase >= 3 ? 0.9 : 0.3,
              filter: isMobile ? 'none' : (animationPhase >= 3 ? 'blur(0px)' : 'blur(20px)'),
              rotate: 0
            }}
            exit={{
              scale: 0.7,
              opacity: 0,
              filter: isMobile ? 'none' : 'blur(15px)',
              rotate: -5
            }}
            transition={{ 
              duration: animationPhase >= 4 ? 0.4 : 0.5,
              ease: "easeOut"
            }}
            className="absolute inset-0"
          >
            {/* Banner image or gradient */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <Image 
                src={game.banner} 
                alt={`${game.name} banner`}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-all duration-700"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  // Show gradient fallback
                  if (img.parentElement) {
                    img.parentElement.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)';
                  }
                }}
              />
              {/* Animated gradient overlay */}
              <motion.div 
                className="absolute inset-0"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(0,0,0,0.6) 0%, rgba(99,102,241,0.3) 50%, rgba(0,0,0,0.6) 100%)',
                    'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(139,92,246,0.4) 50%, rgba(0,0,0,0.4) 100%)',
                    'linear-gradient(225deg, rgba(0,0,0,0.6) 0%, rgba(6,182,212,0.3) 50%, rgba(0,0,0,0.6) 100%)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>
            
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 border-4 border-white/20 rounded-3xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Icon - visible in phases 1-2 */}
      <AnimatePresence>
        {animationPhase >= 1 && animationPhase < 3 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: animationPhase >= 2 ? 0.7 : 1, 
              opacity: animationPhase >= 2 ? 0.3 : 1,
              y: animationPhase >= 2 ? -50 : 0
            }}
            exit={{ 
              scale: 0, 
              opacity: 0,
              y: -100
            }}
            transition={{ 
              duration: 0.4,
              ease: "easeOut"
            }}
            className="relative z-20 flex flex-col items-center"
          >
            {/* Icon container */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary to-secondary rounded-3xl 
                            flex items-center justify-center text-6xl md:text-7xl font-bold text-white
                            shadow-2xl shadow-primary/50 relative overflow-hidden">
                {/* Game icon fallback */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  {game.name.charAt(0)}
                </div>
                {/* Actual game icon */}
                <Image 
                  src={game.icon} 
                  alt={game.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover rounded-3xl opacity-0 transition-opacity duration-300"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.opacity = '1';
                    if (img.parentElement) {
                      const fallback = img.parentElement.querySelector('div');
                      if (fallback) fallback.style.opacity = '0';
                    }
                  }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                  }}
                />
              </div>
              
              {/* Multiple pulsing rings */}
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-3xl border-4 border-white/40"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.6, 1],
                  opacity: [0.4, 0, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-3xl border-2 border-white/30"
              />
            </div>
            
            {/* Game name */}
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-white mt-6 text-center"
              animate={{
                opacity: animationPhase >= 2 ? 0 : 1,
                y: animationPhase >= 2 ? -20 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {game.name}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator - visible in phases 1-3 */}
      <AnimatePresence>
        {animationPhase >= 1 && animationPhase < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute bottom-20 text-center z-20"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2.5 h-2.5 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              <span className="text-white/80 text-base md:text-lg font-medium">
                {animationPhase === 1 ? 'Loading...' : 
                 animationPhase === 2 ? 'Preparing...' : 
                 'Almost Ready...'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating particles */}
      {animationPhase >= 1 && animationPhase < 4 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ 
                x: p.startX, 
                y: (typeof window !== 'undefined' ? window.innerHeight : 1080) + 50,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                y: -100,
                opacity: [0, 1, 0],
                scale: [0, p.scale, 0],
                x: p.endX
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeOut"
              }}
              className={`absolute w-1.5 h-1.5 rounded-full ${
                p.id % 3 === 0 ? 'bg-white' : 
                p.id % 3 === 1 ? 'bg-primary' : 'bg-secondary'
              }`}
            />
          ))}
        </div>
      )}

      {/* Energy waves */}
      {animationPhase >= 1 && animationPhase < 3 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-white/10 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [0, 4],
                opacity: [0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 1.0,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Glitch effect for transition */}
      {animationPhase === 2 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Final zoom out overlay */}
      {animationPhase >= 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/20"
        />
      )}
    </motion.div>
  )
}