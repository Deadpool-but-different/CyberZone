import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useStore from '../../store/useStore'
import AuthModal from '../ui/AuthModal'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const favCount  = useStore(s => s.favorites.length)
  const user      = useStore(s => s.user)
  const logout    = useStore(s => s.logout)

  const navLinks = [
  
    { to: '/about',     label: 'О нас'    },
    { to: '/',          label: 'Игровые зоны'  },
    { to: '/contacts',  label: 'Контакты' },
  ]

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="logo"><img src="/logo.svg" /></Link>

        {/* desktop nav */}
        <nav className={`nav${menuOpen ? ' nav-open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <NavLink to="/favorites" className={({ isActive }) => `icon-btn${isActive ? ' icon-btn--active' : ''}`} title="Избранное">
            <img src="/heart_outline.svg" alt="Избранное" className="icon-btn-img" />
            {favCount > 0 && <span className="icon-badge">{favCount}</span>}
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `icon-btn${isActive ? ' icon-btn--active' : ''}`} title="Профиль">
            <img src="/avatar.svg" alt="Профиль" className="icon-btn-img" />
          </NavLink>

          {user ? (
            <div className="auth-user-wrap">
              <span className="auth-user-name"><img src="/avatar.svg" /> {user.name}</span>
              <button className="btn btn-ghost btn-sm auth-logout-btn" onClick={logout}>Выйти</button>
            </div>
          ) : (
            <button className="btn btn-outline btn-sm auth-open-btn" onClick={() => setAuthOpen(true)}>
              Войти
            </button>
          )}
        </div>

        <button className="burger" onClick={() => setMenuOpen(o => !o)} aria-label="&#1052;&#1077;&#1085;&#1102;">
          {menuOpen ? '&#10005;' : '&#9776;'}
        </button>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  )
}

export default Header
