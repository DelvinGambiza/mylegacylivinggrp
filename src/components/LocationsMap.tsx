'use client'

import Link from 'next/link'
import GoogleMapEmbed from './GoogleMapEmbed' // or StaticGoogleMap

export default function LocationsMap() {
  const locations = [
    { state: 'Maryland', cities: ['Baltimore', 'Annapolis', 'Columbia'] },
    { state: 'Indiana', cities: ['Indianapolis', 'Fort Wayne', 'Evansville'] },
    { state: 'Illinois', cities: ['Chicago', 'Springfield', 'Peoria'] }
  ]

  return (
    <section className="py-16 px-4 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F3A5F] mb-4">
            Our Service Areas
          </h2>
          <p className="text-lg text-[#2E2E2E] max-w-2xl mx-auto mb-8">
            We provide supportive living communities across three states. Explore our locations below.
          </p>
          <div className="w-24 h-1 bg-[#C6A75E] mx-auto"></div>
        </div>

        {/* Interactive Map */}
        <div className="mb-12">
          <GoogleMapEmbed />
        </div>

        {/* Location Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {locations.map((location, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-[#E5E7EB] hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8FAF9B] to-[#C6A75E] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1F3A5F]">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#1F3A5F]">{location.state}</h3>
              </div>
              
              <div className="text-center">
                <h4 className="font-semibold text-[#2E2E2E] mb-3">Serving:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {location.cities.map((city, cityIndex) => (
                    <span
                      key={cityIndex}
                      className="inline-block bg-[#FAFAF7] text-[#2E2E2E] px-4 py-2 rounded-full text-sm border border-[#E5E7EB]"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button className="text-[#1F3A5F] font-semibold hover:text-opacity-80 transition">
                  Learn About {location.state} Homes
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-[#8FAF9B] to-[#C6A75E] rounded-lg">
            <Link 
              href="/apply" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1F3A5F] rounded-lg font-semibold hover:bg-[#FAFAF7] transition-colors group"
            >
              <div className="text-center">
                <p className="font-medium">
                  Ready to find your perfect home?
                </p>
                <p className="text-sm mt-1">
                  Submit an inquiry form to confirm availability
                </p>
              </div>
              <svg className="w-5 h-5 ml-2 text-[#8FAF9B] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}