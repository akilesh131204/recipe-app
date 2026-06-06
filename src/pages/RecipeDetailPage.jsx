import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getMealById, extractIngredients, getYouTubeEmbedUrl } from '../services/mealApi'
import { useFavorites } from '../context/FavoritesContext'
import ErrorState from '../components/ErrorState'

export default function RecipeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('instructions')
  const [imgLoaded, setImgLoaded] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    setError(null)
    getMealById(id)
      .then((data) => {
        if (!data) {
          setError('Recipe not found.')
        } else {
          setMeal(data)
        }
      })
      .catch((err) => setError(err.message || 'Failed to load recipe'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <RecipeDetailSkeleton />
  if (error) return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <ErrorState message={error} onRetry={() => navigate(-1)} />
    </div>
  )
  if (!meal) return null

  const ingredients = extractIngredients(meal)
  const embedUrl = getYouTubeEmbedUrl(meal.strYoutube)
  const favorite = isFavorite(meal.idMeal)

  // Parse instructions into steps
  const steps = meal.strInstructions
    ?.split(/\r?\n/)
    .map(s => s.trim())
    .filter(s => s.length > 10) || []

  const tags = meal.strTags?.split(',').map(t => t.trim()).filter(Boolean) || []

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Back button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-charcoal-500 hover:text-charcoal-800 font-body font-500 transition-colors group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Recipes
        </button>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-modal bg-cream-200 aspect-[4/3]">
            {!imgLoaded && <div className="absolute inset-0 skeleton" />}
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
            {/* Floating favorite */}
            <button
              onClick={() => toggleFavorite(meal)}
              className={`absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300 ${
                favorite
                  ? 'bg-terra-500 text-white scale-110'
                  : 'bg-white/90 backdrop-blur-sm text-charcoal-400 hover:text-terra-500 hover:scale-110'
              }`}
              aria-label={favorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24"
                fill={favorite ? 'currentColor' : 'none'}
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Meta Info */}
          <div className="py-2">
            {/* Breadcrumb tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {meal.strCategory && (
                <Link
                  to={`/category/${encodeURIComponent(meal.strCategory)}`}
                  className="tag-pill bg-forest-100 text-forest-700 hover:bg-forest-200 transition-colors"
                >
                  🏷 {meal.strCategory}
                </Link>
              )}
              {meal.strArea && (
                <Link
                  to={`/area/${encodeURIComponent(meal.strArea)}`}
                  className="tag-pill bg-cream-200 text-charcoal-700 hover:bg-cream-300 transition-colors"
                >
                  🌍 {meal.strArea}
                </Link>
              )}
              {tags.map(tag => (
                <span key={tag} className="tag-pill bg-terra-50 text-terra-700 border border-terra-100">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal-900 leading-tight mb-4 text-balance">
              {meal.strMeal}
            </h1>

            {/* Quick info grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <InfoCard icon="🍽" label="Category" value={meal.strCategory || '—'} />
              <InfoCard icon="🌍" label="Cuisine" value={meal.strArea || '—'} />
              <InfoCard icon="🧂" label="Ingredients" value={`${ingredients.length} items`} />
              <InfoCard icon="📋" label="Steps" value={`${steps.length} steps`} />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => toggleFavorite(meal)}
                className={`btn-primary gap-2 ${favorite ? 'bg-terra-500 hover:bg-terra-600' : ''}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24"
                  fill={favorite ? 'currentColor' : 'none'}
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {favorite ? 'Saved to Favorites' : 'Save to Favorites'}
              </button>
              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-terra"
                >
                  ▶ Watch on YouTube
                </a>
              )}
              {meal.strSource && (
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  🔗 Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-cream-300 mb-8">
          {[
            { key: 'instructions', label: '📋 Instructions' },
            { key: 'ingredients', label: `🧂 Ingredients (${ingredients.length})` },
            ...(embedUrl ? [{ key: 'video', label: '▶ Video' }] : []),
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-3 text-sm font-body font-500 border-b-2 transition-all duration-200 -mb-px ${
                activeTab === key
                  ? 'border-forest-600 text-forest-700'
                  : 'border-transparent text-charcoal-500 hover:text-charcoal-800 hover:border-charcoal-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'instructions' && (
          <div className="max-w-3xl animate-fade-in">
            <div className="space-y-5">
              {steps.length > 0 ? (
                steps.map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="shrink-0 w-8 h-8 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center text-sm font-display font-bold group-hover:bg-forest-600 group-hover:text-cream-100 transition-colors">
                      {i + 1}
                    </div>
                    <p className="font-body text-charcoal-700 leading-relaxed text-sm pt-1">{step}</p>
                  </div>
                ))
              ) : (
                <div className="font-body text-charcoal-700 leading-relaxed text-sm whitespace-pre-line">
                  {meal.strInstructions}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="animate-fade-in">
            <p className="text-sm font-body text-charcoal-400 mb-5">
              {ingredients.length} ingredients needed
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {ingredients.map((ing, i) => (
                <div
                  key={i}
                  className="ingredient-badge flex-col items-center text-center gap-2 p-3 hover:shadow-card transition-shadow"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <img
                    src={ing.image}
                    alt={ing.name}
                    className="w-12 h-12 object-contain"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <div>
                    <p className="font-body font-500 text-charcoal-800 text-xs">{ing.name}</p>
                    {ing.measure && (
                      <p className="font-body text-charcoal-400 text-xs mt-0.5">{ing.measure}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'video' && embedUrl && (
          <div className="max-w-3xl animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-modal aspect-video bg-charcoal-900">
              <iframe
                src={embedUrl}
                title={`${meal.strMeal} — Recipe Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-cream-50 border border-cream-200 rounded-xl">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-[10px] font-body text-charcoal-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-body font-500 text-charcoal-800">{value}</p>
      </div>
    </div>
  )
}

function RecipeDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="skeleton h-5 w-32 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="skeleton aspect-[4/3] rounded-3xl" />
        <div className="space-y-4 py-2">
          <div className="flex gap-2">
            <div className="skeleton h-6 w-24 rounded-full" />
            <div className="skeleton h-6 w-20 rounded-full" />
          </div>
          <div className="skeleton h-10 w-4/5" />
          <div className="skeleton h-8 w-3/5" />
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[1,2,3,4].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}
          </div>
          <div className="flex gap-3 mt-4">
            <div className="skeleton h-10 w-36 rounded-xl" />
            <div className="skeleton h-10 w-36 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
