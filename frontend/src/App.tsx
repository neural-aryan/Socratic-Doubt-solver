import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useThemeStore } from '@/state/themeStore'
import { AppShell } from '@/components/layout/AppShell'
import { Home } from '@/pages/Home'
import { Upload } from '@/pages/Upload'
import { Analyzing } from '@/pages/Analyzing'
import { Understanding } from '@/pages/Understanding'
import { Discuss } from '@/pages/Discuss'
import { Practice } from '@/pages/Practice'
import { Review } from '@/pages/Review'
import { History } from '@/pages/History'
import { Concepts } from '@/pages/Concepts'
import { Profile } from '@/pages/Profile'
import { LearningJourney } from '@/pages/LearningJourney'
import { Auth } from '@/pages/Auth'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import '@/styles/globals.css'

function App() {
  const theme = useThemeStore((state) => state.theme)

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AppShell />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="solve">
              <Route path="upload" element={<Upload />} />
              <Route path="analyzing" element={<Analyzing />} />
              <Route path="understanding" element={<Understanding />} />
              <Route path="discuss" element={<Discuss />} />
              <Route path="practice" element={<Practice />} />
              <Route path="review" element={<Review />} />
            </Route>
            <Route path="history" element={<History />} />
            <Route path="concepts" element={<Concepts />} />
            <Route path="practice" element={<Practice />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/learning-journey" element={<LearningJourney />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
