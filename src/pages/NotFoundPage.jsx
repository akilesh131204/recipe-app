import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center animate-fade-in max-w-md">
        <div className="text-8xl mb-6 animate-bounce-subtle">🍳</div>
        <h1 className="font-display text-5xl font-bold text-charcoal-800 mb-3">404</h1>
        <h2 className="font-display text-xl font-semibold text-charcoal-600 mb-3">
          Recipe Not Found
        </h2>
        <p className="font-body text-charcoal-400 text-sm mb-8 leading-relaxed">
          Looks like this page got lost in the kitchen. Let's get you back to the good stuff.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-primary">
            🏠 Back to Home
          </Link>
          <Link to="/random" className="btn-secondary">
            🎲 Surprise Me
          </Link>
        </div>
      </div>
    </div>
  )
}
