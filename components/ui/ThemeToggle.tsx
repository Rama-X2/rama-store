'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'system', name: 'System', icon: Monitor },
  ] as const

  return (
    <div className="flex items-center space-x-0.5 md:space-x-1 bg-dark-light/50 rounded-full p-0.5 md:p-1 backdrop-blur-sm">
      {themes.map(({ id, name, icon: Icon }) => (
        <motion.button
          key={id}
          onClick={() => setTheme(id)}
          className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
            theme === id
              ? 'bg-primary text-white shadow-glow'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          style={{ minHeight: 'auto' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={`${name} Mode`}
        >
          <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </motion.button>
      ))}
    </div>
  )
}
