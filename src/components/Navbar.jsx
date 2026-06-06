import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useFavorites()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { to: '/', label: 'Explore' },
    { to: '/categories', label: 'Categories' },
    { to: '/cuisines', label: 'Cuisines' },
    { to: '/random', label: '🎲 Surprise Me' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-nav'
          : 'bg-cream-100/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🍽</span>
            <div className="leading-none">
              <span className="font-display font-bold text-xl text-forest-800 tracking-tight">
                Dish<span className="text-terra-500">covery</span>
              </span>
              <p className="text-[10px] font-body text-charcoal-400 tracking-widest uppercase -mt-0.5">
                World Recipes
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-xl text-sm font-body font-500 transition-all duration-200 ${
                  location.pathname === to
                    ? 'bg-forest-600 text-cream-100'
                    : 'text-charcoal-700 hover:bg-cream-200 hover:text-charcoal-900'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Favorites */}
            <Link
              to="/favorites"
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-body font-500 transition-all duration-200 ${
                location.pathname === '/favorites'
                  ? 'bg-terra-100 text-terra-700'
                  : 'text-charcoal-700 hover:bg-cream-200'
              }`}
            >
              <HeartIcon filled={count > 0} />
              <span className="hidden sm:inline">Favorites</span>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-terra-500 text-white text-[10px] font-bold rounded-full animate-scale-in">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2 rounded-xl text-charcoal-700 hover:bg-cream-200 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-cream-200 animate-slide-down">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block px-4 py-2.5 rounded-xl text-sm font-body font-500 mb-1 transition-all duration-200 ${
                  location.pathname === to
                    ? 'bg-forest-600 text-cream-100'
                    : 'text-charcoal-700 hover:bg-cream-200'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
