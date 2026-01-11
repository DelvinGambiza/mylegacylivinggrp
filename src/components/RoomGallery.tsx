'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const mockRooms = [
  {
    id: '1',
    title: 'Private Studio',
    location: 'Maryland',
    room_type: 'single',
    price: 1200,
    description: 'Private studio with ensuite bathroom and kitchenette. Perfect for individuals seeking independence with support.',
    features: ['Private Bathroom', 'Kitchenette', 'Wi-Fi', 'Utilities Included', '24/7 Support'],
    image: '/1.jpg',
    size: '300 sq ft'
  },
  {
    id: '2',
    title: 'Shared Suite',
    location: 'Indiana',
    room_type: 'shared',
    price: 800,
    description: 'Shared suite with two bedrooms and shared living space. Great for building community connections.',
    features: ['Shared Bathroom', 'Living Room', 'Kitchen Access', 'Laundry', 'Community Areas'],
    image: '/2.jpg',
    size: '400 sq ft'
  },
  {
    id: '3',
    title: 'Standard Room',
    location: 'Illinois',
    room_type: 'single',
    price: 950,
    description: 'Standard single room with shared common areas. Includes all amenities and support services.',
    features: ['Shared Bathroom', 'Common Kitchen', '24/7 Support', 'Wi-Fi', 'Housekeeping'],
    image: '/1.jpg',
    size: '250 sq ft'
  },
  {
    id: '4',
    title: 'Deluxe Suite',
    location: 'Maryland',
    room_type: 'single',
    price: 1400,
    description: 'Spacious deluxe suite with private balcony and upgraded amenities.',
    features: ['Private Bathroom', 'Full Kitchen', 'Balcony', 'Premium Furnishings', 'Utilities Included'],
    image: '/2.jpg',
    size: '450 sq ft'
  },
  {
    id: '5',
    title: 'Companion Room',
    location: 'Indiana',
    room_type: 'shared',
    price: 700,
    description: 'Companion-style room for those who prefer shared living arrangements.',
    features: ['Shared Bathroom', 'Shared Kitchen', 'Social Activities', 'Support Groups', 'Laundry'],
    image: '/1.jpg',
    size: '350 sq ft'
  },
  {
    id: '6',
    title: 'Accessible Room',
    location: 'Illinois',
    room_type: 'single',
    price: 1100,
    description: 'Fully accessible room designed for mobility needs with additional support features.',
    features: ['Wheelchair Accessible', 'Adaptive Bathroom', 'Emergency Call System', '24/7 Care', 'Utilities'],
    image: '/2.jpg',
    size: '350 sq ft'
  }
]

export default function RoomGallery() {
  const [rooms] = useState(mockRooms)
  const [filter, setFilter] = useState('all')

  // Filter rooms based on selection
  const filteredRooms = filter === 'all' 
    ? rooms 
    : rooms.filter(room => room.location.toLowerCase() === filter.toLowerCase())

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F3A5F] mb-4">
            Available Rooms
          </h2>
          <p className="text-lg text-[#2E2E2E] max-w-2xl mx-auto">
            Browse our fully furnished, supportive living spaces designed for comfort and independence.
          </p>
          <div className="w-24 h-1 bg-[#C6A75E] mx-auto mt-4"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-[#1F3A5F] text-white' 
                : 'bg-white text-[#2E2E2E] border border-[#E5E7EB] hover:border-[#8FAF9B]'
            }`}
          >
            All Locations
          </button>
          <button
            onClick={() => setFilter('maryland')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'maryland' 
                ? 'bg-[#1F3A5F] text-white' 
                : 'bg-white text-[#2E2E2E] border border-[#E5E7EB] hover:border-[#8FAF9B]'
            }`}
          >
            Maryland
          </button>
          <button
            onClick={() => setFilter('indiana')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'indiana' 
                ? 'bg-[#1F3A5F] text-white' 
                : 'bg-white text-[#2E2E2E] border border-[#E5E7EB] hover:border-[#8FAF9B]'
            }`}
          >
            Indiana
          </button>
          <button
            onClick={() => setFilter('illinois')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              filter === 'illinois' 
                ? 'bg-[#1F3A5F] text-white' 
                : 'bg-white text-[#2E2E2E] border border-[#E5E7EB] hover:border-[#8FAF9B]'
            }`}
          >
            Illinois
          </button>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#2E2E2E]">No rooms currently available for this location. Please check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E5E7EB] hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-64">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-[#8FAF9B] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {room.availability_status || 'Available'}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm">
                    {room.size}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-[#1F3A5F]">{room.title}</h3>
                    <span className="text-2xl font-bold text-[#1F3A5F]">
                      ${room.price?.toLocaleString()}/mo
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-[#2E2E2E] mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{room.location}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1.205a8.959 8.959 0 01-4.5 1.194" />
                      </svg>
                      <span className="capitalize">{room.room_type} room</span>
                    </div>
                  </div>

                  <p className="text-[#2E2E2E] mb-6 flex-grow">{room.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-[#1F3A5F] mb-3">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.features.slice(0, 4).map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center bg-[#FAFAF7] text-[#2E2E2E] px-3 py-1.5 rounded-lg text-sm border border-[#E5E7EB]"
                        >
                          <svg className="w-3 h-3 mr-1.5 text-[#8FAF9B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </span>
                      ))}
                      {room.features.length > 4 && (
                        <span className="inline-flex items-center text-[#2E2E2E] px-3 py-1.5 text-sm">
                          +{room.features.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/rooms/${room.id}`}
                      className="flex-1 text-center border border-[#1F3A5F] text-[#1F3A5F] py-3 rounded-lg font-medium hover:bg-[#1F3A5F] hover:text-white transition-colors"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/apply?room=${room.id}`}
                      className="flex-1 text-center bg-[#8FAF9B] text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/rooms"
            className="inline-flex items-center text-[#1F3A5F] font-semibold hover:text-opacity-80 transition px-6 py-3 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#8FAF9B]"
          >
            View all available rooms
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}