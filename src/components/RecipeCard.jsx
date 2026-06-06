import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function RecipeCard({ meal, index = 0, showArea = false }) {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const favorite = isFavorite(meal.idMeal)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    toggleFavorite(meal)
  }

  const handleClick = () => {
    navigate(`/recipe/${meal.idMeal}`)
  }

  return (
    <article
      onClick={handleClick}
      className="recipe-card group"
      style={{
        animationDelay: `${index * 60}ms`,
        opacity: 0,
        animation: `slideUp 0.5s ease-out ${index * 60}ms forwards`,
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`View recipe: ${meal.strMeal}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-cream-200">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 skeleton" />
        )}
        {!imgError ? (
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-cream-200">
            <span className="text-5xl">🍽</span>
          </div>
        )}

        {/* Category badge */}
        {meal.strCategory && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-body font-500 text-forest-700 shadow-sm">
              {meal.strCategory}
            </span>
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full shadow-sm transition-all duration-200 ${
            favorite
              ? 'bg-terra-500 text-white scale-110'
              : 'bg-white/90 backdrop-blur-sm text-charcoal-400 hover:text-terra-500 hover:bg-white'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={favorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-charcoal-900 text-base leading-snug line-clamp-2 mb-2 group-hover:text-forest-700 transition-colors">
          {meal.strMeal}
        </h3>

        <div className="flex items-center gap-2 text-xs font-body text-charcoal-400">
          {showArea && meal.strArea && (
            <>
              <span className="flex items-center gap-1">
                <span>🌍</span> {meal.strArea}
              </span>
              <span className="text-cream-400">•</span>
            </>
          )}
          <span className="flex items-center gap-1 text-forest-600 font-500">
            View Recipe →
          </span>
        </div>
      </div>
    </article>
  )
}
