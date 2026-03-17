import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from './LanguageToggle'

const NAV_ITEMS = [
  { to: '/dashboard',       icon: '📊', labelKey: 'nav.dashboard'       },
  { to: '/history',         icon: '📈', labelKey: 'nav.history'          },
  { to: '/recommendations', icon: '💡', labelKey: 'nav.recommendations'  },
  { to: '/settings',        icon: '⚙️', labelKey: 'nav.settings'         },
]

export default function AppLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-slate-50 flex'>

      {/* ── Sidebar (desktop) ── */}
      <aside className='hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-10'>

        {/* Logo */}
        <div className='flex items-center gap-3 px-6 py-5 border-b border-slate-100'>
          <div className='w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center flex-shrink-0'>
            <span className='text-white font-black text-sm'>D</span>
          </div>
          <div>
            <p className='font-black text-slate-800 text-sm leading-tight'>Digital Presence</p>
            <p className='text-xs text-slate-400 leading-tight'>Tracker</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className='flex-1 px-3 py-4 space-y-1'>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
                 transition-all duration-150
                 ${isActive
                   ? 'bg-teal-50 text-teal-600'
                   : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`
              }
            >
              <span className='text-base'>{item.icon}</span>
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: user + language */}
        <div className='px-4 py-4 border-t border-slate-100 space-y-3'>
          <LanguageToggle />
          <div className='flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50
                          cursor-pointer transition-colors'
            onClick={() => navigate('/settings')}>
            <div className='w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0'>
              <span className='text-teal-600 font-bold text-sm'>A</span>
            </div>
            <div className='min-w-0'>
              <p className='text-sm font-semibold text-slate-700 truncate'>Amina Hassan</p>
              <p className='text-xs text-slate-400 truncate'>amina@fashionke.com</p>
            </div>
          </div>
        </div>

      </aside>

      {/* ── Main content ── */}
      <main className='flex-1 md:ml-64 flex flex-col min-h-screen'>

        {/* Mobile top bar */}
        <header className='md:hidden bg-white border-b border-slate-200 px-4 py-3
                           flex items-center justify-between sticky top-0 z-10'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center'>
              <span className='text-white font-black text-xs'>D</span>
            </div>
            <span className='font-black text-slate-800 text-sm'>DPT</span>
          </div>
          <LanguageToggle />
        </header>

        {/* Page content */}
        <div className='flex-1 overflow-y-auto'>
          <Outlet />
        </div>

        {/* ── Bottom nav (mobile) ── */}
        <nav className='md:hidden bg-white border-t border-slate-200 flex sticky bottom-0 z-10'>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5
                 text-xs font-semibold transition-colors
                 ${isActive ? 'text-teal-600' : 'text-slate-400'}`
              }
            >
              <span className='text-lg'>{item.icon}</span>
              <span>{t(item.labelKey)}</span>
            </NavLink>
          ))}
        </nav>

      </main>

    </div>
  )
}