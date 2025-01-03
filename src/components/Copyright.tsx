import React from 'react'

export function Copyright() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} Tiavina.
        </p>
      </div>
    </footer>
  )
} 