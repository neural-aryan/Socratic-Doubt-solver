import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Upload as UploadIcon, FileText, X, AlertTriangle } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { useDoubtStore } from '@/state/doubtStore'

export const Upload: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false)
  const picker = useRef<HTMLInputElement>(null)

  const files = useDoubtStore((s) => s.files)
  const previews = useDoubtStore((s) => s.previews)
  const questionNumber = useDoubtStore((s) => s.questionNumber)
  const solving = useDoubtStore((s) => s.solving)
  const solveError = useDoubtStore((s) => s.solveError)
  const addFiles = useDoubtStore((s) => s.addFiles)
  const removeFileAt = useDoubtStore((s) => s.removeFileAt)
  const setQuestionNumber = useDoubtStore((s) => s.setQuestionNumber)
  const startSolve = useDoubtStore((s) => s.startSolve)

  const handleFilesPicked = (fileList: FileList | null) => {
    if (fileList && fileList.length) addFiles(fileList)
  }

  const handleContinue = async () => {
    if (files.length === 0) {
      picker.current?.click()
      return
    }
    navigate('/solve/analyzing')
    const ok = await startSolve()
    navigate(ok ? '/solve/understanding' : '/solve/upload')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: spacing[4],
        maxWidth: '900px',
        margin: '0 auto',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ textAlign: 'center', marginBottom: spacing[6] }}
      >
        <h1
          style={{
            fontSize: typography.sizes['4xl'],
            fontWeight: typography.weights.bold,
            color: colors.textPrimary,
            marginBottom: spacing[2],
          }}
        >
          Upload Your Doubt
        </h1>
        <p style={{ fontSize: typography.sizes.lg, color: colors.textSecondary }}>
          Add a photo of the question, then each page of your attempted solution.
        </p>
      </motion.div>

      {/* Drag and Drop Zone */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleFilesPicked(e.dataTransfer.files)
        }}
      >
        <Card padding={8}>
          <motion.div
            animate={{
              borderColor: isDragging ? colors.accent : colors.border,
              background: isDragging ? colors.accentLight : 'transparent',
            }}
            style={{
              border: `2px dashed ${colors.border}`,
              borderRadius: borderRadius.lg,
              padding: spacing[8],
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => picker.current?.click()}
          >
            <motion.div
              animate={{ scale: isDragging ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto',
                background: colors.accentLight,
                borderRadius: borderRadius.full,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.accent,
                marginBottom: spacing[3],
              }}
            >
              <UploadIcon size={40} />
            </motion.div>

            {files.length > 0 ? (
              <>
                <h3
                  style={{
                    fontSize: typography.sizes.xl,
                    fontWeight: typography.weights.semibold,
                    color: colors.textPrimary,
                    marginBottom: spacing[2],
                  }}
                >
                  {files.length} image{files.length === 1 ? '' : 's'} selected
                </h3>
                <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, marginBottom: spacing[3] }}>
                  First image should be the question, the rest your working
                </p>
                <div
                  style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap', justifyContent: 'center', marginBottom: spacing[3] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {previews.map((p, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img
                        src={p}
                        alt={`Page ${i + 1}`}
                        style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}
                      />
                      <button
                        type="button"
                        aria-label={`Remove page ${i + 1}`}
                        onClick={() => removeFileAt(i)}
                        style={{
                          position: 'absolute',
                          top: -6,
                          right: -6,
                          background: colors.surfaceElevated,
                          border: `1px solid ${colors.border}`,
                          borderRadius: '50%',
                          width: 20,
                          height: 20,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: colors.textPrimary,
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3
                  style={{
                    fontSize: typography.sizes.xl,
                    fontWeight: typography.weights.semibold,
                    color: colors.textPrimary,
                    marginBottom: spacing[2],
                  }}
                >
                  {isDragging ? 'Drop your file(s) here' : 'Drag and drop your file(s) here'}
                </h3>
                <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, marginBottom: spacing[4] }}>
                  or click to browse (JPG, PNG, up to 10MB each)
                </p>
              </>
            )}

            <Button size="lg" onClick={(e) => { e.stopPropagation(); picker.current?.click() }}>
              {files.length > 0 ? 'Add Another Page' : 'Choose File(s)'}
            </Button>
          </motion.div>
        </Card>
      </motion.div>

      <input
        ref={picker}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          handleFilesPicked(e.target.files)
          e.target.value = ''
        }}
      />

      {/* Question number */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: spacing[4], maxWidth: 320 }}
      >
        <Card padding={3}>
          <label
            htmlFor="question-number"
            style={{ display: 'block', fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: spacing[1] }}
          >
            Question number (as it appears on the page)
          </label>
          <Input
            id="question-number"
            type="number"
            min={1}
            fullWidth
            value={questionNumber}
            onChange={(e) => setQuestionNumber(Number(e.target.value) || 1)}
          />
        </Card>
      </motion.div>

      {solveError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            marginTop: spacing[4],
            padding: spacing[3],
            borderRadius: borderRadius.md,
            border: `1px solid ${colors.error}`,
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            color: colors.error,
          }}
        >
          <AlertTriangle size={18} />
          <span style={{ fontSize: typography.sizes.sm }}>{solveError}</span>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: spacing[6], display: 'flex', justifyContent: 'center' }}
      >
        <Button size="lg" disabled={solving} onClick={handleContinue}>
          <FileText size={18} />
          {solving ? 'Analyzing…' : 'Continue'}
        </Button>
      </motion.div>
    </motion.div>
  )
}
