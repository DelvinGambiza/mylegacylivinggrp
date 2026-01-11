import MovingCards from './MovingCards1'

export default function AboutSection() {
  return (
    <>
      {/* Original About Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F3A5F] mb-4">
              About Us
            </h2>
            <div className="w-24 h-1 bg-[#C6A75E] mx-auto"></div>
          </div>
          
          {/* Card Container */}
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* First Card */}
            <div className="h-full">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-[#E5E7EB] h-full flex flex-col">
                <p className="text-lg text-[#2E2E2E] mb-6">
                  My Legacy Living Group (MLLG) provides secure, community-based independent 
                  living for adults seeking stability, routine, and a supportive environment.
                </p>
                <p className="text-lg text-[#2E2E2E]">
                  Our trauma-informed, person-centered approach ensures every resident is 
                  treated with dignity while receiving structure and supervision that promotes 
                  independence.
                </p>
              </div>
            </div>
            
            {/* Second Card */}
            <div className="h-full">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-[#E5E7EB] h-full flex flex-col">
                <h3 className="text-2xl font-semibold text-[#1F3A5F] mb-4">
                  Our Mission
                </h3>
                <p className="text-[#2E2E2E] mb-6">
                  To safeguard and empower the individuals we serve, providing the foundation 
                  needed to rebuild legacy and move toward long-term independence.
                </p>
                <div className="mt-auto pt-6 border-t border-[#E5E7EB]">
                  <h4 className="text-xl font-semibold text-[#1F3A5F] mb-3">Our Homes Offer:</h4>
                  <ul className="space-y-2">
                    {[
                      "Supervised, fully furnished environments",
                      "24/7 support and wellness checks",
                      "Trauma-informed care",
                      "Community-based living"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[#8FAF9B] rounded-full mr-3 mt-2"></div>
                        <span className="text-[#2E2E2E]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Moving Cards Section */}
      <MovingCards />
    </>
  )
}