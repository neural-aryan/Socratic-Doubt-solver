import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Trophy, Target, TrendingUp, ArrowRight, Home as HomeIcon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { spacing, typography } from '@/styles/tokens'

export const Review: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()

  const stats = {
    score: 85,
    questionsAnswered: 3,
    correctAnswers: 2,
    timeSpent: '12 minutes',
  }

  const achievements = [
    { icon: <Trophy size={32} />, label: 'Problem Solver', color: colors.accent },
    { icon: <Target size={32} />, label: 'Quick Learner', color: colors.success },
    { icon: <TrendingUp size={32} />, label: 'Consistent', color: colors.info },
  ]

  const nextSteps = [
    { label: 'Practice More', path: '/practice', emoji: '💪' },
    { label: 'Explore Concepts', path: '/concepts', emoji: '📚' },
    { label: 'Solve New Problem', path: '/solve/upload', emoji: '🎯' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: spacing[4],
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      {/* Celebration Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        style={{
          textAlign: 'center',
          marginBottom: spacing[6],
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          style={{
            fontSize: '80px',
            marginBottom: spacing[3],
          }}
        >
          🎉
        </motion.div>
        <h1
          style={{
            fontSize: typography.sizes['4xl'],
            fontWeight: typography.weights.bold,
            color: colors.textPrimary,
            marginBottom: spacing[2],
          }}
        >
          Great Job!
        </h1>
        <p
          style={{
            fontSize: typography.sizes.lg,
            color: colors.textSecondary,
          }}
        >
          You've completed your learning journey for this problem
        </p>
      </motion.div>

      {/* Score Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ marginBottom: spacing[4] }}
      >
        <Card padding={5}>
          <div style={{ textAlign: 'center', marginBottom: spacing[4] }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
              style={{
                width: '120px',
                height: '120px',
                margin: '0 auto',
                borderRadius: '50%',
                background: `conic-gradient(${colors.accent} ${stats.score}%, ${colors.surface} ${stats.score}%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing[3],
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: colors.cardBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: typography.sizes['3xl'],
                    fontWeight: typography.weights.bold,
                    color: colors.accent,
                  }}
                >
                  {stats.score}%
                </div>
              </div>
            </motion.div>
            <h2
              style={{
                fontSize: typography.sizes['2xl'],
                fontWeight: typography.weights.semibold,
                color: colors.textPrimary,
              }}
            >
              Your Score
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: spacing[3],
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: typography.sizes['2xl'],
                  fontWeight: typography.weights.bold,
                  color: colors.textPrimary,
                }}
              >
                {stats.questionsAnswered}
              </div>
              <div
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.textSecondary,
                }}
              >
                Questions
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: typography.sizes['2xl'],
                  fontWeight: typography.weights.bold,
                  color: colors.success,
                }}
              >
                {stats.correctAnswers}
              </div>
              <div
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.textSecondary,
                }}
              >
                Correct
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: typography.sizes['2xl'],
                  fontWeight: typography.weights.bold,
                  color: colors.info,
                }}
              >
                {stats.timeSpent}
              </div>
              <div
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.textSecondary,
                }}
              >
                Time Spent
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ marginBottom: spacing[4] }}
      >
        <h2
          style={{
            fontSize: typography.sizes['2xl'],
            fontWeight: typography.weights.bold,
            color: colors.textPrimary,
            marginBottom: spacing[3],
          }}
        >
          Achievements Unlocked 🏆
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: spacing[3],
          }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                delay: 0.6 + index * 0.1,
              }}
            >
              <Card padding={3}>
                <div
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: spacing[2],
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: `${achievement.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: achievement.color,
                    }}
                  >
                    {achievement.icon}
                  </div>
                  <div
                    style={{
                      fontSize: typography.sizes.base,
                      fontWeight: typography.weights.semibold,
                      color: colors.textPrimary,
                    }}
                  >
                    {achievement.label}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2
          style={{
            fontSize: typography.sizes['2xl'],
            fontWeight: typography.weights.bold,
            color: colors.textPrimary,
            marginBottom: spacing[3],
          }}
        >
          What's Next?
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: spacing[3],
            marginBottom: spacing[4],
          }}
        >
          {nextSteps.map((step) => (
            <motion.div
              key={step.label}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Card
                hoverable
                padding={3}
                onClick={() => navigate(step.path)}
              >
                <div
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: spacing[2],
                  }}
                >
                  <div style={{ fontSize: '40px' }}>{step.emoji}</div>
                  <div
                    style={{
                      fontSize: typography.sizes.base,
                      fontWeight: typography.weights.semibold,
                      color: colors.textPrimary,
                    }}
                  >
                    {step.label}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: spacing[3], justifyContent: 'center' }}>
          <Button size="lg" onClick={() => navigate('/home')}>
            <HomeIcon size={20} /> Back to Home
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/solve/upload')}>
            Solve Another <ArrowRight size={20} />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
