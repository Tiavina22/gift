import React from 'react'
import { SearchX } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-6 mb-6">
        <SearchX className="w-16 h-16 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Aucun cadeau trouvé
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
        Essayez de modifier vos filtres ou d'effectuer une nouvelle recherche.
      </p>
    </div>
  )
} 