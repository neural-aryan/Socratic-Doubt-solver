import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { spacing, typography, borderRadius } from '@/styles/tokens'

interface SidebarItemProps {
  to: string
  icon: React.ReactNode
  label: string
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label }) => {
  const { colors } = useTheme()

  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            padding: `${spacing[2]} ${spacing[3]}`,
            borderRadius: borderRadius.md,
            background: isActive ? colors.accentLight : 'transparent',
            color: isActive ? colors.accent : colors.textSecondary,
            fontSize: typography.sizes.base,
            fontWeight: isActive ? typography.weights.semibold : typography.weights.medium,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
          }}
        >
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '60%',
                background: colors.accent,
                borderRadius: '0 2px 2px 0',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
            {icon}
          </div>
          <span>{label}</span>
        </motion.div>
      )}
    </NavLink>
  )
}
