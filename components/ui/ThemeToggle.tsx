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
    <div className="flex items-center space-x-1 bg-dark-light/50 rounded-full p-1 backdrop-blur-sm">
      {themes.map(({ id, name, icon: Icon }) => (
        <motion.button
          key={id}
          onClick={() => setTheme(id)}
          className={`p-2 rounded-full transition-all duration-300 ${
            theme === id
              ? 'bg-primary text-white shadow-glow'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={`${name} Mode`}
        >
          <Icon className="w-4 h-4" />
        </motion.button>
      ))}
    </div>
  )
}
