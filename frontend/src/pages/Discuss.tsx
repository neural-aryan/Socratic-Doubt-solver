import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Lightbulb } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { useDoubtStore } from '@/state/doubtStore'

export const Discuss: React.FC = () => {
  const { colors } = useTheme()
  const [inputValue, setInputValue] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const messages = useDoubtStore((s) => s.messages)
  const chatSending = useDoubtStore((s) => s.chatSending)
  const sendMessage = useDoubtStore((s) => s.sendMessage)
  const reconstruction = useDoubtStore((s) => s.reconstruction)
  const diagnosis = useDoubtStore((s) => s.diagnosis)
  const sessionId = useDoubtStore((s) => s.sessionId)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, chatSending])

  const handleSend = () => {
    if (!inputValue.trim() || chatSending) return
    sendMessage(inputValue)
    setInputValue('')
  }

  const hints = ['I think I see the mistake, is it...', 'Can you give me a hint?', 'Just show me the correct answer']

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 72px)',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: spacing[4],
        gap: spacing[4],
      }}
    >
      {/* Chat Area */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Card padding={0} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: spacing[3], borderBottom: `1px solid ${colors.border}`, background: colors.surface }}>
            <h2 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>
              Discussion with AI Tutor
            </h2>
            <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, marginTop: spacing[1] }}>
              {sessionId === null ? 'No active session -- upload a solution first.' : 'Ask questions and get step-by-step guidance'}
            </p>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: spacing[4], display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{ display: 'flex', justifyContent: message.role === 'student' ? 'flex-end' : 'flex-start' }}
                >
                  <div
                    style={{
                      maxWidth: '70%',
                      padding: spacing[3],
                      borderRadius: borderRadius.lg,
                      background: message.role === 'tutor' ? colors.surface : `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`,
                      color: message.role === 'tutor' ? colors.textPrimary : '#FFFFFF',
                      border: message.role === 'tutor' ? `1px solid ${colors.border}` : 'none',
                    }}
                  >
                    {message.role === 'tutor' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[1], marginBottom: spacing[1], fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.accent }}>
                        <Lightbulb size={16} />
                        <span>AI Tutor</span>
                      </div>
                    )}
                    <p style={{ fontSize: typography.sizes.base, lineHeight: 1.6 }}>{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {chatSending && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ padding: spacing[3], borderRadius: borderRadius.lg, background: colors.surface, border: `1px solid ${colors.border}`, color: colors.textSecondary, fontSize: typography.sizes.sm }}>
                    Thinking…
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          <div style={{ padding: spacing[3], borderTop: `1px solid ${colors.border}`, background: colors.surface }}>
            <div style={{ display: 'flex', gap: spacing[2] }}>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your answer or question..."
                fullWidth
                disabled={chatSending || sessionId === null}
              />
              <Button onClick={handleSend} disabled={chatSending || sessionId === null} style={{ flexShrink: 0 }}>
                <Send size={20} />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Sidebar */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
        <Card padding={3}>
          <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[2] }}>
            Your Solution
          </h3>
          <p
            style={{
              fontSize: typography.sizes.sm,
              color: colors.textSecondary,
              padding: spacing[2],
              background: colors.surface,
              borderRadius: borderRadius.md,
              whiteSpace: 'pre-wrap',
              maxHeight: 160,
              overflowY: 'auto',
            }}
          >
            {reconstruction ? reconstruction.slice(0, 300) + (reconstruction.length > 300 ? '…' : '') : 'No solution loaded.'}
          </p>
        </Card>

        {diagnosis?.misconception && (
          <Card padding={3}>
            <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[2] }}>
              What to look for
            </h3>
            <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{diagnosis.misconception}</p>
          </Card>
        )}

        <Card padding={3}>
          <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[2] }}>
            Try saying...
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            {hints.map((hint) => (
              <motion.button
                key={hint}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => sendMessage(hint)}
                disabled={chatSending || sessionId === null}
                style={{
                  padding: spacing[2],
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: borderRadius.md,
                  color: colors.textPrimary,
                  fontSize: typography.sizes.sm,
                  cursor: chatSending || sessionId === null ? 'not-allowed' : 'pointer',
                  textAlign: 'left',
                  opacity: chatSending || sessionId === null ? 0.5 : 1,
                }}
              >
                💡 {hint}
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
