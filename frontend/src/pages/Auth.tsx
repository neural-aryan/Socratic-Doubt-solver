import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LockKeyhole, Mail, UserRound, LogIn } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { spacing, typography } from '@/styles/tokens'
import { login, register } from '@/lib/api'
import { useAuthStore } from '@/state/authStore'

export const Auth: React.FC = () => {
  const { colors } = useTheme(); const navigate = useNavigate(); const location = useLocation(); const setAuth = useAuthStore((s) => s.setAuth)
  const [mode, setMode] = useState<'login' | 'register'>(location.pathname === '/register' ? 'register' : 'login'); const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setError(''); setBusy(true); try { const data = mode === 'login' ? await login(email, password) : await register(name, email, password); setAuth(data.access_token, data.student); navigate('/home', { replace: true }) } catch (err) { setError(err instanceof Error ? err.message : 'Authentication failed') } finally { setBusy(false) } }
  return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: spacing[4], background: colors.background }}>
    <Card padding={6} style={{ width: '100%', maxWidth: 440 }}>
      <div style={{ textAlign: 'center', marginBottom: spacing[5] }}><div style={{ fontSize: 48 }}>💡</div><h1 style={{ fontSize: typography.sizes['3xl'], color: colors.textPrimary, marginBottom: spacing[1] }}>Doubt Solver</h1><p style={{ color: colors.textSecondary }}>{mode === 'login' ? 'Sign in to continue learning' : 'Create your learning account'}</p></div>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
        {mode === 'register' && <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" icon={<UserRound size={18} />} required />}
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" icon={<Mail size={18} />} required />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (8+ characters)" icon={<LockKeyhole size={18} />} minLength={8} required />
        {error && <div style={{ color: colors.error, fontSize: typography.sizes.sm }}>{error}</div>}
        <Button type="submit" fullWidth size="lg" disabled={busy}>{busy ? 'Please wait…' : <><LogIn size={18} /> {mode === 'login' ? 'Sign in' : 'Create account'}</>}</Button>
      </form>
      <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }} style={{ width: '100%', marginTop: spacing[3], background: 'none', border: 0, color: colors.accent, cursor: 'pointer' }}>{mode === 'login' ? 'New here? Create an account' : 'Already have an account? Sign in'}</button>
    </Card>
  </div>
}
