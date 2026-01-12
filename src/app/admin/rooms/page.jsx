'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import RoomForm from './RoomForm'
import ImageUpload from './ImageUpload'

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showImages, setShowImages] = useState(false)
  //const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    checkAdmin()
    fetchRooms()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userData?.role !== 'admin') {
      router.push('/')
    }
  }

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/rooms')
      if (!response.ok) throw new Error('Failed to fetch rooms')
      const data = await response.json()
      setRooms(data)
    } catch (error) {
      console.error('Error fetching rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRoom = () => {
    setEditingRoom(null)
    setShowForm(true)
  }

  const handleEditRoom = (room) => {
    setEditingRoom(room)
    setShowForm(true)
  }

  const handleDeleteRoom = async (roomId) => {
    if (!confirm('Are you sure you want to delete this room? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete room')
      
      setRooms(rooms.filter(room => room.id !== roomId))
      alert('Room deleted successfully')
    } catch (error) {
      console.error('Error deleting room:', error)
      alert('Failed to delete room')
    }
  }

  const handleViewImages = (room) => {
    setSelectedRoom(room)
    setShowImages(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingRoom(null)
    fetchRooms()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3A5F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading rooms...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#1F3A5F]">Room Management</h1>
              <p className="text-gray-600 mt-2">Add, edit, and manage accommodation listings</p>
            </div>
            <button
              onClick={handleCreateRoom}
              className="bg-[#8FAF9B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add New Room</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
            <div className="text-2xl font-bold text-[#1F3A5F]">{rooms.length}</div>
            <div className="text-gray-600">Total Rooms</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
            <div className="text-2xl font-bold text-[#1F3A5F]">
              {rooms.filter(r => r.availability_status === 'available').length}
            </div>
            <div className="text-gray-600">Available</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
            <div className="text-2xl font-bold text-[#1F3A5F]">
              {rooms.filter(r => r.room_type === 'single').length}
            </div>
            <div className="text-gray-600">Single Rooms</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
            <div className="text-2xl font-bold text-[#1F3A5F]">
              {rooms.filter(r => r.room_type === 'shared').length}
            </div>
            <div className="text-gray-600">Shared Rooms</div>
          </div>
        </div>

        {/* Rooms Table */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {room.room_images?.find(img => img.is_primary) ? (
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={room.room_images.find(img => img.is_primary).image_url}
                              alt={room.title}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{room.title}</div>
                          <div className="text-sm text-gray-500">{room.square_feet} sq ft</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {room.location === 'MD' && 'Maryland'}
                        {room.location === 'IN' && 'Indiana'}
                        {room.location === 'IL' && 'Illinois'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                        {room.room_type === 'single' ? (
                          <span className="bg-blue-100 text-blue-800">Single</span>
                        ) : (
                          <span className="bg-green-100 text-green-800">Shared</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${room.price_monthly?.toLocaleString()}/mo
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        room.availability_status === 'available' 
                          ? 'bg-green-100 text-green-800'
                          : room.availability_status === 'occupied'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {room.availability_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditRoom(room)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleViewImages(room)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Room Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <RoomForm
              room={editingRoom}
              onClose={handleFormClose}
              onSuccess={handleFormClose}
            />
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {showImages && selectedRoom && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <ImageUpload
              room={selectedRoom}
              onClose={() => {
                setShowImages(false)
                setSelectedRoom(null)
                fetchRooms()
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}