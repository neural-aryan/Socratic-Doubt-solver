import { create } from 'zustand'

export interface Student {
  id: number
  name: string | null
  email: string
  created_at: string
}

interface AuthState {
  token: string | null
  student: Student | null
  setAuth: (token: string, student: Student) => void
  logout: () => void
}

const storedToken = localStorage.getItem('doubt_solver_token')
const storedStudent = localStorage.getItem('doubt_solver_student')

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken,
  student: storedStudent ? JSON.parse(storedStudent) : null,
  setAuth: (token, student) => {
    localStorage.setItem('doubt_solver_token', token)
    localStorage.setItem('doubt_solver_student', JSON.stringify(student))
    set({ token, student })
  },
  logout: () => {
    localStorage.removeItem('doubt_solver_token')
    localStorage.removeItem('doubt_solver_student')
    set({ token: null, student: null })
  },
}))
