import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lightbulb, BookOpen, MessageCircle, CheckCircle2, AlertTriangle, Target } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { useDoubtStore } from '@/state/doubtStore'

export const Understanding: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()

  const reconstruction = useDoubtStore((s) => s.reconstruction)
  const diagnosis = useDoubtStore((s) => s.diagnosis)
  const understood = useDoubtStore((s) => s.understood)
  const previews = useDoubtStore((s) => s.previews)

  const hasError = !!diagnosis?.error
  const noMistakeFound = !hasError && diagnosis && (diagnosis.first_error === null || diagnosis.first_error === undefined)
  const hasMistake = !hasError && diagnosis && diagnosis.first_error !== null && diagnosis.first_error !== undefined

  const nextSteps = understood
    ? [
        { icon: <Target size={32} />, title: 'Practice Similar Questions', description: 'Reinforce what you got right', path: '/solve/practice', color: colors.accent },
        { icon: <Lightbulb size={32} />, title: 'Related Concepts', description: 'Learn more about this topic', path: '/concepts', color: colors.success },
      ]
    : [
        { icon: <MessageCircle size={32} />, title: 'Discuss with Tutor', description: 'Get step-by-step guidance', path: '/solve/discuss', color: colors.accent },
        { icon: <Lightbulb size={32} />, title: 'Related Concepts', description: 'Learn more about this topic', path: '/concepts', color: colors.success },
      ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: spacing[4], maxWidth: '1000px', margin: '0 auto' }}
    >
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: spacing[5] }}>
        <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2] }}>
          Understanding the Problem
        </h1>
        <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary }}>
          Here's what our AI found in your uploaded solution.
        </p>
      </motion.div>

      {/* Transcription */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }} style={{ marginBottom: spacing[4] }}>
        <Card padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing[3] }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[2] }}>
                Your Solution
              </h3>
              <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {reconstruction ? reconstruction.slice(0, 400) + (reconstruction.length > 400 ? '…' : '') : 'No transcription available.'}
              </p>
            </div>
            {previews[0] && (
              <img
                src={previews[0]}
                alt="Uploaded question"
                style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: borderRadius.md, border: `1px solid ${colors.border}`, flexShrink: 0 }}
              />
            )}
          </div>
        </Card>
      </motion.div>

      {/* Diagnosis */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} style={{ marginBottom: spacing[5], display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
        {hasError && (
          <Card padding={4}>
            <div style={{ display: 'flex', gap: spacing[3], alignItems: 'flex-start' }}>
              <AlertTriangle color={colors.warning} />
              <div>
                <h3 style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[1] }}>
                  Couldn't verify automatically
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>
                  The AI verifier didn't return a readable result. You can still discuss the solution below, or try re-uploading a clearer photo.
                </p>
              </div>
            </div>
          </Card>
        )}

        {noMistakeFound && (
          <Card padding={4}>
            <div style={{ display: 'flex', gap: spacing[3], alignItems: 'flex-start' }}>
              <CheckCircle2 color={colors.success} />
              <div>
                <h3 style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[1] }}>
                  Looks correct!
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>
                  We didn't find a mathematical error in your working. Nice work — head to practice to reinforce this concept.
                </p>
              </div>
            </div>
          </Card>
        )}

        {hasMistake && (
          <>
            <Card padding={4}>
              <div style={{ display: 'flex', gap: spacing[3], alignItems: 'flex-start' }}>
                <Target color={colors.accent} />
                <div>
                  <h3 style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[1] }}>
                    Where the mistake happened
                  </h3>
                  <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{diagnosis?.student_step || 'Not specified'}</p>
                </div>
              </div>
            </Card>
            <Card padding={4}>
              <div style={{ display: 'flex', gap: spacing[3], alignItems: 'flex-start' }}>
                <BookOpen color={colors.info} />
                <div>
                  <h3 style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[1] }}>
                    What it should follow from
                  </h3>
                  <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{diagnosis?.previous_step || 'Not specified'}</p>
                </div>
              </div>
            </Card>
            <Card padding={4}>
              <div style={{ display: 'flex', gap: spacing[3], alignItems: 'flex-start' }}>
                <Lightbulb color={colors.success} />
                <div>
                  <h3 style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[1] }}>
                    Why it's incorrect
                  </h3>
                  <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{diagnosis?.why || 'Not specified'}</p>
                </div>
              </div>
            </Card>
          </>
        )}

        {!diagnosis && !hasError && (
          <Card padding={4}>
            <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>
              No diagnosis available yet — try uploading your solution again.
            </p>
          </Card>
        )}
      </motion.div>

      {/* Next steps */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: spacing[3] }}
      >
        {nextSteps.map((step, index) => (
          <motion.div key={step.title} whileHover={{ y: -4 }} transition={{ delay: 0.1 * index }}>
            <Card hoverable padding={4} onClick={() => navigate(step.path)}>
              <div style={{ color: step.color, marginBottom: spacing[2] }}>{step.icon}</div>
              <h3 style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[1] }}>
                {step.title}
              </h3>
              <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{step.description}</p>
              <div style={{ marginTop: spacing[2], display: 'flex', alignItems: 'center', gap: spacing[1], color: step.color, fontSize: typography.sizes.sm }}>
                Continue <ArrowRight size={16} />
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
