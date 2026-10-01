import React from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, Sun, Moon, LogOut } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Input } from '@/components/ui/Input'
import { IconButton } from '@/components/ui/IconButton'
import { Avatar } from '@/components/ui/Avatar'
import { spacing } from '@/styles/tokens'
import { useAuthStore } from '@/state/authStore'
import { useNavigate } from 'react-router-dom'

export const TopBar: React.FC = () => {
  const { colors, theme, toggleTheme } = useTheme(); const student = useAuthStore((s) => s.student); const logout = useAuthStore((s) => s.logout); const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/login', { replace: true }) }
  return <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 20 }} style={{ height: '72px', padding: `0 ${spacing[4]}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${colors.border}`, background: colors.background, position: 'sticky', top: 0, zIndex: 50 }}>
    <div style={{ flex: 1, maxWidth: '600px' }}><Input type="text" placeholder="Search for concepts, problems, or topics..." icon={<Search size={20} />} fullWidth /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}><IconButton onClick={toggleTheme}>{theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}</IconButton><IconButton><Bell size={20} /></IconButton><Avatar name={student?.name || student?.email || 'Student'} size="md" /><IconButton onClick={handleLogout} aria-label="Sign out"><LogOut size={20} /></IconButton></div>
  </motion.div>
}
