import axios from 'axios'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// ─── Meals ────────────────────────────────────────────────────────────────────

/** Search meals by name or keyword */
export const searchMealsByName = async (query) => {
  const { data } = await api.get(`/search.php?s=${encodeURIComponent(query)}`)
  return data.meals || []
}

/** List all meals starting with a letter */
export const getMealsByLetter = async (letter) => {
  const { data } = await api.get(`/search.php?f=${letter}`)
  return data.meals || []
}

/** Get full meal details by ID */
export const getMealById = async (id) => {
  const { data } = await api.get(`/lookup.php?i=${id}`)
  return data.meals?.[0] || null
}

/** Get a single random meal */
export const getRandomMeal = async () => {
  const { data } = await api.get('/random.php')
  return data.meals?.[0] || null
}

// ─── Filters ──────────────────────────────────────────────────────────────────

/** Filter meals by category name */
export const filterByCategory = async (category) => {
  const { data } = await api.get(`/filter.php?c=${encodeURIComponent(category)}`)
  return data.meals || []
}

/** Filter meals by area/cuisine */
export const filterByArea = async (area) => {
  const { data } = await api.get(`/filter.php?a=${encodeURIComponent(area)}`)
  return data.meals || []
}

/** Filter meals by main ingredient */
export const filterByIngredient = async (ingredient) => {
  const { data } = await api.get(`/filter.php?i=${encodeURIComponent(ingredient)}`)
  return data.meals || []
}

// ─── Lists ────────────────────────────────────────────────────────────────────

/** Get all categories with details */
export const getAllCategories = async () => {
  const { data } = await api.get('/categories.php')
  return data.categories || []
}

/** Get list of all areas */
export const getAllAreas = async () => {
  const { data } = await api.get('/list.php?a=list')
  return data.meals || []
}

/** Get list of all ingredients */
export const getAllIngredients = async () => {
  const { data } = await api.get('/list.php?i=list')
  return data.meals || []
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extract ingredients and measures from a meal object.
 * TheMealDB returns them as strIngredient1..20 and strMeasure1..20
 */
export const extractIngredients = (meal) => {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || '',
        image: `https://www.themealdb.com/images/ingredients/${ingredient.trim()}-small.png`,
      })
    }
  }
  return ingredients
}

/**
 * Get YouTube embed URL from watch URL
 */
export const getYouTubeEmbedUrl = (watchUrl) => {
  if (!watchUrl) return null
  const match = watchUrl.match(/[?&]v=([^&]+)/)
  if (match) return `https://www.youtube.com/embed/${match[1]}`
  return null
}

export default api
