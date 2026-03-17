import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Tab = 'profile' | 'platforms' | 'notifications' | 'account'

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'profile',       label: 'Profile',       icon: '👤' },
  { key: 'platforms',     label: 'Platforms',     icon: '🌐' },
  { key: 'notifications', label: 'Notifications', icon: '🔔' },
  { key: 'account',       label: 'Account',       icon: '⚙️' },
]

const PLATFORMS = [
  { id: 'facebook',  emoji: '📘', label: 'Facebook',        connected: true  },
  { id: 'instagram', emoji: '📸', label: 'Instagram',       connected: true  },
  { id: 'google',    emoji: '🔍', label: 'Google Business', connected: false },
  { id: 'whatsapp',  emoji: '💬', label: 'WhatsApp',        connected: true  },
  { id: 'tiktok',    emoji: '🎵', label: 'TikTok',          connected: false },
]

function ProfileTab() {
  const [name,     setName]     = useState('Amina Hassan')
  const [email,    setEmail]    = useState('amina@fashionke.com')
  const [business, setBusiness] = useState('Amina Fashion House')
  const [sector,   setSector]   = useState('Fashion')
  const [location, setLocation] = useState('Nairobi')
  const [saved,    setSaved]    = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const inputClass = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all'

  return (
    <div className='space-y-5'>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-1'>Full name</label>
          <input value={name} onChange={e => setName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-1'>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className={inputClass} type='email' />
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-slate-700 mb-1'>Business name</label>
        <input value={business} onChange={e => setBusiness(e.target.value)} className={inputClass} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-1'>Sector</label>
          <select value={sector} onChange={e => setSector(e.target.value)} className={inputClass + ' bg-white'}>
            {['Retail','Food & Beverage','Fashion','Beauty & Wellness','Technology','Education','Transport','Other'].map(s =>
              <option key={s}>{s}</option>
            )}
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-1'>Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)} className={inputClass + ' bg-white'}>
            {['Nairobi','Mombasa','Kisumu','Nakuru','Eldoret','Thika','Nyeri','Malindi','Other'].map(l =>
              <option key={l}>{l}</option>
            )}
          </select>
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium text-slate-700 mb-2'>Preferred language</label>
        <div className='flex gap-3'>
          {[{code:'en',label:'English'},{code:'sw',label:'Kiswahili'}].map(lang => (
            <button key={lang.code} type='button'
              className='flex-1 py-2 border-2 border-slate-200 rounded-lg text-sm
                         font-medium text-slate-600 hover:border-teal-400 hover:text-teal-600 transition-all'>
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleSave}
        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all
          ${saved
            ? 'bg-green-500 text-white'
            : 'bg-teal-500 hover:bg-teal-600 text-white'}`}>
        {saved ? '✓ Saved!' : 'Save changes'}
      </button>
    </div>
  )
}

function PlatformsTab() {
  const [platforms, setPlatforms] = useState(PLATFORMS)

  const toggle = (id: string) =>
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, connected: !p.connected } : p))

  const connected = platforms.filter(p => p.connected).length

  return (
    <div>
      <div className='flex items-center justify-between mb-5'>
        <p className='text-sm text-slate-500'>{connected} of {platforms.length} connected</p>
        <div className='h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden'>
          <div className='h-full bg-teal-500 rounded-full transition-all duration-500'
            style={{ width: `${(connected / platforms.length) * 100}%` }} />
        </div>
      </div>

      <div className='space-y-3'>
        {platforms.map(pl => (
          <div key={pl.id}
            className='flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-teal-200 transition-colors'>
            <div className='flex items-center gap-3'>
              <span className='text-2xl'>{pl.emoji}</span>
              <div>
                <p className='font-semibold text-slate-700 text-sm'>{pl.label}</p>
                <p className={`text-xs font-medium ${pl.connected ? 'text-teal-500' : 'text-slate-400'}`}>
                  {pl.connected ? '● Connected' : '○ Not connected'}
                </p>
              </div>
            </div>
            <button onClick={() => toggle(pl.id)}
              className={`text-xs font-semibold px-4 py-1.5 rounded-lg border transition-all
                ${pl.connected
                  ? 'border-red-200 text-red-500 bg-red-50 hover:bg-red-100'
                  : 'border-teal-200 text-teal-600 bg-teal-50 hover:bg-teal-100'}`}>
              {pl.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationsTab() {
  const [settings, setSettings] = useState({
    weeklyReport:    true,
    scoreChange:     true,
    newTip:          true,
    platformAlert:   false,
    emailDigest:     true,
    smsAlerts:       false,
  })

  const toggle = (key: keyof typeof settings) =>
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))

  const items = [
    { key: 'weeklyReport'  as const, label: 'Weekly score report',        desc: 'Get your weekly digital presence summary' },
    { key: 'scoreChange'   as const, label: 'Score change alerts',         desc: 'Notify me when my score goes up or down'  },
    { key: 'newTip'        as const, label: 'New recommendations',         desc: 'Alert me when new tips are available'     },
    { key: 'platformAlert' as const, label: 'Platform connection issues',  desc: 'Alert if a platform gets disconnected'    },
    { key: 'emailDigest'   as const, label: 'Email digest',                desc: 'Receive notifications via email'          },
    { key: 'smsAlerts'     as const, label: 'SMS alerts',                  desc: 'Receive notifications via SMS'            },
  ]

  return (
    <div className='space-y-4'>
      {items.map(item => (
        <div key={item.key}
          className='flex items-center justify-between p-4 border border-slate-200 rounded-xl'>
          <div>
            <p className='text-sm font-semibold text-slate-700'>{item.label}</p>
            <p className='text-xs text-slate-400 mt-0.5'>{item.desc}</p>
          </div>
          <button onClick={() => toggle(item.key)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0
              ${settings[item.key] ? 'bg-teal-500' : 'bg-slate-200'}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
              ${settings[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      ))}
    </div>
  )
}

function AccountTab() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div className='space-y-4'>

      {/* Change password */}
      <div className='p-4 border border-slate-200 rounded-xl'>
        <p className='text-sm font-semibold text-slate-700 mb-3'>Change password</p>
        <div className='space-y-3'>
          <input type='password' placeholder='Current password'
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none' />
          <input type='password' placeholder='New password'
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none' />
          <input type='password' placeholder='Confirm new password'
            className='w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 outline-none' />
          <button className='w-full py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-lg transition-colors'>
            Update password
          </button>
        </div>
      </div>

      {/* Export data */}
      <div className='flex items-center justify-between p-4 border border-slate-200 rounded-xl'>
        <div>
          <p className='text-sm font-semibold text-slate-700'>Export my data</p>
          <p className='text-xs text-slate-400 mt-0.5'>Download all your scores and history</p>
        </div>
        <button className='text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100
                           border border-indigo-200 px-3 py-1.5 rounded-lg transition-colors'>
          Export CSV
        </button>
      </div>

      {/* Sign out */}
      <div className='flex items-center justify-between p-4 border border-slate-200 rounded-xl'>
        <div>
          <p className='text-sm font-semibold text-slate-700'>Sign out</p>
          <p className='text-xs text-slate-400 mt-0.5'>Sign out of your account</p>
        </div>
        <button className='text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200
                           border border-slate-200 px-3 py-1.5 rounded-lg transition-colors'>
          Sign out
        </button>
      </div>

      {/* Delete account */}
      <div className={`p-4 border rounded-xl transition-colors
        ${showDeleteConfirm ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}>
        {!showDeleteConfirm ? (
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-semibold text-red-600'>Delete account</p>
              <p className='text-xs text-slate-400 mt-0.5'>Permanently delete your account and all data</p>
            </div>
            <button onClick={() => setShowDeleteConfirm(true)}
              className='text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100
                         border border-red-200 px-3 py-1.5 rounded-lg transition-colors'>
              Delete
            </button>
          </div>
        ) : (
          <div>
            <p className='text-sm font-bold text-red-600 mb-1'>Are you sure?</p>
            <p className='text-xs text-slate-500 mb-3'>This action cannot be undone. All your data will be permanently deleted.</p>
            <div className='flex gap-2'>
              <button onClick={() => setShowDeleteConfirm(false)}
                className='flex-1 py-2 border border-slate-300 text-slate-600 text-sm rounded-lg hover:bg-slate-50'>
                Cancel
              </button>
              <button className='flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors'>
                Yes, delete
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default function SettingsPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  return (
    <div className='p-6 max-w-2xl mx-auto'>

      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-black text-slate-800'>{t('nav.settings')}</h1>
        <p className='text-slate-500 text-sm mt-1'>Manage your account and preferences</p>
      </div>

      {/* Tab bar */}
      <div className='flex gap-1 bg-slate-100 p-1 rounded-xl mb-6'>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg
              text-xs font-semibold transition-all duration-200
              ${activeTab === tab.key
                ? 'bg-white text-teal-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'}`}
          >
            <span>{tab.icon}</span>
            <span className='hidden sm:inline'>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className='bg-white rounded-2xl border border-slate-200 p-6'>
        {activeTab === 'profile'       && <ProfileTab />}
        {activeTab === 'platforms'     && <PlatformsTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'account'       && <AccountTab />}
      </div>

    </div>
  )
}