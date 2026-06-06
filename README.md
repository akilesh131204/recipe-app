# 🍽 Dishcovery — World Recipes App

> A beautiful, feature-rich recipe discovery app built with React + TailwindCSS, powered by TheMealDB API.

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite)](https://vitejs.dev)
[![Axios](https://img.shields.io/badge/Axios-1.6-5A29E4?logo=axios)](https://axios-http.com)

---

## ✨ Features

- **🔍 Live Search** — Search recipes by name/keyword with debounce (no extra API calls while typing)
- **🏷 Category Filters** — Browse by 14+ food categories (Beef, Chicken, Dessert, Seafood...)
- **🌍 World Cuisines** — Filter by 27+ country cuisines with flag emojis
- **🔤 Alphabet Browse** — Browse recipes by first letter (A–Z bar)
- **📋 Full Recipe Details** — Tabbed view: Instructions (step-by-step), Ingredients (with images), Video embed
- **🎲 Surprise Me** — Fetches a random recipe with a cool animation
- **❤️ Favorites** — Save/remove favorites with localStorage persistence (survives browser refresh)
- **📱 Fully Responsive** — Mobile-first design, works on all screen sizes
- **⚡ Code Splitting** — Lazy-loaded pages for fast initial load
- **💀 Skeleton Loaders** — Smooth loading states on all pages
- **🚨 Error Handling** — Graceful error states with retry buttons

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework with hooks |
| React Router v6 | Client-side routing |
| TailwindCSS 3 | Utility-first styling |
| Axios | HTTP client for API calls |
| Vite 5 | Build tool & dev server |
| TheMealDB API | Recipe data source |
| localStorage | Favorites persistence |

---

## 📁 Project Structure

```
recipe-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Sticky navigation with mobile menu
│   │   ├── Footer.jsx       # Site footer
│   │   ├── RecipeCard.jsx   # Recipe card with favorite toggle
│   │   ├── SkeletonCard.jsx # Loading skeleton cards
│   │   ├── SearchBar.jsx    # Search input component
│   │   ├── FilterPanel.jsx  # Category + area filter sidebar
│   │   ├── EmptyState.jsx   # No results state
│   │   ├── ErrorState.jsx   # Error state with retry
│   │   └── ScrollToTop.jsx  # Auto scroll on route change
│   ├── context/
│   │   └── FavoritesContext.jsx  # Global favorites state
│   ├── hooks/
│   │   ├── useDebounce.js   # Debounce hook for search
│   │   └── useAsync.js      # Generic async data fetcher
│   ├── pages/
│   │   ├── HomePage.jsx         # Main explore + search + filter
│   │   ├── RecipeDetailPage.jsx # Full recipe view
│   │   ├── CategoriesPage.jsx   # All categories grid
│   │   ├── CategoryPage.jsx     # Recipes in a category
│   │   ├── CuisinesPage.jsx     # All world cuisines
│   │   ├── AreaPage.jsx         # Recipes from a cuisine
│   │   ├── FavoritesPage.jsx    # Saved favorites
│   │   ├── RandomPage.jsx       # Random recipe redirect
│   │   └── NotFoundPage.jsx     # 404 page
│   ├── services/
│   │   └── mealApi.js      # All TheMealDB API functions
│   ├── App.jsx              # Root with router + providers
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles + Tailwind
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind design system
├── postcss.config.js        # PostCSS
├── netlify.toml             # Netlify SPA redirect rule
└── package.json
```

---



## 🧪 Testing Features

| Feature | How to Test |
|---|---|
| Search | Type "chicken" or "pasta" in the search bar on the home page |
| Category filter | Click any category pill in the sidebar |
| Area filter | Click any cuisine pill in the sidebar |
| Alphabet browse | Click a letter in the A–Z bar at top |
| Recipe details | Click any recipe card |
| Ingredients tab | On detail page → click "Ingredients" tab |
| Video tab | On detail page → click "Video" tab (if available) |
| Favorites | Click the ❤️ heart icon on any card; visit /favorites |
| Persistence | Save a favorite → close browser → reopen → it's still there |
| Random recipe | Click "🎲 Surprise Me" in navbar |
| Categories page | Click "Categories" in navbar |
| Cuisines page | Click "Cuisines" in navbar |
| Mobile view | Resize browser or use DevTools mobile mode |
| 404 page | Navigate to `/anything-invalid` |
## 🎨 Design System

The app uses a custom warm editorial design:

| Token | Value | Use |
|---|---|---|
| `forest-600` | Deep green | Primary actions, active states |
| `terra-500` | Terracotta | Favorites, CTA accents |
| `cream-100` | Warm cream | Page background |
| `charcoal-900` | Near black | Body text |
| Playfair Display | Serif | Headings & titles |
| DM Sans | Humanist sans | Body & UI text |

---

## 📡 API Reference

Base URL: `https://www.themealdb.com/api/json/v1/1`

| Endpoint | Used For |
|---|---|
| `/search.php?s={name}` | Search by meal name |
| `/search.php?f={letter}` | Browse by first letter |
| `/lookup.php?i={id}` | Full meal details |
| `/random.php` | Random meal |
| `/categories.php` | All categories |
| `/filter.php?c={category}` | Filter by category |
| `/filter.php?a={area}` | Filter by area/cuisine |
| `/list.php?a=list` | List all areas |
| `/list.php?i=list` | List all ingredients |

---

## 📝 License

MIT — Free to use and modify.

---

*Built with ❤️ using React + TailwindCSS + TheMealDB API*
