import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FilterSectionProps = {
  title: string
  children: React.ReactNode
}

export function FilterSection({ title, children }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-4 group"
      >
        <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
        }`}
      >
        {children}
      </div>
    </div>
  )
}