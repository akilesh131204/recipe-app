import React, { useRef, useEffect } from 'react'

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search recipes, ingredients...',
  loading = false,
  autoFocus = false,
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <div className="relative group">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400 group-focus-within:text-forest-600 transition-colors">
        {loading ? (
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        )}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3.5 bg-white border-2 border-cream-200 rounded-2xl
                   text-charcoal-900 font-body text-sm placeholder:text-charcoal-400
                   focus:outline-none focus:border-forest-400 focus:ring-0
                   transition-all duration-200 shadow-card hover:shadow-card-hover"
        autoComplete="off"
        spellCheck="false"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center
                     rounded-full bg-charcoal-200 text-charcoal-600 hover:bg-charcoal-300
                     transition-all duration-200 text-xs"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}
