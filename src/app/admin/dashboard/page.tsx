'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRooms: 0,
    totalApplications: 0,
    pendingApplications: 0
  })
  const router = useRouter()

  useEffect(() => {
    checkAuthAndLoadData()
  }, [])

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }

      // Verify admin role
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (userData?.role !== 'admin') {
        alert('Access denied. Admin privileges required.')
        await supabase.auth.signOut()
        router.push('/admin/login')
        return
      }

      setUser(user)
      await loadDashboardStats()

    } catch (error) {
      console.error('Dashboard error:', error)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const loadDashboardStats = async () => {
    try {
      // Get total users
      const { count: userCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      // Get total rooms
      const { count: roomCount } = await supabase
        .from('rooms')
        .select('*', { count: 'exact', head: true })

      // Get total applications
      const { count: applicationCount } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })

      // Get pending applications (example - adjust based on your schema)
      const { count: pendingCount } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      setStats({
        totalUsers: userCount || 0,
        totalRooms: roomCount || 0,
        totalApplications: applicationCount || 0,
        pendingApplications: pendingCount || 0
      })

    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAF7] to-[#F0F4F1] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3A5F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.email?.split('@')[0] || 'Admin'}!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB]/20 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#1F3A5F]/10 to-[#1F3A5F]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#1F3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-6.197h-6m6 0V5.5a2.5 2.5 0 00-5 0v1.5m5 0h-5" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
          <Link href="/admin/users" className="mt-4 inline-block text-sm text-[#1F3A5F] hover:text-[#8FAF9B] font-medium">
            View all users →
          </Link>
        </div>

        {/* Rooms Card */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB]/20 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#8FAF9B]/10 to-[#8FAF9B]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#8FAF9B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRooms}</p>
            </div>
          </div>
          <Link href="/admin/rooms" className="mt-4 inline-block text-sm text-[#1F3A5F] hover:text-[#8FAF9B] font-medium">
            Manage rooms →
          </Link>
        </div>

        {/* Applications Card */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB]/20 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#C6A75E]/10 to-[#C6A75E]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#C6A75E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
            </div>
          </div>
          <Link href="/admin/applications" className="mt-4 inline-block text-sm text-[#1F3A5F] hover:text-[#8FAF9B] font-medium">
            Review applications →
          </Link>
        </div>

        {/* Pending Card */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB]/20 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</p>
            </div>
          </div>
          <Link href="/admin/applications?status=pending" className="mt-4 inline-block text-sm text-[#1F3A5F] hover:text-[#8FAF9B] font-medium">
            View pending →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB]/20 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/admin/rooms/new"
            className="p-4 border border-gray-200 rounded-lg hover:border-[#8FAF9B] hover:shadow-sm transition-all group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Add New Room</p>
                <p className="text-sm text-gray-500">Create a new room listing</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/admin/users/create"
            className="p-4 border border-gray-200 rounded-lg hover:border-[#8FAF9B] hover:shadow-sm transition-all group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Add New User</p>
                <p className="text-sm text-gray-500">Create new admin account</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/admin/settings"
            className="p-4 border border-gray-200 rounded-lg hover:border-[#8FAF9B] hover:shadow-sm transition-all group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/20 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Settings</p>
                <p className="text-sm text-gray-500">Configure platform settings</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB]/20 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          <button className="text-sm text-[#1F3A5F] hover:text-[#8FAF9B] font-medium">
            View all activity →
          </button>
        </div>
        <div className="space-y-4">
          {stats.totalApplications === 0 && stats.totalUsers === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">No recent activity yet</p>
              <p className="text-sm text-gray-400 mt-1">Activity will appear here as users interact with the platform</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/10 to-green-500/20 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Dashboard loaded</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
              
              {stats.totalUsers > 0 && (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-500/20 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-6.197h-6m6 0V5.5a2.5 2.5 0 00-5 0v1.5m5 0h-5" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{stats.totalUsers} users in system</p>
                    <p className="text-xs text-gray-500">Total registered users</p>
                  </div>
                </div>
              )}
              
              {stats.totalApplications > 0 && (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/10 to-purple-500/20 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{stats.totalApplications} total applications</p>
                    <p className="text-xs text-gray-500">{stats.pendingApplications} pending review</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}