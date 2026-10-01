import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle, BookOpen, MessageCircle, Target } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { spacing, typography, borderRadius } from '@/styles/tokens'

export const LearningJourney: React.FC = () => {
  const { colors } = useTheme()

  const journeySteps = [
    {
      id: '1',
      date: 'Today',
      title: 'Quadratic Equations Mastered',
      description: 'Completed all practice questions with 85% score',
      type: 'concept',
      icon: <BookOpen size={24} />,
      completed: true,
      color: colors.accent,
    },
    {
      id: '2',
      date: 'Yesterday',
      title: 'Discussion Session',
      description: 'Had an in-depth discussion about factorization methods',
      type: 'discussion',
      icon: <MessageCircle size={24} />,
      completed: true,
      color: colors.info,
    },
    {
      id: '3',
      date: '2 days ago',
      title: 'Practice Challenge',
      description: 'Solved 15 trigonometry problems in a row',
      type: 'practice',
      icon: <Target size={24} />,
      completed: true,
      color: colors.success,
    },
    {
      id: '4',
      date: '3 days ago',
      title: 'Started Algebra Advanced',
      description: 'Began learning advanced algebraic concepts',
      type: 'concept',
      icon: <BookOpen size={24} />,
      completed: true,
      color: colors.warning,
    },
    {
      id: '5',
      date: '5 days ago',
      title: 'Chemistry Lab Completed',
      description: 'Understood chemical bonding through interactive examples',
      type: 'concept',
      icon: <BookOpen size={24} />,
      completed: true,
      color: colors.accent,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        padding: spacing[4],
        maxWidth: '1000px',
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
          Your Learning Journey 🗺️
        </h1>
        <p
          style={{
            fontSize: typography.sizes.lg,
            color: colors.textSecondary,
          }}
        >
          Track your progress and see how far you've come
        </p>
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: spacing[6] }}
      >
        <Card padding={4}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: spacing[4],
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: typography.sizes['3xl'],
                  fontWeight: typography.weights.bold,
                  color: colors.accent,
                }}
              >
                24
              </div>
              <div
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.textSecondary,
                }}
              >
                Total Activities
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: typography.sizes['3xl'],
                  fontWeight: typography.weights.bold,
                  color: colors.success,
                }}
              >
                7
              </div>
              <div
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.textSecondary,
                }}
              >
                Day Streak
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: typography.sizes['3xl'],
                  fontWeight: typography.weights.bold,
                  color: colors.info,
                }}
              >
                48
              </div>
              <div
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.textSecondary,
                }}
              >
                Hours Learned
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ position: 'relative' }}
      >
        {/* Timeline Line */}
        <div
          style={{
            position: 'absolute',
            left: '24px',
            top: '40px',
            bottom: '40px',
            width: '2px',
            background: colors.border,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              style={{ position: 'relative', paddingLeft: spacing[6] }}
            >
              {/* Timeline Node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '24px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: step.color,
                  border: `4px solid ${colors.background}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                {step.completed && (
                  <CheckCircle size={12} color="#FFFFFF" strokeWidth={3} />
                )}
              </motion.div>

              <Card padding={4} hoverable>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing[2] }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: borderRadius.md,
                        background: `${step.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: step.color,
                      }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: typography.sizes.lg,
                          fontWeight: typography.weights.semibold,
                          color: colors.textPrimary,
                          marginBottom: spacing[1],
                        }}
                      >
                        {step.title}
                      </h3>
                      <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
                        <Badge variant="default">{step.type}</Badge>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: spacing[1],
                            fontSize: typography.sizes.sm,
                            color: colors.textMuted,
                          }}
                        >
                          <Calendar size={14} />
                          <span>{step.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: typography.sizes.base,
                    color: colors.textSecondary,
                    marginLeft: '64px',
                  }}
                >
                  {step.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Milestone Card */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        style={{ marginTop: spacing[6] }}
      >
        <Card padding={5}>
          <div style={{ textAlign: 'center' }}>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              style={{ fontSize: '64px', marginBottom: spacing[3] }}
            >
              🎯
            </motion.div>
            <h2
              style={{
                fontSize: typography.sizes['2xl'],
                fontWeight: typography.weights.bold,
                color: colors.textPrimary,
                marginBottom: spacing[2],
              }}
            >
              Next Milestone: 50 Problems Solved!
            </h2>
            <p
              style={{
                fontSize: typography.sizes.base,
                color: colors.textSecondary,
                marginBottom: spacing[3],
              }}
            >
              You're 26 problems away from your next achievement
            </p>
            <div
              style={{
                height: '12px',
                background: colors.surface,
                borderRadius: borderRadius.full,
                overflow: 'hidden',
                maxWidth: '400px',
                margin: '0 auto',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '48%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`,
                }}
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
