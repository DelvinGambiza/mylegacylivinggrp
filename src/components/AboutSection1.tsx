export default function AboutSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F3A5F] mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-[#C6A75E] mx-auto"></div>
        </div>
        
        {/* Card Container */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Card with text */}
          <div className="bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#8FAF9B] to-[#C6A75E] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              <p className="text-lg text-[#2E2E2E] mb-6 leading-relaxed">
                My Legacy Living Group (MLLG) provides secure, community-based independent 
                living for adults seeking stability, routine, and a supportive environment.
              </p>
              <p className="text-lg text-[#2E2E2E] leading-relaxed">
                Our trauma-informed, person-centered approach ensures every resident is 
                treated with dignity while receiving structure and supervision that promotes 
                independence.
              </p>
            </div>
            
            {/* Make bullets visible with better styling */}
            <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
              <h4 className="text-xl font-semibold text-[#1F3A5F] mb-4">Our Homes Offer:</h4>
              <ul className="space-y-4">
                {[
                  "Supervised, fully furnished environments",
                  "24/7 support and wellness checks",
                  "Trauma-informed care",
                  "Community-based living"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-[#8FAF9B] to-[#C6A75E] rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-[#2E2E2E] text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="bg-[#FAFAF7] p-8 rounded-xl border border-[#E5E7EB]">
            <h3 className="text-2xl font-semibold text-[#1F3A5F] mb-4">
              Our Mission
            </h3>
            <p className="text-[#2E2E2E] mb-6">
              To safeguard and empower the individuals we serve, providing the foundation 
              needed to rebuild legacy and move toward long-term independence.
            </p>
            
            {/* Stats or additional info */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-[#1F3A5F]">3</div>
                <div className="text-sm text-[#2E2E2E]">States</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-[#1F3A5F]">24/7</div>
                <div className="text-sm text-[#2E2E2E]">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}