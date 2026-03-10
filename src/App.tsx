import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage          from './pages/auth/LoginPage'
import RegisterPage       from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage  from './pages/auth/ResetPasswordPage'
import OnboardingPage     from './pages/onboarding/OnboardingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login'           element={<LoginPage />} />
        <Route path='/register'        element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password'  element={<ResetPasswordPage />} />
        <Route path='/onboarding'      element={<OnboardingPage />} />
        <Route path='*'                element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  )
}
