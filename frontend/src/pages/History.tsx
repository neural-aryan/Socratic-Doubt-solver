import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, TrendingUp } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { spacing, typography } from '@/styles/tokens'
import { getProgress, type ProgressResponse } from '@/lib/api'

export const History: React.FC = () => {
  const { colors } = useTheme(); const [data, setData] = useState<ProgressResponse | null>(null); const [error, setError] = useState('')
  useEffect(() => { getProgress().then(setData).catch((e) => setError(e instanceof Error ? e.message : 'Could not load history')) }, [])
  const attempts = data?.recent_attempts || []
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: spacing[4], maxWidth: '1200px', margin: '0 auto' }}>
    <div style={{ marginBottom: spacing[6] }}><h1 style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2] }}>Learning History</h1><p style={{ fontSize: typography.sizes.lg, color: colors.textSecondary }}>Your real solving and practice activity</p></div>
    {error && <div style={{ color: colors.error, marginBottom: spacing[3] }}>{error}</div>}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: spacing[3], marginBottom: spacing[6] }}>
      {[['Completed', data?.summary.total_attempts ?? '—', <CheckCircle size={24} />], ['Practice attempts', data?.summary.total_practice_attempts ?? '—', <Clock size={24} />], ['Practice accuracy', data?.summary.accuracy == null ? '—' : `${data.summary.accuracy}%`, <TrendingUp size={24} />]].map(([label, value, icon]) => <Card key={String(label)} padding={3}><div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}><div style={{ color: colors.accent }}>{icon}</div><div><div style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary }}>{value}</div><div style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{label}</div></div></div></Card>)}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
      {attempts.length === 0 && <Card padding={4}><p style={{ color: colors.textSecondary }}>No solved problems yet. Upload your first solution to start your history.</p></Card>}
      {attempts.map((item) => <Card key={item.id} padding={4}><div style={{ display: 'flex', justifyContent: 'space-between', gap: spacing[3] }}><div><div style={{ display: 'flex', gap: spacing[2], alignItems: 'center', marginBottom: spacing[1] }}><h3 style={{ fontSize: typography.sizes.xl, color: colors.textPrimary }}>Question {item.question_number ?? '—'}</h3><Badge variant="success">Analyzed</Badge></div><p style={{ color: colors.textSecondary, whiteSpace: 'pre-wrap' }}>{item.reconstruction?.slice(0, 280) || 'No transcription available'}{(item.reconstruction?.length || 0) > 280 ? '…' : ''}</p></div><span style={{ fontSize: typography.sizes.sm, color: colors.textMuted, whiteSpace: 'nowrap' }}>{new Date(item.created_at).toLocaleString()}</span></div></Card>)}
    </div>
  </motion.div>
}
