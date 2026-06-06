import React from 'react'

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="text-5xl mb-4">😞</div>
      <h3 className="font-display text-xl font-semibold text-charcoal-700 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="font-body text-charcoal-400 text-sm max-w-xs mb-6">
        {message || 'We couldn\'t load the recipes. Please check your connection and try again.'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  )
}
