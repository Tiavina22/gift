import React, { useRef, useEffect } from 'react'
import { X, Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import type { Gift } from '../types'
import { Image } from './Image'
import { formatPrice } from '../utils/formatters'

type GiftDialogProps = {
  gift: Gift
  isOpen: boolean
  onClose: () => void
}

export function GiftDialog({ gift, isOpen, onClose }: GiftDialogProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('dialog-open')
    } else {
      document.body.classList.remove('dialog-open')
    }
    
    return () => {
      document.body.classList.remove('dialog-open')
    }
  }, [isOpen])

  const exportAsImage = async () => {
    if (!cardRef.current) return

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // Meilleure qualité
      })

      // Convertir en PNG et télécharger
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = `${gift.name.toLowerCase().replace(/\s+/g, '-')}-card.png`
      link.click()
    } catch (error) {
      console.error('Erreur lors de l\'export de l\'image:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-xl transition-all max-w-2xl w-full">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Card Content - Cette partie sera capturée */}
          <div ref={cardRef} className="p-6 bg-white dark:bg-gray-800">
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <Image
                src={gift.imageSrc}
                alt={gift.name}
                className="w-full h-64 rounded-lg"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{gift.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{gift.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Prix</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(gift.price)} MGA
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Catégories</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {gift.categories.map(category => (
                    <span key={category} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Pour qui ?</h3>
                <div className="flex flex-wrap gap-2">
                  {gift.recipientTypes.map(type => (
                    <span key={type} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Occasions</h3>
                <div className="flex flex-wrap gap-2">
                  {gift.occasions.map(occasion => (
                    <span key={occasion} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300">
                      {occasion}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="p-6 pt-0">
            <div className="flex gap-4">
              <button
                onClick={exportAsImage}
                className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <Download className="w-4 h-4" />
                Save to card
              </button>
              <a
                href={gift.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Voir l'offre
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 