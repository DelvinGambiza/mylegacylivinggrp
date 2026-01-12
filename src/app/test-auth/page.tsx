'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function TestAuth() {
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const checkSession = async () => {
      console.log('Checking session...')
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      console.log('Session error:', sessionError)
      console.log('User error:', userError)
      console.log('Session:', session)
      console.log('User:', user)
      
      if (sessionError) console.error('Session error:', sessionError)
      if (userError) console.error('User error:', userError)
      
      setSession(session)
      setUser(user)
      setLoading(false)
    }
    
    checkSession()
  }, [])

  if (loading) {
    return <div className="p-8">Loading auth test...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>
      <p className="mb-4">Visit: <code>http://localhost:3000/test-auth</code></p>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="font-semibold text-blue-800 mb-2">Session</h2>
          <pre className="text-sm bg-white p-2 rounded">
            {session ? JSON.stringify(session, null, 2) : 'No session'}
          </pre>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="font-semibold text-green-800 mb-2">User</h2>
          <pre className="text-sm bg-white p-2 rounded">
            {user ? JSON.stringify(user, null, 2) : 'No user'}
          </pre>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="font-semibold text-gray-800 mb-2">Environment Variables</h2>
        <ul className="text-sm space-y-1">
          <li>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing'}</li>
          <li>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'}</li>
          <li>URL length: {process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0} characters</li>
          <li>Key length: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0} characters</li>
        </ul>
      </div>
    </div>
  )
}