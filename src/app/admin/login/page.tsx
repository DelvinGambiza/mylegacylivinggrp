'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('🔐 Attempting login for:', email)
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      console.log('📦 Auth response:', { data, error: authError })

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
      console.log('📋 Session data:', data.session)

      // IMPORTANT: Wait a moment for session to be saved
      await new Promise(resolve => setTimeout(resolve, 500))

      // Force refresh the session
      const { data: { session } } = await supabase.auth.getSession()
      console.log('🔄 Current session after login:', session)

      // Check if user exists in public.users table and is admin
      const { data: userData, error: dbError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()

      console.log('🎯 Database check:', { userData, error: dbError })

      if (dbError) {
        if (dbError.code === 'PGRST116') {
          setError('Account not found in database. Please contact administrator.')
        } else {
          setError(`Database error: ${dbError.message}`)
        }
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      if (userData?.role === 'admin') {
        console.log('🎉 User is admin, redirecting to dashboard')
        
        // Force a page reload to ensure session is picked up
        window.location.href = '/admin/dashboard'
        
        // Or use router with delay
        // setTimeout(() => router.push('/admin/dashboard'), 100)
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

  // Add a test login function
  const testDirectLogin = async () => {
    setEmail('admin@example.com')
    setPassword('admin123')
    
    // Wait a moment then submit
    setTimeout(() => {
      document.querySelector('form')?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF7] to-[#F0F4F1] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E5E7EB]/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1F3A5F] to-[#8FAF9B] p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-white/80">Enter your credentials to continue</p>
          </div>

          <div className="p-8">
            {/* Debug info */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-blue-700 font-medium">Login successful but redirect issue?</p>
                  <button
                    onClick={testDirectLogin}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                  >
                    Test direct login →
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
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
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <button
                onClick={() => {
                  // Clear everything and try fresh
                  supabase.auth.signOut()
                  localStorage.clear()
                  sessionStorage.clear()
                  window.location.href = '/admin/login'
                }}
                className="w-full text-center py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
              >
                Clear All & Refresh
              </button>
              
              <button
                onClick={() => {
                  // Test if we can get session
                  supabase.auth.getSession().then(({ data }) => {
                    console.log('Current session:', data.session)
                    alert(data.session ? 'Has session!' : 'No session')
                  })
                }}
                className="w-full text-center py-3 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm"
              >
                Test Current Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}