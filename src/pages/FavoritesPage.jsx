import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import RecipeCard from '../components/RecipeCard'
import EmptyState from '../components/EmptyState'

export default function FavoritesPage() {
  const { favorites, count } = useFavorites()
  const [confirmClear, setConfirmClear] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-terra-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold mb-2">My Favorites</h1>
              <p className="font-body text-terra-200 text-base">
                {count > 0
                  ? `${count} recipe${count !== 1 ? 's' : ''} saved to your collection`
                  : 'Your saved recipes will appear here'}
              </p>
            </div>
            {count > 0 && (
              <div className="flex items-center gap-2">
                {confirmClear ? (
                  <div className="flex items-center gap-2 animate-scale-in">
                    <span className="text-sm text-terra-200 font-body">Sure?</span>
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
            message="Browse recipes and tap the heart icon to save your favorites here."
            emoji="🤍"
            action={
              <Link to="/" className="btn-primary">
                Explore Recipes
              </Link>
            }
          />
        ) : (
          <>
            {/* localStorage note */}
            <div className="flex items-center gap-2 mb-6 p-3 bg-terra-50 border border-terra-100 rounded-xl">
              <span className="text-terra-500 text-lg">💾</span>
              <p className="font-body text-xs text-terra-700">
                Your favorites are saved locally and will persist between sessions.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-5">
              {favorites.map((meal, i) => (
                <RecipeCard key={meal.idMeal} meal={meal} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Separate component to access context for the clear action
function ClearAllButton() {
  const { favorites, removeFavorite } = useFavorites()
  return (
    <button
      onClick={() => favorites.forEach(f => removeFavorite(f.idMeal))}
      className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-body text-white transition-colors"
    >
      Yes, clear
    </button>
  )
}
