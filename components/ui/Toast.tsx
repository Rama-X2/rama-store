'use client'

import { motion } from 'framer-motion'
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react'

interface ToastProps {
  title: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  onClose: () => void
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
}

const colors = {
  success: 'bg-green-500/10 border-green-500/30 text-green-400',
  error: 'bg-red-500/10 border-red-500/30 text-red-400',
  info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
}

export default function Toast({ title, message, type, onClose }: ToastProps) {
  const Icon = icons[type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      className={`
        relative overflow-hidden rounded-lg border backdrop-blur-md
        min-w-[320px] max-w-md p-4 shadow-lg
        ${colors[type]}
      `}
    >
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-sm opacity-90 mt-1">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-current opacity-60"
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: 'linear' }}
      />
    </motion.div>
  )
}
