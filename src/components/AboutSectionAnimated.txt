// AboutUsPage.jsx (or your About page)
'use client'

import AnimatedBackground from '@/components/AnimatedBackground'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Hero Section with Animated Background */}
      <section className="relative h-[80vh] overflow-hidden">
        <AnimatedBackground />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About Our Community
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Creating supportive living spaces for individuals seeking stability and independence
            </p>
            <div className="animate-bounce mt-12">
              <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your About Us content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Your existing About Us content */}
      </div>
    </div>
  )
}