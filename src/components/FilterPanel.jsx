import React, { useState } from 'react'

export default function FilterPanel({
  categories = [],
  areas = [],
  selectedCategory,
  selectedArea,
  onCategoryChange,
  onAreaChange,
  onReset,
  hasActiveFilters,
}) {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllAreas, setShowAllAreas] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 10)
  const visibleAreas = showAllAreas ? areas : areas.slice(0, 10)

  const activeCount = (selectedCategory ? 1 : 0) + (selectedArea ? 1 : 0)

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-3">
        <button
          onClick={() => setPanelOpen(v => !v)}
          className="flex items-center gap-2 btn-secondary text-sm relative"
        >
          <FilterIcon />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-forest-600 text-cream-100 text-xs rounded-full font-bold">
              {activeCount}
            </span>
          )}
          <svg
            width="14" height="14"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`ml-auto transition-transform ${panelOpen ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Panel */}
      <aside className={`${panelOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="glass-card p-5 space-y-6 sticky top-20">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-charcoal-800 text-lg">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="text-xs text-terra-500 hover:text-terra-700 font-body font-500 flex items-center gap-1 transition-colors"
              >
                <span>✕</span> Reset
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-xs font-body font-500 text-charcoal-500 uppercase tracking-widest mb-3">
              Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {visibleCategories.map((cat) => (
                <button
                  key={cat.strCategory}
                  onClick={() => onCategoryChange(
                    selectedCategory === cat.strCategory ? null : cat.strCategory
                  )}
                  className={`filter-chip ${selectedCategory === cat.strCategory ? 'active' : ''}`}
                >
                  {cat.strCategory}
                </button>
              ))}
            </div>
            {categories.length > 10 && (
              <button
                onClick={() => setShowAllCategories(v => !v)}
                className="mt-2 text-xs text-forest-600 hover:text-forest-800 font-body font-500 transition-colors"
              >
                {showAllCategories ? '− Show less' : `+ ${categories.length - 10} more`}
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-cream-200" />

          {/* Area Filter */}
          <div>
            <h3 className="text-xs font-body font-500 text-charcoal-500 uppercase tracking-widest mb-3">
              Cuisine / Area
            </h3>
            <div className="flex flex-wrap gap-2">
              {visibleAreas.map((area) => (
                <button
                  key={area.strArea}
                  onClick={() => onAreaChange(
                    selectedArea === area.strArea ? null : area.strArea
                  )}
                  className={`filter-chip ${selectedArea === area.strArea ? 'active' : ''}`}
                >
                  {area.strArea}
                </button>
              ))}
            </div>
            {areas.length > 10 && (
              <button
                onClick={() => setShowAllAreas(v => !v)}
                className="mt-2 text-xs text-forest-600 hover:text-forest-800 font-body font-500 transition-colors"
              >
                {showAllAreas ? '− Show less' : `+ ${areas.length - 10} more`}
              </button>
            )}
          </div>

          {/* Active filter summary */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-cream-200">
              <p className="text-xs text-charcoal-500 font-body mb-2">Active filters:</p>
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-forest-100 text-forest-700 text-xs rounded-full font-body font-500">
                    {selectedCategory}
                    <button onClick={() => onCategoryChange(null)} className="hover:text-forest-900">✕</button>
                  </span>
                )}
                {selectedArea && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-forest-100 text-forest-700 text-xs rounded-full font-body font-500">
                    {selectedArea}
                    <button onClick={() => onAreaChange(null)} className="hover:text-forest-900">✕</button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}
