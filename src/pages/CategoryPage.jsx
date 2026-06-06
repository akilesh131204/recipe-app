import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { filterByCategory } from '../services/mealApi'
import RecipeCard from '../components/RecipeCard'
import { SkeletonGrid } from '../components/SkeletonCard'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

export default function CategoryPage() {
  const { category } = useParams()
  const decodedCategory = decodeURIComponent(category)
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMeals = () => {
    setLoading(true)
    setError(null)
    filterByCategory(decodedCategory)
      .then(setMeals)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
    fetchMeals()
  }, [decodedCategory])

  return (
    <div className="min-h-screen">
      <div className="bg-forest-700 text-cream-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <Link to="/categories" className="inline-flex items-center gap-1 text-cream-300 text-sm hover:text-cream-100 mb-4 transition-colors">
            ← All Categories
          </Link>
          <h1 className="font-display text-4xl font-bold">{decodedCategory}</h1>
          {!loading && (
            <p className="font-body text-cream-300 mt-1">{meals.length} recipes</p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {loading ? (
          <SkeletonGrid count={12} />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchMeals} />
        ) : meals.length === 0 ? (
          <EmptyState title="No recipes found" message="No recipes found in this category." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-5">
            {meals.map((meal, i) => (
              <RecipeCard key={meal.idMeal} meal={meal} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
