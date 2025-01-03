import React from 'react'
import { Filter, X, ChevronDown } from 'lucide-react'
import type { PriceRange, RecipientType, Interest, Category, Occasion } from '../types'
import { FilterSection } from './FilterSection'

type FiltersProps = {
  priceRange: PriceRange
  setPriceRange: (range: PriceRange) => void
  selectedRecipient: RecipientType | null
  setSelectedRecipient: (type: RecipientType | null) => void
  selectedInterests: Interest[]
  setSelectedInterests: (interests: Interest[]) => void
  selectedCategories: Category[]
  setSelectedCategories: (categories: Category[]) => void
  selectedOccasion: Occasion | null
  setSelectedOccasion: (occasion: Occasion | null) => void
}

const recipientTypes: RecipientType[] = ['homme', 'femme', 'enfant', 'adolescent', 'senior']
const interests: Interest[] = ['sports', 'technologie', 'mode', 'cuisine', 'lecture', 'jeux', 'musique', 'art', 'jardinage', 'voyage']
const categories: Category[] = ['électronique', 'décoration', 'livres', 'jeux', 'mode', 'sport', 'cuisine', 'beauté']
const occasions: Occasion[] = ['anniversaire', 'noël', 'mariage', 'naissance', 'saint-valentin', 'fête-des-mères', 'fête-des-pères']

export function Filters(props: FiltersProps) {
  const hasActiveFilters = 
    Object.keys(props.priceRange).length > 0 ||
    props.selectedRecipient !== null ||
    props.selectedInterests.length > 0 ||
    props.selectedCategories.length > 0 ||
    props.selectedOccasion !== null

  const resetFilters = () => {
    props.setPriceRange({})
    props.setSelectedRecipient(null)
    props.setSelectedInterests([])
    props.setSelectedCategories([])
    props.setSelectedOccasion(null)
  }

  return (
    <div className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Filtres</h3>
        
        {/* Prix */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prix
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Min"
              value={props.priceRange.min || ''}
              onChange={(e) => props.setPriceRange({ ...props.priceRange, min: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              placeholder="Max"
              value={props.priceRange.max || ''}
              onChange={(e) => props.setPriceRange({ ...props.priceRange, max: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Pour qui ? */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pour qui ?
          </label>
          <select 
                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                   value={props.selectedRecipient || ''}
                   onChange={(e) => props.setSelectedRecipient(e.target.value ? e.target.value as RecipientType : null)}
                 >
            <option value="">Tous</option>
            {recipientTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Centres d'intérêt */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Centres d'intérêt
          </label>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  props.setSelectedInterests(
                    props.selectedInterests.includes(interest)
                      ? props.selectedInterests.filter((i) => i !== interest)
                      : [...props.selectedInterests, interest]
                  )
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  props.selectedInterests.includes(interest)
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-2 border-indigo-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Catégories */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Catégories
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  props.setSelectedCategories(
                    props.selectedCategories.includes(category)
                      ? props.selectedCategories.filter((c) => c !== category)
                      : [...props.selectedCategories, category]
                  )
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  props.selectedCategories.includes(category)
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-2 border-purple-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Occasion */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Occasion
          </label>
          <div className="flex flex-wrap gap-2">
            {occasions.map((occasion) => (
              <button
                key={occasion}
                onClick={() => props.setSelectedOccasion(props.selectedOccasion === occasion ? null : occasion)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  props.selectedOccasion === occasion
                    ? 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 border-2 border-pink-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {occasion}
              </button>
            ))}
          </div>
        </div>

        {/* Bouton de réinitialisation */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="w-full mt-4 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>
    </div>
  )
}