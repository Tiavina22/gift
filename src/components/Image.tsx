import React, { useState } from 'react'
import { ImageIcon } from 'lucide-react'

type ImageProps = {
  src: string
  alt: string
  className?: string
}

export function Image({ src, alt, className = '' }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Image de remplacement pendant le chargement */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
      )}

      {/* Image réelle */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />

      {/* Affichage en cas d'erreur */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
      )}
    </div>
  )
} 