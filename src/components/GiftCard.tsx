import React from 'react'
import { Heart, ExternalLink } from 'lucide-react'
import type { Gift } from '../types'

type GiftCardProps = {
  gift: Gift
  isFavorite: boolean
  onToggleFavorite: (giftId: string) => void
}

export function GiftCard({ gift, isFavorite, onToggleFavorite }: GiftCardProps) {
  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <img
          src={gift.imageSrc}
          alt={gift.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => onToggleFavorite(gift.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white transform transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-300 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{gift.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{gift.description}</p>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {gift.categories.map(category => (
              <span key={category} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                {category}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-indigo-600">{gift.price.toFixed(2)} MGA</span>
            <a
              href={gift.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              Voir l'offre
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}