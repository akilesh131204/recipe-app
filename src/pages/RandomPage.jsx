import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomMeal } from '../services/mealApi'

export default function RandomPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [meal, setMeal] = useState(null)

  const fetchRandom = () => {
    setLoading(true)
    getRandomMeal()
      .then(data => {
        setMeal(data)
        if (data) {
          // Small delay for the animation to feel intentional
          setTimeout(() => navigate(`/recipe/${data.idMeal}`), 800)
        }
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchRandom()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="text-7xl mb-6 animate-spin-slow">{loading ? '🎲' : '🍽'}</div>
        <h1 className="font-display text-2xl font-bold text-charcoal-800 mb-2">
          {loading ? 'Finding a surprise recipe...' : `Loading ${meal?.strMeal}...`}
        </h1>
        <p className="font-body text-charcoal-400 text-sm">
          {loading ? 'Picking something delicious for you!' : 'Get ready to cook!'}
        </p>
        {!loading && (
          <button onClick={fetchRandom} className="btn-secondary mt-6">
            🎲 Try Another
          </button>
        )}
      </div>
    </div>
  )
}
