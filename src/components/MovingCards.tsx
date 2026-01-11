'use client'

import { useEffect, useState } from 'react'

const cards = [
  {
    id: 1,
    title: 'Responsibility',
    description: 'We take our commitment to residents seriously, providing reliable support and accountable care.',
    icon: '✓',
    color: 'from-[#8FAF9B] to-[#8FAF9B]/80'
  },
  {
    id: 2,
    title: 'Stability',
    description: 'Creating consistent routines and secure environments that foster personal growth.',
    icon: '🏠',
    color: 'from-[#1F3A5F] to-[#1F3A5F]/80'
  },
  {
    id: 3,
    title: 'Dignity',
    description: 'Treating every individual with inherent worth and respecting their personal journey.',
    icon: '👑',
    color: 'from-[#C6A75E] to-[#C6A75E]/80'
  },
  {
    id: 4,
    title: 'Respect',
    description: 'Honoring personal boundaries, choices, and the unique path of each resident.',
    icon: '🙏',
    color: 'from-[#8FAF9B] to-[#C6A75E]'
  }
]

export default function MovingCards() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
    }, 3000) // Change card every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1F3A5F] mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-[#2E2E2E]/70 max-w-2xl mx-auto">
            The principles that guide every aspect of our supportive living communities
          </p>
          <div className="w-24 h-1 bg-[#C6A75E] mx-auto mt-4"></div>
        </div>

        {/* Cards Container */}
        <div className="relative h-80 overflow-hidden">
          {/* Moving Cards */}
          <div className="flex justify-center gap-6">
            {cards.map((card, index) => {
              // Calculate position based on index and currentIndex
              const position = (index - currentIndex + cards.length) % cards.length
              
              return (
                <div
                  key={card.id}
                  className={`
                    absolute w-72 transition-all duration-500 ease-in-out
                    ${position === 0 
                      ? 'left-1/4 transform -translate-x-1/2 scale-100 opacity-100 z-20' 
                      : position === 1 
                      ? 'left-1/2 transform -translate-x-1/2 scale-90 opacity-80 z-10' 
                      : position === 2
                      ? 'left-3/4 transform -translate-x-1/2 scale-80 opacity-60 z-0'
                      : 'hidden'
                    }
                  `}
                >
                  <div className="bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-6">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 text-white text-2xl`}>
                      {card.icon}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-[#1F3A5F] mb-3">
                      {card.title}
                    </h3>
                    <p className="text-[#2E2E2E]/70">
                      {card.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#1F3A5F] w-6' : 'bg-[#E5E7EB] hover:bg-[#8FAF9B]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}