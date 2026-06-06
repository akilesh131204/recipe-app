import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyState({
  title = 'No recipes found',
  message = 'Try adjusting your search or filters.',
  emoji = '🍽',
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="text-6xl mb-4 animate-bounce-subtle">{emoji}</div>
      <h3 className="font-display text-xl font-semibold text-charcoal-700 mb-2">{title}</h3>
      <p className="font-body text-charcoal-400 text-sm max-w-xs">{message}</p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  )
}
