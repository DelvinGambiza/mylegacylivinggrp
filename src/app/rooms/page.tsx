'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const allRooms = [
  {
    id: '1',
    title: 'Private Studio',
    location: 'Maryland',
    room_type: 'single',
    price: 1200,
    description: 'Private studio with ensuite bathroom and kitchenette. Perfect for individuals seeking independence with support.',
    features: ['Private Bathroom', 'Kitchenette', 'Wi-Fi', 'Utilities Included', '24/7 Support'],
    image: '/1.jpg',
    size: '300 sq ft',
    available: true
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
    size: '400 sq ft',
    available: true
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
    size: '250 sq ft',
    available: true
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
    size: '450 sq ft',
    available: true
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
    size: '350 sq ft',
    available: true
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
    size: '350 sq ft',
    available: true
  }
]

export default function RoomsPage() {
  const [rooms] = useState(allRooms)
  const [filter, setFilter] = useState('all')
  const [roomType, setRoomType] = useState('all')
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  // Apply filters
  const filteredRooms = rooms.filter(room => {
    const locationMatch = filter === 'all' || room.location.toLowerCase() === filter.toLowerCase()
    const typeMatch = roomType === 'all' || room.room_type === roomType
    return locationMatch && typeMatch
  })

  return (
    <div className="min-h-screen bg-[#FAFAF7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1F3A5F] mb-4">
            Available Rooms
          </h1>
          <p className="text-lg text-[#2E2E2E] max-w-3xl mx-auto mb-8">
            Browse our fully furnished, supportive living spaces designed for comfort, stability, and independence.
          </p>
          <div className="w-24 h-1 bg-[#C6A75E] mx-auto"></div>
        </div>

        {/* Compact Filter Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left side - Filter title and toggle for mobile */}
              <div className="flex items-center justify-between md:justify-start">
                <div className="flex items-center gap-2">
                  {/* Filter Icon */}
                  <svg className="w-5 h-5 text-[#1F3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-[#1F3A5F]">Filters</h3>
                </div>
                <button
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                  className="md:hidden flex items-center gap-1 text-[#1F3A5F] p-2 rounded-lg hover:bg-[#FAFAF7]"
                >
                  {/* Chevron Down Icon */}
                  <svg className={`w-4 h-4 transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Right side - Active filters and clear button */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-4">
                  {/* Location Filter Dropdown */}
                  <div className="relative group">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#2E2E2E] bg-[#FAFAF7] border border-[#E5E7EB] rounded-lg px-4 py-2.5 hover:border-[#8FAF9B] cursor-pointer transition-colors">
                      {/* Map Pin Icon */}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{filter === 'all' ? 'All Locations' : filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
                      {/* Chevron Down Icon */}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {['all', 'maryland', 'indiana', 'illinois'].map((location) => (
                        <button
                          key={location}
                          onClick={() => setFilter(location)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            filter === location
                              ? 'bg-[#1F3A5F] text-white'
                              : 'text-[#2E2E2E] hover:bg-[#FAFAF7]'
                          }`}
                        >
                          {location === 'all' ? 'All Locations' : location.charAt(0).toUpperCase() + location.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Room Type Filter Dropdown */}
                  <div className="relative group">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#2E2E2E] bg-[#FAFAF7] border border-[#E5E7EB] rounded-lg px-4 py-2.5 hover:border-[#8FAF9B] cursor-pointer transition-colors">
                      {/* Users Icon */}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1.205a8.959 8.959 0 01-4.5 1.194" />
                      </svg>
                      <span className="capitalize">
                        {roomType === 'all' ? 'All Types' : `${roomType} Room`}
                      </span>
                      {/* Chevron Down Icon */}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {['all', 'single', 'shared'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setRoomType(type)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                            roomType === type
                              ? 'bg-[#1F3A5F] text-white'
                              : 'text-[#2E2E2E] hover:bg-[#FAFAF7]'
                          }`}
                        >
                          {type === 'all' ? 'All Types' : `${type} Room`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(filter !== 'all' || roomType !== 'all') && (
                  <button
                    onClick={() => { setFilter('all'); setRoomType('all'); }}
                    className="text-sm font-medium text-[#1F3A5F] hover:text-[#8FAF9B] transition-colors whitespace-nowrap"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Filter Dropdown */}
            {isFilterExpanded && (
              <div className="mt-4 md:hidden space-y-4 pt-4 border-t border-[#E5E7EB]">
                <div>
                  <h4 className="font-medium text-[#2E2E2E] mb-2 flex items-center gap-2">
                    {/* Map Pin Icon */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'maryland', 'indiana', 'illinois'].map((location) => (
                      <button
                        key={location}
                        onClick={() => setFilter(location)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          filter === location
                            ? 'bg-[#1F3A5F] text-white'
                            : 'bg-[#FAFAF7] text-[#2E2E2E] border border-[#E5E7EB] hover:border-[#8FAF9B]'
                        }`}
                      >
                        {location === 'all' ? 'All' : location.charAt(0).toUpperCase() + location.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-[#2E2E2E] mb-2 flex items-center gap-2">
                    {/* Users Icon */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1.205a8.959 8.959 0 01-4.5 1.194" />
                    </svg>
                    Room Type
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'single', 'shared'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setRoomType(type)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                          roomType === type
                            ? 'bg-[#1F3A5F] text-white'
                            : 'bg-[#FAFAF7] text-[#2E2E2E] border border-[#E5E7EB] hover:border-[#8FAF9B]'
                        }`}
                      >
                        {type === 'all' ? 'All Types' : type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-[#2E2E2E]">
            Showing <span className="font-semibold">{filteredRooms.length}</span> of <span className="font-semibold">{rooms.length}</span> rooms
          </p>
          {(filter !== 'all' || roomType !== 'all') && (
            <div className="flex items-center gap-2">
              {filter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-[#E8F0F5] text-[#1F3A5F] px-3 py-1 rounded-full text-sm">
                  {/* Map Pin Icon */}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  <button
                    onClick={() => setFilter('all')}
                    className="ml-1 hover:text-[#8FAF9B]"
                  >
                    ×
                  </button>
                </span>
              )}
              {roomType !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-[#E8F0F5] text-[#1F3A5F] px-3 py-1 rounded-full text-sm capitalize">
                  {/* Users Icon */}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1.205a8.959 8.959 0 01-4.5 1.194" />
                  </svg>
                  {roomType} Room
                  <button
                    onClick={() => setRoomType('all')}
                    className="ml-1 hover:text-[#8FAF9B]"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Rooms Grid */}
        {filteredRooms.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-[#E5E7EB]">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FAFAF7] flex items-center justify-center">
                {/* Filter Icon */}
                <svg className="w-8 h-8 text-[#8FAF9B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <p className="text-lg text-[#2E2E2E] mb-4">No rooms match your filters.</p>
              <button
                onClick={() => { setFilter('all'); setRoomType('all'); }}
                className="px-6 py-2 bg-[#8FAF9B] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
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
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    room.available ? 'bg-[#8FAF9B] text-white' : 'bg-[#C6A75E] text-white'
                  }`}>
                    {room.available ? 'Available' : 'Coming Soon'}
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

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-[#1F3A5F] to-[#1F3A5F]/90 rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need Help Choosing?</h3>
              <p className="text-white/80">
                Our team can help you find the perfect room based on your needs and preferences.
              </p>
            </div>
            <Link
              href="/apply"
              className="px-8 py-3 bg-white text-[#1F3A5F] rounded-lg font-semibold hover:bg-opacity-90 transition-colors whitespace-nowrap"
            >
              Schedule a Tour
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}