'use client'

import { useState, useEffect } from 'react'

const ROOM_FEATURES = [
  'Private Bathroom',
  'Shared Bathroom',
  'Kitchenette',
  'Full Kitchen',
  'Wi-Fi',
  'Utilities Included',
  '24/7 Support',
  'Laundry',
  'Community Areas',
  'Balcony',
  'Wheelchair Accessible',
  'Emergency Call System',
  'Housekeeping',
  'Social Activities'
]

export default function RoomForm({ room, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    room_type: 'single',
    price_monthly: '',
    square_feet: '',
    availability_status: 'available',
    features: []
  })

  useEffect(() => {
    if (room) {
      setFormData({
        title: room.title || '',
        description: room.description || '',
        location: room.location || '',
        room_type: room.room_type || 'single',
        price_monthly: room.price_monthly || '',
        square_feet: room.square_feet || '',
        availability_status: room.availability_status || 'available',
        features: room.features || []
      })
    }
  }, [room])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const { checked } = e.target
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev.features, value]
          : prev.features.filter(f => f !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = room 
        ? `/api/rooms/${room.id}`
        : '/api/rooms'
      
      const method = room ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save room')
      }

      onSuccess()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1F3A5F]">
          {room ? 'Edit Room' : 'Add New Room'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-transparent"
              placeholder="e.g., Private Studio with Ensuite"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <select
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-transparent"
            >
              <option value="">Select location</option>
              <option value="MD">Maryland</option>
              <option value="IN">Indiana</option>
              <option value="IL">Illinois</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Type *
            </label>
            <select
              name="room_type"
              required
              value={formData.room_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-transparent"
            >
              <option value="single">Single Room</option>
              <option value="shared">Shared Room</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              name="availability_status"
              required
              value={formData.availability_status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-transparent"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Under Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Price ($) *
            </label>
            <input
              type="number"
              name="price_monthly"
              required
              min="0"
              step="0.01"
              value={formData.price_monthly}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-transparent"
              placeholder="e.g., 1200.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Square Feet *
            </label>
            <input
              type="number"
              name="square_feet"
              required
              min="0"
              value={formData.square_feet}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-transparent"
              placeholder="e.g., 300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-transparent"
            placeholder="Describe the room, amenities, and any special features..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Features
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ROOM_FEATURES.map((feature) => (
              <label key={feature} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="features"
                  value={feature}
                  checked={formData.features.includes(feature)}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-[#8FAF9B] focus:ring-[#8FAF9B]"
                />
                <span className="text-sm text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#8FAF9B] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : (
              room ? 'Update Room' : 'Create Room'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}