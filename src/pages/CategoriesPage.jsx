import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCategories } from '../services/mealApi'
import { SkeletonGrid } from '../components/SkeletonCard'
import ErrorState from '../components/ErrorState'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const fetchCategories = () => {
    setLoading(true)
    setError(null)
    getAllCategories()
      .then(setCategories)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-forest-800 text-cream-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="font-display text-4xl font-bold mb-2">Recipe Categories</h1>
          <p className="font-body text-cream-300 text-base">
            Explore recipes by food category — from hearty beef dishes to light desserts.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="skeleton rounded-2xl aspect-square" />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={fetchCategories} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.idCategory}
                category={cat}
                index={i}
                onClick={() => navigate(`/category/${encodeURIComponent(cat.strCategory)}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryCard({ category, index, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-left"
      style={{
        opacity: 0,
        animation: `slideUp 0.5s ease-out ${index * 50}ms forwards`,
      }}
    >
      <div className="relative aspect-square bg-cream-100 overflow-hidden">
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={category.strCategoryThumb}
          alt={category.strCategory}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="font-display font-semibold text-white text-sm leading-tight">
            {category.strCategory}
          </p>
        </div>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[11px] font-body text-charcoal-400 line-clamp-2 leading-relaxed">
          {category.strCategoryDescription?.slice(0, 80)}...
        </p>
      </div>
    </button>
  )
}
