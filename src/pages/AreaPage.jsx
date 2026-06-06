import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { filterByArea } from '../services/mealApi'
import RecipeCard from '../components/RecipeCard'
import { SkeletonGrid } from '../components/SkeletonCard'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

const AREA_FLAGS = {
  American: '🇺🇸', British: '🇬🇧', Canadian: '🇨🇦', Chinese: '🇨🇳',
  Croatian: '🇭🇷', Dutch: '🇳🇱', Egyptian: '🇪🇬', Filipino: '🇵🇭',
  French: '🇫🇷', Greek: '🇬🇷', Indian: '🇮🇳', Irish: '🇮🇪',
  Italian: '🇮🇹', Jamaican: '🇯🇲', Japanese: '🇯🇵', Kenyan: '🇰🇪',
  Malaysian: '🇲🇾', Mexican: '🇲🇽', Moroccan: '🇲🇦', Polish: '🇵🇱',
  Portuguese: '🇵🇹', Russian: '🇷🇺', Spanish: '🇪🇸', Thai: '🇹🇭',
  Tunisian: '🇹🇳', Turkish: '🇹🇷', Ukrainian: '🇺🇦', Unknown: '🌍', Vietnamese: '🇻🇳',
}

export default function AreaPage() {
  const { area } = useParams()
  const decodedArea = decodeURIComponent(area)
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const flag = AREA_FLAGS[decodedArea] || '🌍'

  const fetchMeals = () => {
    setLoading(true)
    setError(null)
    filterByArea(decodedArea)
      .then(setMeals)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
    fetchMeals()
  }, [decodedArea])

  return (
    <div className="min-h-screen">
      <div className="bg-charcoal-700 text-cream-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <Link to="/cuisines" className="inline-flex items-center gap-1 text-charcoal-300 text-sm hover:text-cream-100 mb-4 transition-colors">
            ← All Cuisines
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{flag}</span>
            <div>
              <h1 className="font-display text-4xl font-bold">{decodedArea} Cuisine</h1>
              {!loading && (
                <p className="font-body text-charcoal-300 mt-1">{meals.length} recipes</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {loading ? (
          <SkeletonGrid count={12} />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchMeals} />
        ) : meals.length === 0 ? (
          <EmptyState title="No recipes found" message="No recipes found for this cuisine." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
            {meals.map((meal, i) => (
              <RecipeCard key={meal.idMeal} meal={meal} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
