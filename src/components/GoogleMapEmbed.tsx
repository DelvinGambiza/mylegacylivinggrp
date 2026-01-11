'use client'

import { useState } from 'react'

const locationOptions = [
  {
    id: 1,
    name: 'Maryland',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198816.1916055825!2d-77.15466230000002!3d38.8935128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6de5af6e45b%3A0xc2524522d4885d2a!2sWashington%2C%20DC!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
    cities: ['Baltimore', 'Annapolis', 'Columbia'],
    center: 'Washington, DC area'
  },
  {
    id: 2,
    name: 'Indiana',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196237.82937468714!2d-86.28138119999998!3d39.768403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886b50ffa7796a03%3A0xd68e9df640b9ea7c!2sIndianapolis%2C%20IN!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
    cities: ['Indianapolis', 'Fort Wayne', 'Evansville'],
    center: 'Indianapolis area'
  },
  {
    id: 3,
    name: 'Illinois',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190256.09893789104!2d-87.8967432!3d41.8337329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
    cities: ['Chicago', 'Springfield', 'Peoria'],
    center: 'Chicago area'
  }
]

export default function GoogleMapEmbed() {
  const [selectedLocation, setSelectedLocation] = useState(locationOptions[0])

  return (
    <div className="space-y-6">
      {/* Location Selector */}
      <div className="flex flex-wrap gap-3 justify-center">
        {locationOptions.map((location) => (
          <button
            key={location.id}
            onClick={() => setSelectedLocation(location)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedLocation.id === location.id
                ? 'bg-[#1F3A5F] text-white'
                : 'bg-white text-[#2E2E2E] border border-[#E5E7EB] hover:border-[#8FAF9B]'
            }`}
          >
            {location.name}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-[#E5E7EB]">
        <iframe
          src={selectedLocation.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${selectedLocation.name} Service Area Map`}
        />
        
        {/* Overlay Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-md">
            <h3 className="font-bold text-lg text-[#1F3A5F]">{selectedLocation.name}</h3>
            <p className="text-sm text-[#2E2E2E] mt-1">Serving the {selectedLocation.center}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedLocation.cities.map((city, index) => (
                <span
                  key={index}
                  className="inline-block bg-[#8FAF9B] text-white px-3 py-1 rounded-full text-xs font-medium"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-[#2E2E2E]">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#1F3A5F] mr-2"></div>
          <span>Service Areas</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#8FAF9B] mr-2"></div>
          <span>Major Cities Served</span>
        </div>
      </div>
    </div>
  )
}