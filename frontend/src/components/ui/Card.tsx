import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { spacing, borderRadius, shadows } from '@/styles/tokens'

interface CardProps {
  children: React.ReactNode
  hoverable?: boolean
  padding?: keyof typeof spacing
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  padding = 3,
  className = '',
  style,
  onClick,
}) => {
  const { colors } = useTheme()

  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.02, y: -4 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: borderRadius.lg,
        padding: spacing[padding],
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: hoverable ? shadows.md : shadows.sm,
        ...style,
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
