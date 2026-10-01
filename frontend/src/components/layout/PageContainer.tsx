import React from 'react'
import { useTheme } from '@/hooks/useTheme'

interface PageContainerProps {
  children: React.ReactNode
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const { colors } = useTheme()

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 72px)',
        background: colors.background,
        position: 'relative',
      }}
    >
      <div className="pixelated-gradient" />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
