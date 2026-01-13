'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase, getUser } from '@/lib/supabase'
import AdminNavLink from '@/components/AdminNavLink' // You'll need to create this component

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
      {/* Modern Fixed Admin Navbar - Matching main site */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-[#E5E7EB]/20">
        <nav className="max-w-8xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Modern Logo - Matching main site */}
            <div className="flex-shrink-0">
              <a href="/admin/dashboard" className="flex items-center space-x-3 group">
                <div className="flex-shrink-0">
                  {/* Logo container matching main site */}
                  <div className="flex items-center">
                    <img 
                      src="/logo_full.png"
                      alt="My Legacy Living Group"
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                </div>
                
                {/* Text logo - stacked for modern look */}
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-[#2E2E2E] tracking-tight">Admin</span>
                  <span className="text-sm text-[#2E2E2E]/70 tracking-wider uppercase letter-spacing-2">Dashboard</span>
                </div>
              </a>
            </div>
            
            {/* Desktop Navigation - Clean with subtle hover effects matching main site */}
            <div className="hidden md:flex items-center space-x-1">
              <AdminNavLink href="/admin/dashboard">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Dashboard</span>
                </span>
              </AdminNavLink>
              
              <AdminNavLink href="/admin/rooms">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Rooms</span>
                </span>
              </AdminNavLink>
              
              <AdminNavLink href="/admin/users">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1.205a8.959 8.959 0 01-4.5 1.194" />
                  </svg>
                  <span>Users</span>
                </span>
              </AdminNavLink>
              
              <AdminNavLink href="/admin/applications">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Applications</span>
                </span>
              </AdminNavLink>
              
              {/* Back to main site */}
              <AdminNavLink href="/">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Site</span>
                </span>
              </AdminNavLink>
              
              {/* User info and logout - Matching Get Started button style */}
              <div className="ml-6 flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8FAF9B] to-[#8FAF9B]/80 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {userEmail?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-[#2E2E2E] font-medium truncate max-w-[120px]">
                    {userEmail}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 bg-gradient-to-r from-[#1F3A5F] to-[#1F3A5F]/90 text-white rounded-lg font-medium hover:shadow-md hover:scale-105 transition-all duration-200 shadow-sm text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
            
            {/* Mobile menu button - Matching main site */}
            <div className="md:hidden flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8FAF9B] to-[#8FAF9B]/80 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {userEmail?.charAt(0).toUpperCase()}
                </span>
              </div>
              <button className="p-2 rounded-lg hover:bg-[#FAFAF7] transition-colors">
                <svg className="w-6 h-6 text-[#2E2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content with top padding */}
      <main className="pt-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}