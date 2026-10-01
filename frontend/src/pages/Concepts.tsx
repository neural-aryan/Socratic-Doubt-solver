import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, CheckCircle, Lock } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { spacing, typography, borderRadius } from '@/styles/tokens'

export const Concepts: React.FC = () => {
  const { colors } = useTheme()

  const concepts = [
    {
      id: '1',
      title: 'Quadratic Equations',
      category: 'Algebra',
      progress: 85,
      topicsCount: 12,
      completedTopics: 10,
      color: colors.accent,
      icon: '📐',
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'Trigonometry',
      category: 'Mathematics',
      progress: 60,
      topicsCount: 15,
      completedTopics: 9,
      color: colors.info,
      icon: '📊',
      status: 'in-progress',
    },
    {
      id: '3',
      title: 'Chemical Reactions',
      category: 'Chemistry',
      progress: 100,
      topicsCount: 8,
      completedTopics: 8,
      color: colors.success,
      icon: '🧪',
      status: 'completed',
    },
    {
      id: '4',
      title: 'Newton\'s Laws',
      category: 'Physics',
      progress: 45,
      topicsCount: 10,
      completedTopics: 4,
      color: colors.warning,
      icon: '⚡',
      status: 'in-progress',
    },
    {
      id: '5',
      title: 'Cell Biology',
      category: 'Biology',
      progress: 0,
      topicsCount: 20,
      completedTopics: 0,
      color: colors.textMuted,
      icon: '🔬',
      status: 'locked',
    },
    {
      id: '6',
      title: 'Literary Analysis',
      category: 'Literature',
      progress: 30,
      topicsCount: 12,
      completedTopics: 3,
      color: colors.info,
      icon: '📚',
      status: 'in-progress',
    },
  ]

  const categories = Array.from(new Set(concepts.map(c => c.category)))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        padding: spacing[4],
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ marginBottom: spacing[6] }}
      >
        <h1
          style={{
            fontSize: typography.sizes['4xl'],
            fontWeight: typography.weights.bold,
            color: colors.textPrimary,
            marginBottom: spacing[2],
          }}
        >
          Concepts Library
        </h1>
        <p
          style={{
            fontSize: typography.sizes.lg,
            color: colors.textSecondary,
          }}
        >
          Master key concepts across all subjects
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'flex',
          gap: spacing[2],
          marginBottom: spacing[4],
          flexWrap: 'wrap',
        }}
      >
        <Badge variant="accent">All</Badge>
        {categories.map((category) => (
          <Badge key={category}>{category}</Badge>
        ))}
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ marginBottom: spacing[6] }}
      >
        <Card padding={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[3] }}>
            <div>
              <h2
                style={{
                  fontSize: typography.sizes.xl,
                  fontWeight: typography.weights.semibold,
                  color: colors.textPrimary,
                  marginBottom: spacing[1],
                }}
              >
                Overall Progress
              </h2>
              <p
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.textSecondary,
                }}
              >
                You're making great progress! Keep learning.
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: typography.sizes['3xl'],
                  fontWeight: typography.weights.bold,
                  color: colors.accent,
                }}
              >
                64%
              </div>
              <div
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.textSecondary,
                }}
              >
                Complete
              </div>
            </div>
          </div>
          <ProgressBar progress={64} height="12px" />
        </Card>
      </motion.div>

      {/* Concepts Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: spacing[3],
        }}
      >
        {concepts.map((concept, index) => (
          <motion.div
            key={concept.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={concept.status !== 'locked' ? { y: -8 } : {}}
          >
            <Card
              hoverable={concept.status !== 'locked'}
              padding={4}
              style={{
                position: 'relative',
                opacity: concept.status === 'locked' ? 0.6 : 1,
              }}
            >
              {/* Status Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: spacing[3],
                  right: spacing[3],
                }}
              >
                {concept.status === 'completed' && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: `${colors.success}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.success,
                    }}
                  >
                    <CheckCircle size={20} />
                  </div>
                )}
                {concept.status === 'locked' && (
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: colors.surface,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.textMuted,
                    }}
                  >
                    <Lock size={20} />
                  </div>
                )}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: borderRadius.lg,
                  background: `${concept.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: spacing[3],
                }}
              >
                {concept.icon}
              </div>

              {/* Title and Category */}
              <h3
                style={{
                  fontSize: typography.sizes.xl,
                  fontWeight: typography.weights.semibold,
                  color: colors.textPrimary,
                  marginBottom: spacing[1],
                }}
              >
                {concept.title}
              </h3>
              <Badge variant="default" style={{ marginBottom: spacing[3] }}>
                {concept.category}
              </Badge>

              {/* Progress */}
              <div style={{ marginBottom: spacing[2] }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: spacing[1],
                  }}
                >
                  <span
                    style={{
                      fontSize: typography.sizes.sm,
                      color: colors.textSecondary,
                    }}
                  >
                    {concept.completedTopics} / {concept.topicsCount} topics
                  </span>
                  <span
                    style={{
                      fontSize: typography.sizes.sm,
                      color: concept.color,
                      fontWeight: typography.weights.semibold,
                    }}
                  >
                    {concept.progress}%
                  </span>
                </div>
                <ProgressBar progress={concept.progress} height="6px" />
              </div>

              {/* Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[1],
                  marginTop: spacing[3],
                  color: concept.status === 'locked' ? colors.textMuted : concept.color,
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.medium,
                }}
              >
                {concept.status === 'locked' ? (
                  <>
                    <Lock size={16} />
                    <span>Complete previous concepts</span>
                  </>
                ) : concept.status === 'completed' ? (
                  <>
                    <CheckCircle size={16} />
                    <span>Review</span>
                  </>
                ) : (
                  <>
                    <BookOpen size={16} />
                    <span>Continue Learning</span>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
