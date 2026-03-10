import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../../components/layout/AuthLayout'

export default function LoginPage() {
  const { t } = useTranslation()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError(t('common.required')); return }
    setLoading(true)
    setError('')
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <AuthLayout>
      <h2 className='text-xl font-bold text-slate-800 mb-6'>{t('auth.login')}</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>

        <div>
          <label className='block text-sm font-medium text-slate-700 mb-1'>
            {t('auth.email')}
          </label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='you@business.com'
            className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all text-sm'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-slate-700 mb-1'>
            {t('auth.password')}
          </label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='••••••••'
            className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all text-sm'
          />
        </div>

        {error && <p className='text-red-500 text-xs'>{error}</p>}

        <div className='flex justify-end'>
          <Link to='/forgot-password' className='text-sm text-teal-600 hover:underline'>
            {t('auth.forgotPassword')}
          </Link>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50'
        >
          {loading ? t('common.loading') : t('auth.login')}
        </button>

      </form>

      <p className='text-center text-sm text-slate-500 mt-4'>
        {t('auth.noAccount')}{' '}
        <Link to='/register' className='text-teal-600 hover:underline font-medium'>
          {t('auth.register')}
        </Link>
      </p>
    </AuthLayout>
  )
}