// components/AnimatedBackground.jsx
'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedBackground({ images = [] }) {
  const containerRef = useRef(null)

  // Default images if none provided
  const defaultImages = [
    '/b1.jpeg',
    '/b2.jpeg',
    '/b3.jpeg',
    '/b4.jpeg'
  ]

  const backgroundImages = images.length > 0 ? images : defaultImages

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create background layers
    const layers = backgroundImages.map((img, index) => {
      const layer = document.createElement('div')
      layer.style.backgroundImage = `url(${img})`
      layer.className = 'absolute inset-0 bg-cover bg-center'
      layer.style.opacity = '0.7'
      layer.style.animation = `slide ${20 + index * 5}s linear infinite`
      layer.style.animationDelay = `${index * -5}s`
      container.appendChild(layer)
      return layer
    })

    // Cleanup
    return () => {
      layers.forEach(layer => layer.remove())
    }
  }, [backgroundImages])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1F3A5F 0%, #8FAF9B 100%)'
      }}
    />
  )
}