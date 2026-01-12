'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ImageUpload({ room, onClose }) {
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [room.id])

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/rooms/${room.id}/images`)
      if (!response.ok) throw new Error('Failed to fetch images')
      const data = await response.json()
      setImages(data)
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      // First upload the file
      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!uploadResponse.ok) throw new Error('Upload failed')
      
      const { url } = await uploadResponse.json()

      // Then save to database
      const saveResponse = await fetch(`/api/rooms/${room.id}/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: url,
          is_primary: images.length === 0 // Set as primary if first image
        })
      })

      if (!saveResponse.ok) throw new Error('Failed to save image')
      
      await fetchImages()
      alert('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSetPrimary = async (imageId) => {
    try {
      const response = await fetch(`/api/rooms/${room.id}/images/${imageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_primary: true })
      })

      if (!response.ok) throw new Error('Failed to set as primary')
      
      await fetchImages()
    } catch (error) {
      console.error('Error setting primary:', error)
      alert('Failed to set as primary')
    }
  }

  const handleDeleteImage = async (imageId) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const response = await fetch(`/api/rooms/${room.id}/images/${imageId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete image')
      
      await fetchImages()
      alert('Image deleted successfully')
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Failed to delete image')
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1F3A5F]">Manage Room Images</h2>
          <p className="text-gray-600 mt-1">{room.title}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Upload Section */}
      <div className="mb-8 p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div className="mt-4">
            <label className="cursor-pointer bg-[#8FAF9B] text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Upload JPG, PNG or GIF up to 5MB
          </p>
        </div>
      </div>

      {/* Images Grid */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F3A5F] mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No images uploaded yet. Upload your first image above.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={image.image_url}
                  alt={`Room image ${image.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                {!image.is_primary && (
                  <button
                    onClick={() => handleSetPrimary(image.id)}
                    className="bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-100"
                  >
                    Set Primary
                  </button>
                )}
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-700"
                >
                  Delete
                </button>
              </div>

              {/* Primary badge */}
              {image.is_primary && (
                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}