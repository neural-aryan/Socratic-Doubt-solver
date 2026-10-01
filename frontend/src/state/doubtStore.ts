// src/state/doubtStore.ts
// Holds the live "solve a doubt" session -- the pages that make up the
// /solve/* flow all read and write this store instead of hardcoding data.

import { create } from 'zustand'
import { solveAttempt, sendFollowUp, type Diagnosis } from '@/lib/api'

export interface ChatMessage {
  id: string
  role: 'tutor' | 'student'
  content: string
  timestamp: Date
}

interface DoubtStore {
  // ---- upload state ----
  files: File[]
  previews: string[]
  questionNumber: number
  addFiles: (files: FileList | File[]) => void
  removeFileAt: (index: number) => void
  setQuestionNumber: (n: number) => void

  // ---- solve state ----
  solving: boolean
  solveError: string
  sessionId: number | null
  reconstruction: string
  diagnosis: Diagnosis | null
  understood: boolean

  // ---- chat state ----
  messages: ChatMessage[]
  chatSending: boolean
  chatError: string

  // ---- actions ----
  startSolve: () => Promise<boolean> // returns true on success
  sendMessage: (text: string) => Promise<void>
  resetSession: () => void
}

let idCounter = 0
const nextId = () => `msg-${Date.now()}-${idCounter++}`

export const useDoubtStore = create<DoubtStore>((set, get) => ({
  files: [],
  previews: [],
  questionNumber: 1,

  addFiles: (list) => {
    const incoming = Array.from(list)
    const accepted: File[] = []
    for (const f of incoming) {
      if (!f.type.startsWith('image/')) continue // silently skip non-images
      if (f.size > 10 * 1024 * 1024) continue // skip files over 10MB
      accepted.push(f)
    }
    if (accepted.length === 0) return
    set((state) => ({
      files: [...state.files, ...accepted],
      previews: [...state.previews, ...accepted.map((f) => URL.createObjectURL(f))],
    }))
  },

  removeFileAt: (index) => {
    set((state) => ({
      files: state.files.filter((_, i) => i !== index),
      previews: state.previews.filter((_, i) => i !== index),
    }))
  },

  setQuestionNumber: (n) => set({ questionNumber: Math.max(1, n) }),

  solving: false,
  solveError: '',
  sessionId: null,
  reconstruction: '',
  diagnosis: null,
  understood: false,

  messages: [],
  chatSending: false,
  chatError: '',

  startSolve: async () => {
    const { files, questionNumber } = get()
    if (files.length === 0) {
      set({ solveError: 'Choose at least one image first.' })
      return false
    }

    set({ solving: true, solveError: '' })

    try {
      const data = await solveAttempt(files, questionNumber)

      const understood = !data.first_question
      const messages: ChatMessage[] = data.first_question
        ? [{ id: nextId(), role: 'tutor', content: data.first_question, timestamp: new Date() }]
        : []

      set({
        sessionId: data.session_id,
        reconstruction: data.reconstruction || '',
        diagnosis: data.diagnosis ?? null,
        understood,
        messages,
        solving: false,
      })
      return true
    } catch (err: any) {
      set({
        solveError: err?.message || 'Could not reach the backend. Is it running?',
        solving: false,
      })
      return false
    }
  },

  sendMessage: async (text: string) => {
    const studentText = text.trim()
    if (!studentText) return

    const { sessionId } = get()
    if (sessionId === null) {
      set({ chatError: 'No active session -- go back and upload a solution first.' })
      return
    }

    set((state) => ({
      messages: [...state.messages, { id: nextId(), role: 'student', content: studentText, timestamp: new Date() }],
      chatSending: true,
      chatError: '',
    }))

    try {
      const data = await sendFollowUp(sessionId, studentText)
      const tutorText = data.feedback || data.error || "Sorry, I couldn't process that response."

      set((state) => ({
        messages: [...state.messages, { id: nextId(), role: 'tutor', content: tutorText, timestamp: new Date() }],
        chatSending: false,
        understood: data.understood && !data.next_question ? true : state.understood,
      }))
    } catch (err: any) {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: nextId(),
            role: 'tutor',
            content: `I'm having trouble reaching the tutor right now (${err?.message || 'network error'}). Make sure the backend is running.`,
            timestamp: new Date(),
          },
        ],
        chatSending: false,
      }))
    }
  },

  resetSession: () => {
    set({
      files: [],
      previews: [],
      questionNumber: 1,
      solving: false,
      solveError: '',
      sessionId: null,
      reconstruction: '',
      diagnosis: null,
      understood: false,
      messages: [],
      chatSending: false,
      chatError: '',
    })
  },
}))
