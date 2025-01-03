import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Charger les favoris depuis le localStorage au montage
    const savedFavorites = localStorage.getItem('favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  // Sauvegarder les favoris dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (giftId: string) => {
    setFavorites(prev =>
      prev.includes(giftId)
        ? prev.filter(id => id !== giftId)
        : [...prev, giftId]
    )
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite: (giftId: string) => favorites.includes(giftId)
  }
} 