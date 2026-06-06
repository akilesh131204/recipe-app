import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Lazy-load pages for code splitting / faster initial load
const HomePage = lazy(() => import('./pages/HomePage'))
const RecipeDetailPage = lazy(() => import('./pages/RecipeDetailPage'))
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const CuisinesPage = lazy(() => import('./pages/CuisinesPage'))
const AreaPage = lazy(() => import('./pages/AreaPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const RandomPage = lazy(() => import('./pages/RandomPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-cream-300 border-t-forest-600 rounded-full animate-spin" />
        <p className="font-body text-sm text-charcoal-400">Loading...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <ScrollToTop />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/cuisines" element={<CuisinesPage />} />
                <Route path="/area/:area" element={<AreaPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/random" element={<RandomPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  )
}
