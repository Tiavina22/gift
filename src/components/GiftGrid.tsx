import React, { useState } from 'react'
import type { Gift } from '../types'
import { Heart } from 'lucide-react'
import { GiftDialog } from './GiftDialog'
import { Pagination } from './Pagination'
import { EmptyState } from './EmptyState'
import { Image } from './Image'
import { formatPrice } from '../utils/formatters'
import { usePagination } from '../hooks/usePagination'

type GiftGridProps = {
  gifts: Gift[]
  favorites: string[]
  onToggleFavorite: (giftId: string) => void
  sortOrder: 'relevance' | 'price-asc' | 'price-desc'
}

const ITEMS_PER_PAGE = 9 // Nombre d'éléments par page

export function GiftGrid({ gifts, favorites, onToggleFavorite, sortOrder }: GiftGridProps) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)
  
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem
  } = usePagination(gifts.length, ITEMS_PER_PAGE)

  const sortedGifts = [...gifts].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price
    if (sortOrder === 'price-desc') return b.price - a.price
    return 0
  })

  const currentGifts = sortedGifts.slice(indexOfFirstItem, indexOfLastItem)

  if (gifts.length === 0) {
    return <EmptyState />
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentGifts.map((gift) => (
          <div key={gift.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="relative">
              <Image
                src={gift.imageSrc}
                alt={gift.name}
                className="w-full h-48"
              />
              <button
                onClick={() => onToggleFavorite(gift.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.includes(gift.id)
                      ? 'text-red-500 fill-current'
                      : 'text-gray-400 dark:text-gray-300'
                  }`}
                />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{gift.name}</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">{gift.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(gift.price)} MGA
                </span>
                <button
                  onClick={() => setSelectedGift(gift)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Voir détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {selectedGift && (
        <GiftDialog
          gift={selectedGift}
          isOpen={true}
          onClose={() => setSelectedGift(null)}
        />
      )}
    </>
  )
}