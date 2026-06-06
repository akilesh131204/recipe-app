import React, { useState, useEffect, useCallback, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import RecipeCard from '../components/RecipeCard'
import { SkeletonGrid } from '../components/SkeletonCard'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import { useDebounce } from '../hooks/useDebounce'
import {
  searchMealsByName,
  filterByCategory,
  filterByArea,
  getAllCategories,
  getAllAreas,
  getMealsByLetter,
} from '../services/mealApi'
import { Link } from 'react-router-dom'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedArea, setSelectedArea] = useState(null)
  const [meals, setMeals] = useState([])
  const [categories, setCategories] = useState([])
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortOrder, setSortOrder] = useState('default')
  const [currentLetter, setCurrentLetter] = useState(null)

  const debouncedQuery = useDebounce(searchQuery, 450)

  // Load filter options on mount
  useEffect(() => {
    Promise.all([getAllCategories(), getAllAreas()])
      .then(([cats, areasData]) => {
        setCategories(cats)
        setAreas(areasData)
      })
      .catch(() => {}) // non-critical
  }, [])

  // Fetch meals based on current filters
  const fetchMeals = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let results = []

      if (debouncedQuery.trim()) {
        results = await searchMealsByName(debouncedQuery.trim())
      } else if (selectedCategory) {
        results = await filterByCategory(selectedCategory)
      } else if (selectedArea) {
        results = await filterByArea(selectedArea)
      } else if (currentLetter) {
        results = await getMealsByLetter(currentLetter)
      } else {
        // Default: load a mix by fetching several letters
        const letters = ['a', 'b', 'c']
        const allResults = await Promise.all(letters.map(l => getMealsByLetter(l)))
        results = allResults.flat()
      }

      setMeals(results)
    } catch (err) {
      setError(err.message || 'Failed to load recipes')
    } finally {
      setLoading(false)
    }
  }, [debouncedQuery, selectedCategory, selectedArea, currentLetter])

  useEffect(() => {
    fetchMeals()
  }, [fetchMeals])

  const sortedMeals = useMemo(() => {
    if (!meals.length) return []
    const copy = [...meals]
    if (sortOrder === 'az') copy.sort((a, b) => a.strMeal.localeCompare(b.strMeal))
    if (sortOrder === 'za') copy.sort((a, b) => b.strMeal.localeCompare(a.strMeal))
    return copy
  }, [meals, sortOrder])

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat)
    setSelectedArea(null)
    setCurrentLetter(null)
    setSearchQuery('')
  }

  const handleAreaChange = (area) => {
    setSelectedArea(area)
    setSelectedCategory(null)
    setCurrentLetter(null)
    setSearchQuery('')
  }

  const handleReset = () => {
    setSelectedCategory(null)
    setSelectedArea(null)
    setCurrentLetter(null)
    setSearchQuery('')
  }

  const handleLetterFilter = (letter) => {
    setCurrentLetter(currentLetter === letter ? null : letter)
    setSelectedCategory(null)
    setSelectedArea(null)
    setSearchQuery('')
  }

  const hasActiveFilters = !!(selectedCategory || selectedArea || debouncedQuery || currentLetter)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-forest-800 overflow-hidden noise-overlay">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-forest-600/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-terra-800/20 blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-600/50 border border-forest-500/50 rounded-full text-cream-300 text-xs font-body font-500 mb-5">
              <span className="w-2 h-2 rounded-full bg-terra-400 animate-pulse" />
              Powered by TheMealDB
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream-100 leading-tight mb-4">
              Discover Recipes<br />
              <span className="text-terra-400 italic">From the World</span>
            </h1>
            <p className="font-body text-cream-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Explore thousands of recipes across every cuisine, category, and ingredient. Your next favourite dish is just a search away.
            </p>

            {/* Hero Search */}
            <div className="max-w-xl">
              <SearchBar
                value={searchQuery}
                onChange={(v) => {
                  setSearchQuery(v)
                  setSelectedCategory(null)
                  setSelectedArea(null)
                  setCurrentLetter(null)
                }}
                onClear={() => setSearchQuery('')}
                placeholder="Search pasta, chicken, salad..."
                loading={loading && !!debouncedQuery}
                autoFocus={false}
              />
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center gap-6 mt-6">
              {[
                { icon: '🌍', label: `${areas.length || 27}+ Cuisines` },
                { icon: '🏷', label: `${categories.length || 14}+ Categories` },
                { icon: '🍽', label: '100s of Recipes' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-cream-300 text-sm font-body">
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {/* Alphabet Filter Bar */}
        <div className="mb-6 overflow-x-auto custom-scrollbar pb-2">
          <div className="flex items-center gap-1 min-w-max">
            <span className="text-xs font-body text-charcoal-400 mr-2 shrink-0">Browse:</span>
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterFilter(letter)}
                className={`w-8 h-8 rounded-lg text-xs font-body font-500 uppercase transition-all duration-150 ${
                  currentLetter === letter
                    ? 'bg-forest-600 text-cream-100'
                    : 'bg-cream-200 text-charcoal-600 hover:bg-forest-100 hover:text-forest-700'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-56 xl:w-64 shrink-0">
            <FilterPanel
              categories={categories}
              areas={areas}
              selectedCategory={selectedCategory}
              selectedArea={selectedArea}
              onCategoryChange={handleCategoryChange}
              onAreaChange={handleAreaChange}
              onReset={handleReset}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold text-charcoal-800">
                  {debouncedQuery
                    ? `Results for "${debouncedQuery}"`
                    : selectedCategory
                    ? `${selectedCategory} Recipes`
                    : selectedArea
                    ? `${selectedArea} Cuisine`
                    : currentLetter
                    ? `Recipes starting with "${currentLetter.toUpperCase()}"`
                    : 'All Recipes'}
                </h2>
                {!loading && (
                  <p className="text-xs text-charcoal-400 font-body mt-0.5">
                    {sortedMeals.length} recipe{sortedMeals.length !== 1 ? 's' : ''} found
                  </p>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button onClick={handleReset} className="btn-secondary text-xs py-2 px-3">
                    Clear all
                  </button>
                )}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="input-base py-2 text-xs w-auto"
                >
                  <option value="default">Default order</option>
                  <option value="az">Name A → Z</option>
                  <option value="za">Name Z → A</option>
                </select>
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <SkeletonGrid count={12} />
            ) : error ? (
              <ErrorState message={error} onRetry={fetchMeals} />
            ) : sortedMeals.length === 0 ? (
              <EmptyState
                title="No recipes found"
                message={
                  debouncedQuery
                    ? `No recipes match "${debouncedQuery}". Try a different keyword.`
                    : 'No recipes match the selected filters. Try resetting.'
                }
                emoji="🔍"
                action={
                  <button onClick={handleReset} className="btn-primary">
                    Clear Filters
                  </button>
                }
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {sortedMeals.map((meal, i) => (
                  <RecipeCard key={meal.idMeal} meal={meal} index={i} showArea />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
