import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Auth pages (no layout)
import LoginPage          from './pages/auth/LoginPage'
import RegisterPage       from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage  from './pages/auth/ResetPasswordPage'
import OnboardingPage     from './pages/onboarding/OnboardingPage'

// App pages (inside AppLayout)
import AppLayout           from './components/layout/AppLayout'
import DashboardPage       from './pages/dashboard/DashboardPage'
import HistoryPage         from './pages/history/HistoryPage'
import RecommendationsPage from './pages/recommendations/RecommendationsPage'
import SettingsPage        from './pages/settings/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth routes — no sidebar */}
        <Route path='/login'           element={<LoginPage />} />
        <Route path='/register'        element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password'  element={<ResetPasswordPage />} />
        <Route path='/onboarding'      element={<OnboardingPage />} />

        {/* App routes — wrapped in AppLayout sidebar */}
        <Route element={<AppLayout />}>
          <Route path='/dashboard'       element={<DashboardPage />} />
          <Route path='/history'         element={<HistoryPage />} />
          <Route path='/recommendations' element={<RecommendationsPage />} />
          <Route path='/settings'        element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/login' replace />} />

      </Routes>
    </BrowserRouter>
  )
}