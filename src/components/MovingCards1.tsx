'use client'

import { useEffect, useState } from 'react'

const cards = [
  {
    id: 1,
    title: 'Responsibility',
    description: 'We take our commitment to residents seriously, providing reliable support and accountable care.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'from-[#8FAF9B] to-[#8FAF9B]/80'
  },
  {
    id: 2,
    title: 'Stability',
    description: 'Creating consistent routines and secure environments that foster personal growth.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: 'from-[#1F3A5F] to-[#1F3A5F]/80'
  },
  {
    id: 3,
    title: 'Dignity',
    description: 'Treating every individual with inherent worth and respecting their personal journey.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    color: 'from-[#C6A75E] to-[#C6A75E]/80'
  },
  {
    id: 4,
    title: 'Respect',
    description: 'Honoring personal boundaries, choices, and the unique path of each resident.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
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

  // Create a circular array of cards to always show 3
  const visibleCards = []
  for (let i = 0; i < 3; i++) {
    visibleCards.push(cards[(currentIndex + i) % cards.length])
  }

  return (
    <div className="relative py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAFAF7] to-white/50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F3A5F] mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-[#2E2E2E]/70 max-w-2xl mx-auto">
            The principles that guide every aspect of our supportive living communities
          </p>
          <div className="w-24 h-1 bg-[#C6A75E] mx-auto mt-4"></div>
        </div>

        {/* Cards Container */}
        <div className="relative h-[320px] overflow-hidden">
          {/* Moving Cards */}
          <div className="flex justify-center gap-8">
            {visibleCards.map((card, index) => (
              <div
                key={card.id}
                className={`
                  absolute transition-all duration-1000 ease-in-out
                  ${index === 0 ? 'left-1/4 transform -translate-x-1/2 scale-100 opacity-100 z-20' : ''}
                  ${index === 1 ? 'left-1/2 transform -translate-x-1/2 scale-90 opacity-90 z-10' : ''}
                  ${index === 2 ? 'left-3/4 transform -translate-x-1/2 scale-80 opacity-80 z-0' : ''}
                `}
              >
                <div className="w-80 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6`}>
                    <div className="text-white">
                      {card.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-[#1F3A5F] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#2E2E2E]/70 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center space-x-3 mt-12">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#1F3A5F] w-8' : 'bg-[#E5E7EB] hover:bg-[#8FAF9B]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Manual Navigation Buttons */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)}
            className="p-2 rounded-full bg-white border border-[#E5E7EB] hover:border-[#8FAF9B] hover:bg-[#FAFAF7] transition-colors"
            aria-label="Previous value"
          >
            <svg className="w-6 h-6 text-[#1F3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-sm text-[#2E2E2E]/60">
            {currentIndex + 1} of {cards.length}
          </span>
          
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % cards.length)}
            className="p-2 rounded-full bg-white border border-[#E5E7EB] hover:border-[#8FAF9B] hover:bg-[#FAFAF7] transition-colors"
            aria-label="Next value"
          >
            <svg className="w-6 h-6 text-[#1F3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}