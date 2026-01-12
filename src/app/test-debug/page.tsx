'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function TestDebug() {
  const [hasSession, setHasSession] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session) {
      setHasSession(true)
      setUserEmail(session.user.email || '')
    } else {
      setHasSession(false)
      setShowForm(true)
    }
  }

  const clearSession = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    await supabase.auth.signOut()
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = '/admin/login'
  }

  const forceShowForm = () => {
    setShowForm(true)
    setHasSession(false)
  }

  if (!showForm && hasSession) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl font-bold mb-4">Debug: You have a session!</h1>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <p className="mb-2">You are logged in as: <strong>{userEmail}</strong></p>
          <p className="text-gray-600 mb-4">This is why you don't see the login form.</p>
          
          <div className="space-y-3">
            <button
              onClick={clearSession}
              className="block w-full max-w-md bg-red-600 text-white py-2 px-4 rounded"
            >
              Clear Session & Go to Login
            </button>
            
            <button
              onClick={forceShowForm}
              className="block w-full max-w-md bg-blue-600 text-white py-2 px-4 rounded"
            >
              Force Show Login Form (test only)
            </button>
            
            <button
              onClick={() => window.location.href = '/admin/dashboard'}
              className="block w-full max-w-md bg-green-600 text-white py-2 px-4 rounded"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show the actual login form
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">Debug: Login Form Test</h1>
      
      <div className="max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Test Login Form</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="test@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="password"
            />
          </div>
          
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded">
            Test Login Button
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <button
            onClick={() => window.location.href = '/admin/login'}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded"
          >
            Go to Actual Login Page
          </button>
        </div>
      </div>
    </div>
  )
}