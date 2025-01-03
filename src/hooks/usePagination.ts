import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export function usePagination(itemsLength: number, itemsPerPage: number) {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Récupérer la page depuis l'URL ou localStorage, sinon utiliser 1
  const initialPage = parseInt(searchParams.get('page') || localStorage.getItem('currentPage') || '1')
  const [currentPage, setCurrentPage] = useState(initialPage)
  
  const totalPages = Math.ceil(itemsLength / itemsPerPage)

  // Si la page actuelle est supérieure au nombre total de pages, revenir à la page 1
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  // Mettre à jour l'URL et le localStorage quand la page change
  useEffect(() => {
    setSearchParams(params => {
      params.set('page', currentPage.toString())
      return params
    })
    localStorage.setItem('currentPage', currentPage.toString())
  }, [currentPage, setSearchParams])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  
  return {
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem
  }
} 