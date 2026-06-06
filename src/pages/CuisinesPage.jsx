import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllAreas } from '../services/mealApi'
import ErrorState from '../components/ErrorState'

// Map area names to flag emojis for a nice visual
const AREA_FLAGS = {
  American: '🇺🇸', British: '🇬🇧', Canadian: '🇨🇦', Chinese: '🇨🇳',
  Croatian: '🇭🇷', Dutch: '🇳🇱', Egyptian: '🇪🇬', Filipino: '🇵🇭',
  French: '🇫🇷', Greek: '🇬🇷', Indian: '🇮🇳', Irish: '🇮🇪',
  Italian: '🇮🇹', Jamaican: '🇯🇲', Japanese: '🇯🇵', Kenyan: '🇰🇪',
  Malaysian: '🇲🇾', Mexican: '🇲🇽', Moroccan: '🇲🇦', Polish: '🇵🇱',
  Portuguese: '🇵🇹', Russian: '🇷🇺', Spanish: '🇪🇸', Thai: '🇹🇭',
  Tunisian: '🇹🇳', Turkish: '🇹🇷', Ukrainian: '🇺🇦', Unknown: '🌍',
  Vietnamese: '🇻🇳',
}

const AREA_DESCRIPTIONS = {
  American: 'BBQ, burgers, comfort food classics',
  British: 'Pies, roasts & traditional puddings',
  Canadian: 'Poutine, maple-glazed & hearty stews',
  Chinese: 'Stir-fries, dim sum & ancient recipes',
  French: 'Croissants, coq au vin & fine cuisine',
  Indian: 'Curries, biryanis & spiced delights',
  Italian: 'Pasta, risotto & wood-fired pizza',
  Japanese: 'Ramen, sushi & umami perfection',
  Mexican: 'Tacos, enchiladas & vibrant salsas',
  Thai: 'Pad Thai, green curry & fresh herbs',
}

export default function CuisinesPage() {
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const fetchAreas = () => {
    setLoading(true)
    getAllAreas()
      .then(setAreas)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
    fetchAreas()
  }, [])

  return (
    <div className="min-h-screen">
      <div className="bg-charcoal-800 text-cream-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="font-display text-4xl font-bold mb-2">World Cuisines</h1>
          <p className="font-body text-charcoal-300 text-base">
            Take your taste buds on a journey across {areas.length || 29} countries and cultures.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="skeleton h-28 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={fetchAreas} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            {areas.map((area, i) => {
              const name = area.strArea
              const flag = AREA_FLAGS[name] || '🌍'
              const desc = AREA_DESCRIPTIONS[name] || 'Traditional recipes & flavours'

              return (
                <button
                  key={name}
                  onClick={() => navigate(`/area/${encodeURIComponent(name)}`)}
                  className="group bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-left"
                  style={{
                    opacity: 0,
                    animation: `slideUp 0.4s ease-out ${i * 40}ms forwards`,
                  }}
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {flag}
                  </div>
                  <h3 className="font-display font-semibold text-charcoal-800 text-sm mb-1">
                    {name}
                  </h3>
                  <p className="font-body text-charcoal-400 text-xs leading-relaxed">
                    {desc}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-forest-600 text-xs font-body font-500">
                    <span>Explore</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
