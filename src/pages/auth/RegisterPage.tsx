import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../../components/layout/AuthLayout'

const SECTORS = [
  'Retail', 'Food & Beverage', 'Fashion', 'Beauty & Wellness',
  'Technology', 'Education', 'Transport', 'Other'
]

const LOCATIONS = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
  'Thika', 'Nyeri', 'Malindi', 'Other'
]

export default function RegisterPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [form, setForm]       = useState({
    name: '', email: '', businessName: '',
    sector: '', location: '', password: ''
  })

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, businessName, sector, location, password } = form
    if (!name || !email || !businessName || !sector || !location || !password) {
      setError(t('common.required')); return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters'); return
    }
    setLoading(true)
    setError('')
    // Role 4 will replace this with: await authApi.register(form)
    setTimeout(() => setLoading(false), 1000)
  }

  const inputClass = 'w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all text-sm'
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1'

  return (
    <AuthLayout>
      <h2 className='text-xl font-bold text-slate-800 mb-6'>{t('auth.register')}</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>

        {/* Full Name */}
        <div>
          <label className={labelClass}>{t('auth.name')}</label>
          <input
            type='text'
            value={form.name}
            onChange={e => update('name', e.target.value)}
            placeholder='e.g. Wanjiku Kamau'
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>{t('auth.email')}</label>
          <input
            type='email'
            value={form.email}
            onChange={e => update('email', e.target.value)}
            placeholder='you@business.com'
            className={inputClass}
          />
        </div>

        {/* Business Name */}
        <div>
          <label className={labelClass}>{t('auth.businessName')}</label>
          <input
            type='text'
            value={form.businessName}
            onChange={e => update('businessName', e.target.value)}
            placeholder='e.g. Mama Pima Boutique'
            className={inputClass}
          />
        </div>

        {/* Sector + Location side by side */}
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label className={labelClass}>{t('auth.sector')}</label>
            <select
              value={form.sector}
              onChange={e => update('sector', e.target.value)}
              className={inputClass + ' bg-white'}
            >
              <option value=''>Select...</option>
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>{t('auth.location')}</label>
            <select
              value={form.location}
              onChange={e => update('location', e.target.value)}
              className={inputClass + ' bg-white'}
            >
              <option value=''>Select...</option>
              {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className={labelClass}>{t('auth.password')}</label>
          <input
            type='password'
            value={form.password}
            onChange={e => update('password', e.target.value)}
            placeholder='At least 8 characters'
            className={inputClass}
          />
        </div>

        {error && <p className='text-red-500 text-xs'>{error}</p>}

        <button
          type='submit'
          disabled={loading}
          className='w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50'
        >
          {loading ? t('common.loading') : t('auth.register')}
        </button>

      </form>

      <p className='text-center text-sm text-slate-500 mt-4'>
        {t('auth.hasAccount')}{' '}
        <Link to='/login' className='text-teal-600 hover:underline font-medium'>
          {t('auth.login')}
        </Link>
      </p>
    </AuthLayout>
  )
}