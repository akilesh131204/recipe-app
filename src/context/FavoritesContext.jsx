import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const FavoritesContext = createContext(null)

const STORAGE_KEY = 'dishcovery_favorites'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // localStorage might be full or unavailable
    }
  }, [favorites])

  const addFavorite = useCallback((meal) => {
    setFavorites(prev => {
      if (prev.some(f => f.idMeal === meal.idMeal)) return prev
      return [...prev, meal]
    })
  }, [])

  const removeFavorite = useCallback((mealId) => {
    setFavorites(prev => prev.filter(f => f.idMeal !== mealId))
  }, [])

  const toggleFavorite = useCallback((meal) => {
    setFavorites(prev => {
      if (prev.some(f => f.idMeal === meal.idMeal)) {
        return prev.filter(f => f.idMeal !== meal.idMeal)
      }
      return [...prev, meal]
    })
  }, [])

  const isFavorite = useCallback((mealId) => {
    return favorites.some(f => f.idMeal === mealId)
  }, [favorites])

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      count: favorites.length,
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
