'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase, getUser } from '@/lib/supabase'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()
  const pathname = usePathname() // Get current path

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      console.log('🔐 AdminLayout: Checking auth...')
      console.log('📍 Current path:', pathname)
      
      // Skip auth check for login page itself
      if (pathname === '/admin/login') {
        console.log('✅ On login page, skipping auth check')
        setLoading(false)
        return
      }

      const { data: { user }, error: userError } = await getUser()
      
      if (userError) {
        console.error('getUser error:', userError)
        setLoading(false)
        return
      }
      
      console.log('👤 User found:', user?.email)
      
      if (!user) {
        console.log('❌ No user, redirecting to login')
        setLoading(false)
        router.push('/admin/login')
        return
      }

      setUserEmail(user.email || '')

      console.log('🔍 Checking admin role for user:', user.id)
      
      // Check if user is admin in public.users table
      const { data: userData, error: userDataError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (userDataError) {
        console.error('Database error:', userDataError)
        
        if (userDataError.code === 'PGRST116') {
          console.log('User not in database table')
          setLoading(false)
          router.push('/admin/login')
          return
        }
        
        setLoading(false)
        return
      }
      
      console.log('🎯 User role:', userData?.role)
      
      if (userData?.role !== 'admin') {
        console.log('🚫 User is not admin')
        setLoading(false)
        router.push('/admin/login')
        return
      }

      console.log('✅ User is admin!')
      setIsAdmin(true)
      
    } catch (error: any) {
      console.error('Auth error:', error)
    } finally {
      console.log('🏁 Setting loading to false')
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  // Show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAF7] to-[#F0F4F1] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3A5F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin...</p>
        </div>
      </div>
    )
  }

  // If not admin AND not on login page, show access denied
  if (!isAdmin && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAF7] to-[#F0F4F1] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-[#E5E7EB]/20">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#C6A75E]/10 to-[#C6A75E]/20 mb-6">
              <svg className="h-8 w-8 text-[#C6A75E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Required</h2>
            
            <p className="text-gray-600 mb-6">
              You need to login to access this page.
            </p>
            
            <button
              onClick={() => router.push('/admin/login')}
              className="w-full bg-gradient-to-r from-[#8FAF9B] to-[#8FAF9B]/90 text-white py-3 px-4 rounded-lg font-medium hover:shadow-md hover:scale-105 transition-all duration-200 shadow-sm"
            >
              Go to Login Page
            </button>
          </div>
        </div>
      </div>
    )
  }

  // If not admin but we're on login page, just show the login page content
  if (!isAdmin && pathname === '/admin/login') {
    console.log('🎯 Rendering login page content')
    return <>{children}</>
  }

  // User is admin - show the admin layout with children
  console.log('✅ Rendering admin layout for:', userEmail)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF7] to-[#F0F4F1]">
      {/* Admin Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-[#E5E7EB]/20">
        <nav className="max-w-8xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center space-x-3 group">
                <div className="flex items-center">
                  <img 
                    src="/logo_full.png"
                    alt="My Legacy Living Group"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-[#2E2E2E] tracking-tight">Admin</span>
                  <span className="text-sm text-[#2E2E2E]/70 tracking-wider">Dashboard</span>
                </div>
              </a>
            </div>
            
            {/* Admin Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="/admin/dashboard" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1F3A5F] rounded-lg hover:bg-gray-50">
                Dashboard
              </a>
              <a href="/admin/rooms" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1F3A5F] rounded-lg hover:bg-gray-50">
                Rooms
              </a>
              <a href="/admin/users" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1F3A5F] rounded-lg hover:bg-gray-50">
                Users
              </a>
              <a href="/admin/applications" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#1F3A5F] rounded-lg hover:bg-gray-50">
                Applications
              </a>
              
              {/* User info and logout */}
              <div className="ml-6 flex items-center space-x-4">
                <span className="text-sm text-gray-600">{userEmail}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1F3A5F] to-[#1F3A5F]/90 rounded-lg hover:shadow-md transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="pt-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}