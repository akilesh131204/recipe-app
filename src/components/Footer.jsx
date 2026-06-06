import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍽</span>
              <span className="font-display font-bold text-xl text-cream-100">
                Dish<span className="text-terra-400">covery</span>
              </span>
            </div>
            <p className="font-body text-sm text-charcoal-400 leading-relaxed">
              Discover thousands of recipes from around the world. Powered by TheMealDB free API.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body font-500 text-sm text-charcoal-300 uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/categories', label: 'Categories' },
                { to: '/cuisines', label: 'Cuisines' },
                { to: '/favorites', label: 'My Favorites' },
                { to: '/random', label: 'Surprise Me' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-sm text-charcoal-400 hover:text-cream-200 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Credits */}
          <div>
            <h4 className="font-body font-500 text-sm text-charcoal-300 uppercase tracking-widest mb-4">
              Powered By
            </h4>
            <a
              href="https://www.themealdb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-charcoal-400 hover:text-cream-200 transition-colors"
            >
              🍲 TheMealDB API
            </a>
            <p className="mt-4 font-body text-xs text-charcoal-600 leading-relaxed">
              Recipe data provided by{' '}
              <a
                href="https://www.themealdb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal-500 hover:text-charcoal-300 underline"
              >
                TheMealDB
              </a>
              . Free API key "1" used for development.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-charcoal-600">
            © {new Date().getFullYear()} Dishcovery. Built with React & TailwindCSS.
          </p>
          <p className="font-body text-xs text-charcoal-600">
            Made with ❤️ for food lovers
          </p>
        </div>
      </div>
    </footer>
  )
}
