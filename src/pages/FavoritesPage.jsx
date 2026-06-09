import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import EmptyState from '../components/EmptyState'
import { getMealById } from '../services/mealApi'

// FavoriteDetailCard — shows FULL recipe details inline on the favorites page
function FavoriteDetailCard({ meal, index }) {
  const { removeFavorite } = useFavorites()
  const [fullMeal, setFullMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Always fetch full details so nothing is missing
  useEffect(() => {
    getMealById(meal.idMeal)
      .then((data) => {
        setFullMeal(data || meal)
      })
      .catch(() => setFullMeal(meal))
      .finally(() => setLoading(false))
  }, [meal.idMeal])

  const displayMeal = fullMeal || meal

  if (loading) {
    return (
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-card"
        style={{ opacity: 0, animation: `slideUp 0.4s ease-out ${index * 60}ms forwards` }}
      >
        <div className="aspect-[4/3] skeleton" />
        <div className="p-4 space-y-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
          <div className="skeleton h-3 w-2/3" />
          <div className="flex gap-2 mt-3">
            <div className="skeleton h-8 w-24 rounded-xl" />
            <div className="skeleton h-8 w-24 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
      style={{ opacity: 0, animation: `slideUp 0.4s ease-out ${index * 60}ms forwards` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
        <img
          src={displayMeal.strMealThumb}
          alt={displayMeal.strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Recipe' }}
        />
        {/* Category badge */}
        {displayMeal.strCategory && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-body font-500 text-forest-700 shadow-sm">
              {displayMeal.strCategory}
            </span>
          </div>
        )}
        {/* Remove favorite button */}
        <button
          onClick={() => removeFavorite(meal.idMeal)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-terra-500 text-white shadow-sm hover:bg-terra-600 transition-colors"
          title="Remove from favorites"
        >
          ♥
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-display font-semibold text-charcoal-900 text-base leading-snug line-clamp-2 mb-2">
          {displayMeal.strMeal}
        </h3>

        {/* Meta details */}
        <div className="space-y-1 mb-3">
          {displayMeal.strCategory && (
            <div className="flex items-center gap-2 text-xs font-body text-charcoal-500">
              <span>🏷</span>
              <span>{displayMeal.strCategory}</span>
            </div>
          )}
          {displayMeal.strArea && (
            <div className="flex items-center gap-2 text-xs font-body text-charcoal-500">
              <span>🌍</span>
              <span>{displayMeal.strArea} Cuisine</span>
            </div>
          )}
          {displayMeal.strInstructions && (
            <div className="flex items-start gap-2 text-xs font-body text-charcoal-400 mt-1">
              <span className="shrink-0">📋</span>
              <span className="line-clamp-2 leading-relaxed">
                {displayMeal.strInstructions.slice(0, 80)}...
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {displayMeal.strTags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {displayMeal.strTags.split(',').slice(0, 3).map(tag => tag.trim()).filter(Boolean).map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-cream-100 text-charcoal-500 text-[10px] rounded-full font-body border border-cream-200">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-1 border-t border-cream-100">
          <button
            onClick={() => navigate(`/recipe/${displayMeal.idMeal}`)}
            className="flex-1 py-2 bg-forest-600 hover:bg-forest-700 text-cream-100 text-xs font-body font-500 rounded-xl transition-colors text-center"
          >
            View Full Recipe
          </button>
         {displayMeal.strYoutube && (
  <a
    href={displayMeal.strYoutube}
    target="_blank"
    rel="noopener noreferrer"
  >
    Watch on YouTube
  </a>
)}
              ▶
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function FavoritesPage() {
  const { favorites, count } = useFavorites()
  const [confirmClear, setConfirmClear] = useState(false)
  const [viewMode, setViewMode] = useState('detailed')

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-terra-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display text-4xl font-bold mb-2">❤️ My Favorites</h1>
              <p className="font-body text-terra-200 text-base">
                {count > 0
                  ? `${count} recipe${count !== 1 ? 's' : ''} saved to your collection`
                  : 'Your saved recipes will appear here'}
              </p>
            </div>

            {count > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                {/* View mode toggle */}
                <div className="flex items-center bg-terra-600 rounded-xl p-1 gap-1">
                  <button
                    onClick={() => setViewMode('detailed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-body font-500 transition-colors ${
                      viewMode === 'detailed' ? 'bg-white text-terra-700' : 'text-terra-200 hover:text-white'
                    }`}
                  >
                    📋 Detailed
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-body font-500 transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-terra-700' : 'text-terra-200 hover:text-white'
                    }`}
                  >
                    ⊞ Grid
                  </button>
                </div>

                {/* Clear all */}
                {confirmClear ? (
                  <div className="flex items-center gap-2 animate-scale-in">
                    <span className="text-sm text-terra-200 font-body">Remove all?</span>
                    <ClearAllButton />
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="px-3 py-2 bg-terra-600 hover:bg-terra-800 rounded-xl text-sm font-body transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmClear(true)}
                    className="px-4 py-2 bg-terra-600 hover:bg-terra-800 rounded-xl text-sm font-body font-500 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {count === 0 ? (
          <EmptyState
            title="No favorites yet"
            message="Browse recipes and tap the ❤️ heart icon on any recipe card to save your favorites here. They will persist even after you close the browser!"
            emoji="🤍"
            action={
              <Link to="/" className="btn-primary">
                Explore Recipes
              </Link>
            }
          />
        ) : (
          <>
            {/* Info banner */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-terra-50 border border-terra-100 rounded-2xl">
              <span className="text-2xl">💾</span>
              <div>
                <p className="font-body text-sm font-500 text-terra-800">Saved to your device</p>
                <p className="font-body text-xs text-terra-600 mt-0.5">
                  Your favorites are stored in localStorage and will persist between browser sessions.
                </p>
              </div>
            </div>

            {viewMode === 'detailed' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                {favorites.map((meal, i) => (
                  <FavoriteDetailCard key={meal.idMeal} meal={meal} index={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {favorites.map((meal, i) => (
                  <SimpleCard key={meal.idMeal} meal={meal} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function SimpleCard({ meal, index }) {
  const { removeFavorite } = useFavorites()
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/recipe/${meal.idMeal}`)}
      className="recipe-card group cursor-pointer"
      style={{ opacity: 0, animation: `slideUp 0.4s ease-out ${index * 60}ms forwards` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <button
          onClick={(e) => { e.stopPropagation(); removeFavorite(meal.idMeal) }}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-terra-500 text-white text-xs hover:bg-terra-600 transition-colors"
        >
          ♥
        </button>
      </div>
      <div className="p-3">
        <p className="font-display font-semibold text-sm text-charcoal-800 line-clamp-2">{meal.strMeal}</p>
        <p className="text-xs text-forest-600 font-body mt-1">View Recipe →</p>
      </div>
    </div>
  )
}

function ClearAllButton() {
  const { favorites, removeFavorite } = useFavorites()
  return (
    <button
      onClick={() => favorites.forEach(f => removeFavorite(f.idMeal))}
      className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-body text-white transition-colors"
    >
      Yes, clear all
    </button>
  )
}