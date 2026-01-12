'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      console.log('🔍 Checking for existing session...')
      
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          console.log('✅ Found session for:', session.user.email)
          
          // Check if admin
          const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()
            
          if (userData?.role === 'admin') {
            console.log('🚀 User is admin, redirecting to dashboard')
            router.push('/admin/dashboard')
            return
          } else {
            console.log('⚠️ User is not admin')
            setError('Your account does not have admin privileges.')
          }
        } else {
          console.log('❌ No session found')
        }
      } catch (err) {
        console.error('Error checking session:', err)
      } finally {
        // Always show form after checking
        console.log('🎯 Showing login form')
        setShowForm(true)
      }
    }
    
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('⏰ Session check timeout - showing form anyway')
      setShowForm(true)
    }, 3000)
    
    checkSession()
    
    return () => clearTimeout(timeoutId)
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation() // Prevent any parent handlers
    
    console.log('🔄 Login form submitted')
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      console.log('📧 Attempting login for:', email)
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      if (authError) {
        console.error('❌ Login error:', authError)
        
        if (authError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.')
        } else {
          setError(`Login failed: ${authError.message}`)
        }
        setLoading(false)
        return
      }

      if (!data.user) {
        setError('Login failed: No user data returned')
        setLoading(false)
        return
      }

      console.log('✅ Login successful for user:', data.user.email)
      setSuccess('Login successful! Checking admin privileges...')

      // Check if user exists in public.users table
      const { data: userData, error: dbError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (dbError) {
        if (dbError.code === 'PGRST116') {
          // User doesn't exist in public.users
          setError('Account not found in database. Please contact administrator.')
          await supabase.auth.signOut()
        } else {
          setError(`Database error: ${dbError.message}`)
        }
        setLoading(false)
        return
      }

      // Check if user has admin role
      if (userData?.role === 'admin') {
        setSuccess('Login successful! Redirecting to admin dashboard...')
        setTimeout(() => {
          console.log('➡️ Redirecting to dashboard')
          router.push('/admin/dashboard')
        }, 1500)
      } else {
        setError('Access denied. Admin privileges required.')
        await supabase.auth.signOut()
      }

    } catch (err: any) {
      console.error('💥 Unexpected error:', err)
      setError(`An unexpected error occurred: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleClearAllSessions = async () => {
    console.log('🧹 Clearing all sessions...')
    try {
      await supabase.auth.signOut()
      localStorage.clear()
      sessionStorage.clear()
      
      // Clear cookies
      document.cookie.split(';').forEach(c => {
        document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/'
      })
      
      setError('✅ All sessions cleared! Please refresh the page.')
      setEmail('')
      setPassword('')
      
      // Force reload after a short delay
      setTimeout(() => {
        window.location.href = '/admin/login'
      }, 1000)
      
    } catch (err) {
      console.error('Error clearing sessions:', err)
      setError('Failed to clear sessions')
    }
  }

  const handleTestCredentials = () => {
    console.log('🧪 Filling test credentials')
    setEmail('test@example.com')
    setPassword('test123')
  }

  const handleSkipToForm = () => {
    console.log('⏭️ Skipping to form')
    setShowForm(true)
  }

  // Show loading while checking session
  if (!showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAF7] to-[#F0F4F1] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3A5F] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Checking Authentication</h2>
          <p className="text-gray-600 mb-6">Verifying your session status...</p>
          
          <div className="space-y-3">
            <button
              onClick={handleSkipToForm}
              className="w-full bg-gradient-to-r from-[#8FAF9B] to-[#8FAF9B]/90 text-white py-3 px-4 rounded-lg font-medium hover:shadow-md transition-all"
            >
              Skip to Login Form
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show the actual login form
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF7] to-[#F0F4F1] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E5E7EB]/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1F3A5F] to-[#8FAF9B] p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-white/80">Sign in to access the administration dashboard</p>
          </div>

          <div className="p-8">
            {/* Debug info */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-700">
                  <strong>Ready to login!</strong> Enter your credentials below.
                </p>
              </div>
            </div>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-[#8FAF9B] transition-all"
                  placeholder="admin@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-[#8FAF9B] transition-all"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#8FAF9B] to-[#8FAF9B]/90 text-white py-3 px-4 rounded-lg font-medium hover:shadow-md hover:scale-105 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in to Admin Dashboard'
                )}
              </button>
            </form>

            {/* Action buttons - properly spaced */}
            <div className="mt-8 space-y-4">
              <button
                onClick={handleTestCredentials}
                className="w-full text-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
              >
                Fill Test Credentials
              </button>
              
              <button
                onClick={handleClearAllSessions}
                className="w-full text-center py-3 px-4 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100 transition-all"
              >
                Clear All Sessions & Refresh
              </button>
              
              <div className="flex space-x-4">
                <a
                  href="/"
                  className="flex-1 text-center py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  ← Back to Home
                </a>
                <a
                  href="/admin/register"
                  className="flex-1 text-center py-2 text-sm text-[#1F3A5F] hover:text-[#8FAF9B]"
                >
                  Request Access →
                </a>
              </div>
            </div>

            {/* Debug info at bottom */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <details className="text-sm">
                <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                  Debug Information
                </summary>
                <div className="mt-2 p-3 bg-gray-50 rounded text-xs">
                  <p>Session check completed: {showForm ? 'Yes' : 'No'}</p>
                  <p>Loading: {loading ? 'Yes' : 'No'}</p>
                  <p>Form ready: {showForm ? 'Yes' : 'No'}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Force Reload Page
                  </button>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}