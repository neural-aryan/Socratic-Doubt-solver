import { useAuthStore } from '@/state/authStore'

export const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000'

export interface Diagnosis { first_error?: number | null; student_step?: string | null; previous_step?: string | null; why?: string | null; misconception?: string | null; confidence?: string | null; error?: string; raw_response?: string }
export interface SolveResponse { session_id: number | null; student_id: number; attempt_id: number; reconstruction: string; diagnosis: Diagnosis | null; first_question: string | null; note?: string; message?: string }
export interface FollowUpResponse { session_id: number; turn_count: number; understood?: boolean; answer_revealed?: boolean; feedback?: string; next_question?: string | null; error?: string; raw_response?: string }
export interface ProgressResponse { student_id: number; summary: { total_attempts: number; total_practice_attempts: number; accuracy: number | null; weak_concepts: string[] }; recent_attempts: Array<{ id: number; question_number: number | null; reconstruction: string | null; created_at: string }>; recent_practice_attempts: Array<{ id: number; question_id: number; is_correct: boolean | null; created_at: string }>; recommended_practice: string[] }

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token
  const headers = new Headers(init.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (init.body && !(init.body instanceof FormData)) headers.set('Content-Type', 'application/json')
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers })
  if (res.status === 401) useAuthStore.getState().logout()
  if (!res.ok) {
    let detail = ''
    try { const body = await res.json(); detail = body.detail || body.message || '' } catch { detail = await res.text() }
    throw new Error(detail || `Server responded with ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function login(email: string, password: string) {
  return request<{ access_token: string; token_type: string; student: import('@/state/authStore').Student }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
}
export async function register(name: string, email: string, password: string) {
  return request<{ access_token: string; token_type: string; student: import('@/state/authStore').Student }>('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })
}
export async function me() { return request<import('@/state/authStore').Student>('/api/auth/me') }

export async function solveAttempt(files: File[], questionNumber: number): Promise<SolveResponse> {
  const formData = new FormData(); formData.append('question_number', String(questionNumber)); files.forEach((f) => formData.append('images', f))
  return request<SolveResponse>('/api/analysis/solve', { method: 'POST', body: formData })
}
export async function sendFollowUp(sessionId: number, studentAnswer: string): Promise<FollowUpResponse> {
  const formData = new FormData(); formData.append('session_id', String(sessionId)); formData.append('student_answer', studentAnswer)
  return request<FollowUpResponse>('/api/tutoring/follow-up', { method: 'POST', body: formData })
}
export async function getProgress(): Promise<ProgressResponse> { return request<ProgressResponse>('/api/progress') }
export async function generatePractice(concept?: string, count = 3) { return request<Array<{ id: number; question_text: string; concept?: string; difficulty?: string }>>('/api/practice/generate', { method: 'POST', body: JSON.stringify({ concept: concept || null, count }) }) }
export async function evaluatePractice(questionId: number, studentAnswer: string) { return request<{ id: number; question_id: number; is_correct: boolean; feedback: string }>('/api/practice/evaluate', { method: 'POST', body: JSON.stringify({ question_id: questionId, student_answer: studentAnswer }) }) }
