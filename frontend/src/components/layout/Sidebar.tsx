import React from 'react'
import { motion } from 'framer-motion'
import { Home, Lightbulb, History, BookOpen, Dumbbell, User } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { SidebarItem } from './SidebarItem'
import { spacing, typography, borderRadius } from '@/styles/tokens'

export const Sidebar: React.FC = () => {
  const { colors } = useTheme()

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{
        width: '280px',
        height: '100vh',
        background: colors.sidebarBg,
        borderRight: `1px solid ${colors.sidebarBorder}`,
        display: 'flex',
        flexDirection: 'column',
        padding: spacing[3],
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          padding: spacing[2],
          marginBottom: spacing[4],
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
            borderRadius: borderRadius.md,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
          }}
        >
          💡
        </div>
        <div>
          <div
            style={{
              fontSize: typography.sizes.xl,
              fontWeight: typography.weights.bold,
              color: colors.textPrimary,
              lineHeight: 1.2,
            }}
          >
            Doubt Solver
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <SidebarItem to="/home" icon={<Home />} label="Home" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SidebarItem to="/solve/upload" icon={<Lightbulb />} label="Solve" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <SidebarItem to="/history" icon={<History />} label="History" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SidebarItem to="/concepts" icon={<BookOpen />} label="Concepts" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <SidebarItem to="/practice" icon={<Dumbbell />} label="Practice" />
        </motion.div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Profile at bottom */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SidebarItem to="/profile" icon={<User />} label="Profile" />
        </motion.div>
      </nav>
    </motion.aside>
  )
}
