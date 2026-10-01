import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/state/authStore'

export const ProtectedRoute: React.FC = () => {
  const token = useAuthStore((s) => s.token)
  const location = useLocation()
  return token ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />
}
