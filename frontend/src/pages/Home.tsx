import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, TrendingUp, Target, Brain } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { spacing, typography } from '@/styles/tokens'
import { getProgress, type ProgressResponse } from '@/lib/api'
import { useAuthStore } from '@/state/authStore'
import { useEffect, useState } from 'react'

export const Home: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const student = useAuthStore((s) => s.student)
  const [progress, setProgress] = useState<ProgressResponse | null>(null)
  useEffect(() => { getProgress().then(setProgress).catch(() => {}) }, [])

  const recentProblems = [
    {
      id: '1',
      title: 'Quadratic Equations Problem',
      subject: 'Mathematics',
      progress: 75,
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      title: 'Photosynthesis Explanation',
      subject: 'Biology',
      progress: 100,
      timestamp: 'Yesterday',
    },
  ]

  const stats = [
    { label: 'Problems Solved', value: String(progress?.summary.total_attempts ?? '—'), icon: <Target size={24} />, color: colors.accent },
    { label: 'Practice Attempts', value: String(progress?.summary.total_practice_attempts ?? '—'), icon: <Zap size={24} />, color: colors.success },
    { label: 'Weak Areas', value: String(progress?.summary.weak_concepts.length ?? '—'), icon: <Brain size={24} />, color: colors.info },
    { label: 'Practice Accuracy', value: progress?.summary.accuracy == null ? '—' : `${progress.summary.accuracy}%`, icon: <TrendingUp size={24} />, color: colors.warning },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        padding: spacing[4],
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} style={{ marginBottom: spacing[6] }}>
        <h1
          style={{
            fontSize: typography.sizes['4xl'],
            fontWeight: typography.weights.bold,
            color: colors.textPrimary,
            marginBottom: spacing[2],
          }}
        >
          Welcome back, {student?.name || 'Learner'}! 👋
        </h1>
        <p
          style={{
            fontSize: typography.sizes.lg,
            color: colors.textSecondary,
            marginBottom: spacing[4],
          }}
        >
          Ready to solve some doubts and level up your learning?
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/solve/upload')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: spacing[2] }}
        >
          Start Solving <ArrowRight size={20} />
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: spacing[3],
          marginBottom: spacing[6],
        }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card padding={3}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: `${stat.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: typography.sizes['3xl'],
                      fontWeight: typography.weights.bold,
                      color: colors.textPrimary,
                      lineHeight: 1,
                      marginBottom: spacing[1],
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: typography.sizes.sm,
                      color: colors.textSecondary,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <h2
          style={{
            fontSize: typography.sizes['2xl'],
            fontWeight: typography.weights.bold,
            color: colors.textPrimary,
            marginBottom: spacing[3],
          }}
        >
          Continue Learning
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          {recentProblems.map((problem) => (
            <motion.div
              key={problem.id}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Card hoverable padding={4} onClick={() => navigate('/solve/discuss')}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: spacing[3],
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: typography.sizes.xl,
                        fontWeight: typography.weights.semibold,
                        color: colors.textPrimary,
                        marginBottom: spacing[1],
                      }}
                    >
                      {problem.title}
                    </h3>
                    <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
                      <Badge variant="accent">{problem.subject}</Badge>
                      <span
                        style={{
                          fontSize: typography.sizes.sm,
                          color: colors.textMuted,
                        }}
                      >
                        {problem.timestamp}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={20} color={colors.textSecondary} />
                </div>
                <div>
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
                      Progress
                    </span>
                    <span
                      style={{
                        fontSize: typography.sizes.sm,
                        color: colors.accent,
                        fontWeight: typography.weights.semibold,
                      }}
                    >
                      {problem.progress}%
                    </span>
                  </div>
                  <ProgressBar progress={problem.progress} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} style={{ marginTop: spacing[6] }}>
        <h2
          style={{
            fontSize: typography.sizes['2xl'],
            fontWeight: typography.weights.bold,
            color: colors.textPrimary,
            marginBottom: spacing[3],
          }}
        >
          Quick Actions
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: spacing[3],
          }}
        >
          {[
            { label: 'Browse Concepts', path: '/concepts', emoji: '📚' },
            { label: 'Practice Questions', path: '/practice', emoji: '💪' },
            { label: 'View History', path: '/history', emoji: '📊' },
          ].map((action) => (
            <motion.div
              key={action.label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                hoverable
                padding={3}
                onClick={() => navigate(action.path)}
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
                  <div style={{ fontSize: '40px' }}>{action.emoji}</div>
                  <div
                    style={{
                      fontSize: typography.sizes.base,
                      fontWeight: typography.weights.semibold,
                      color: colors.textPrimary,
                    }}
                  >
                    {action.label}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
