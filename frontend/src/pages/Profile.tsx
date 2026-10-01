import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, Award, TrendingUp, Edit, MapPin } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { spacing, typography, borderRadius } from '@/styles/tokens'

export const Profile: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()

  const userStats = [
    { label: 'Problems Solved', value: '24', icon: <TrendingUp size={20} /> },
    { label: 'Learning Streak', value: '7 days', icon: <Calendar size={20} /> },
    { label: 'Achievements', value: '12', icon: <Award size={20} /> },
    { label: 'Study Time', value: '48 hrs', icon: <Calendar size={20} /> },
  ]

  const achievements = [
    { title: 'Early Bird', description: 'Solved 5 problems in a week', icon: '🐦', earned: true },
    { title: 'Math Wizard', description: 'Completed 10 math problems', icon: '🧙‍♂️', earned: true },
    { title: 'Quick Learner', description: 'Scored 90% or above 5 times', icon: '⚡', earned: true },
    { title: 'Consistent', description: '7-day learning streak', icon: '🔥', earned: true },
    { title: 'Explorer', description: 'Try 5 different subjects', icon: '🗺️', earned: false },
    { title: 'Master', description: 'Complete all topics in a subject', icon: '👑', earned: false },
  ]

  const recentActivity = [
    { title: 'Completed Quadratic Equations', time: '2 hours ago', type: 'completion' },
    { title: 'Started Trigonometry', time: 'Yesterday', type: 'start' },
    { title: 'Earned "Math Wizard" badge', time: '2 days ago', type: 'achievement' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        padding: spacing[4],
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Profile Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ marginBottom: spacing[6] }}
      >
        <Card padding={5}>
          <div style={{ display: 'flex', gap: spacing[4], alignItems: 'flex-start' }}>
            <Avatar name="Student User" size="xl" />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing[2] }}>
                <div>
                  <h1
                    style={{
                      fontSize: typography.sizes['3xl'],
                      fontWeight: typography.weights.bold,
                      color: colors.textPrimary,
                      marginBottom: spacing[1],
                    }}
                  >
                    Student User
                  </h1>
                  <p
                    style={{
                      fontSize: typography.sizes.base,
                      color: colors.textSecondary,
                      marginBottom: spacing[2],
                    }}
                  >
                    student@email.com
                  </p>
                  <div style={{ display: 'flex', gap: spacing[2] }}>
                    <Badge variant="accent">Level 5</Badge>
                    <Badge>Mathematics</Badge>
                    <Badge>Science</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit size={16} /> Edit Profile
                </Button>
              </div>
              <p
                style={{
                  fontSize: typography.sizes.base,
                  color: colors.textSecondary,
                  marginTop: spacing[3],
                }}
              >
                🎓 High school student passionate about learning | 📚 Focusing on STEM subjects
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: spacing[3],
          marginBottom: spacing[6],
        }}
      >
        {userStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card padding={3}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: borderRadius.md,
                    background: colors.accentLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.accent,
                  }}
                >
                  {stat.icon}
                </div>
              </div>
              <div
                style={{
                  fontSize: typography.sizes['2xl'],
                  fontWeight: typography.weights.bold,
                  color: colors.textPrimary,
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
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: spacing[4] }}>
        {/* Achievements */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2
            style={{
              fontSize: typography.sizes['2xl'],
              fontWeight: typography.weights.bold,
              color: colors.textPrimary,
              marginBottom: spacing[3],
            }}
          >
            Achievements 🏆
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: spacing[3],
            }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={achievement.earned ? { y: -4 } : {}}
              >
                <Card
                  padding={3}
                  style={{
                    opacity: achievement.earned ? 1 : 0.5,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      fontSize: '40px',
                      marginBottom: spacing[2],
                      filter: achievement.earned ? 'none' : 'grayscale(1)',
                    }}
                  >
                    {achievement.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: typography.sizes.base,
                      fontWeight: typography.weights.semibold,
                      color: colors.textPrimary,
                      marginBottom: spacing[1],
                    }}
                  >
                    {achievement.title}
                  </h3>
                  <p
                    style={{
                      fontSize: typography.sizes.sm,
                      color: colors.textSecondary,
                    }}
                  >
                    {achievement.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2
            style={{
              fontSize: typography.sizes['2xl'],
              fontWeight: typography.weights.bold,
              color: colors.textPrimary,
              marginBottom: spacing[3],
            }}
          >
            Recent Activity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card padding={3}>
                  <div
                    style={{
                      fontSize: typography.sizes.base,
                      color: colors.textPrimary,
                      fontWeight: typography.weights.medium,
                      marginBottom: spacing[1],
                    }}
                  >
                    {activity.title}
                  </div>
                  <div
                    style={{
                      fontSize: typography.sizes.sm,
                      color: colors.textMuted,
                    }}
                  >
                    {activity.time}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Button
            fullWidth
            variant="outline"
            size="lg"
            style={{ marginTop: spacing[3] }}
            onClick={() => navigate('/profile/learning-journey')}
          >
            <MapPin size={20} /> View Learning Journey
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
