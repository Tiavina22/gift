import React, { useState } from 'react'
import { Gift as GiftIcon, Shuffle, Heart } from 'lucide-react'
import { Filters } from './components/Filters'
import { GiftGrid } from './components/GiftGrid'
import type { PriceRange, RecipientType, Interest, Category, Occasion } from './types'
import { ThemeProvider } from './theme/ThemeContext'
import { ThemeToggle } from './components/ThemeToggle'
import { useFavorites } from './hooks/useFavorites'
import { mockGifts } from './data/mockGifts'
import { Copyright } from './components/Copyright'

function App() {
  const [priceRange, setPriceRange] = useState<PriceRange>({})
  const [selectedRecipient, setSelectedRecipient] = useState<RecipientType | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false)
  const [sortOrder, setSortOrder] = useState<'relevance' | 'price-asc' | 'price-desc'>('relevance')
  const { favorites, toggleFavorite } = useFavorites()

  const filteredGifts = mockGifts.filter((gift) => {
    if (priceRange.min && gift.price < priceRange.min) return false
    if (priceRange.max && gift.price > priceRange.max) return false
    if (selectedRecipient && !gift.recipientTypes.includes(selectedRecipient)) return false
    if (selectedInterests.length > 0 && !selectedInterests.some(interest => gift.interests.includes(interest))) return false
    if (selectedCategories.length > 0 && !selectedCategories.some(category => gift.categories.includes(category))) return false
    if (selectedOccasion && !gift.occasions.includes(selectedOccasion)) return false
    return true
  })

  const getRandomSuggestions = () => {
    setSelectedRecipient(null)
    setSelectedInterests([])
    setSelectedCategories([])
    setSelectedOccasion(null)
    setPriceRange({})
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GiftIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Idées Cadeaux</h1>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {favorites.length} favori{favorites.length !== 1 ? 's' : ''}
                </div>
                <button
                  onClick={getRandomSuggestions}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <Shuffle className="w-4 h-4" />
                  Suggestions aléatoires
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
            <aside>
              <Filters
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedRecipient={selectedRecipient}
                setSelectedRecipient={setSelectedRecipient}
                selectedInterests={selectedInterests}
                setSelectedInterests={setSelectedInterests}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedOccasion={selectedOccasion}
                setSelectedOccasion={setSelectedOccasion}
              />
            </aside>

            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    {filteredGifts.length} résultat{filteredGifts.length !== 1 ? 's' : ''}
                  </p>
                  <button
                    onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      showOnlyFavorites
                        ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-2 border-red-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
                    Favoris
                  </button>
                </div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="relevance">Pertinence</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
              </div>

              <GiftGrid
                gifts={showOnlyFavorites ? filteredGifts.filter(gift => favorites.includes(gift.id)) : filteredGifts}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                sortOrder={sortOrder}
              />
            </div>
          </div>
        </main>

        <Copyright />
      </div>
    </ThemeProvider>
  )
}

export default App