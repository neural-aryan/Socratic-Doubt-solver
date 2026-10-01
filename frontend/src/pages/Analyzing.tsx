import React from 'react'
import { motion } from 'framer-motion'
import { Loader2, Brain, CheckCircle } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { spacing, typography } from '@/styles/tokens'

// NOTE: the actual POST /api/analysis/solve call is kicked off by Upload.tsx
// right before it navigates here, and Upload.tsx navigates onward once the
// response (or an error) comes back. This page is intentionally just a
// loading animation with no navigation logic of its own -- it doesn't know
// or need to know how long the request takes.

export const Analyzing: React.FC = () => {
  const { colors } = useTheme()

  const steps = [
    { label: 'Uploading images', completed: true },
    { label: 'Transcribing your handwriting', completed: false },
    { label: 'Verifying each step', completed: false },
    { label: 'Preparing feedback', completed: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        padding: spacing[4],
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: spacing[4],
          boxShadow: `0 20px 40px ${colors.shadow}`,
        }}
      >
        <Brain size={60} color="#FFFFFF" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: typography.sizes['3xl'],
          fontWeight: typography.weights.bold,
          color: colors.textPrimary,
          marginBottom: spacing[2],
          textAlign: 'center',
        }}
      >
        Analyzing Your Solution
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: typography.sizes.lg, color: colors.textSecondary, marginBottom: spacing[6], textAlign: 'center' }}
      >
        This calls the real AI backend, so it may take a little longer for multi-page solutions.
      </motion.p>

      <div style={{ width: '100%', maxWidth: '500px' }}>
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[3],
              padding: spacing[3],
              marginBottom: spacing[2],
              background: colors.surface,
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
            }}
          >
            {step.completed ? (
              <CheckCircle size={24} color={colors.success} />
            ) : (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <Loader2 size={24} color={colors.accent} />
              </motion.div>
            )}
            <span
              style={{
                fontSize: typography.sizes.base,
                color: step.completed ? colors.textPrimary : colors.textSecondary,
                fontWeight: step.completed ? typography.weights.medium : typography.weights.normal,
              }}
            >
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
