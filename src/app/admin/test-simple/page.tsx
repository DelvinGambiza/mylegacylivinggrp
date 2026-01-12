'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function SimpleTest() {
  const [message, setMessage] = useState('Click a button to test')
  const [loading, setLoading] = useState(false)

  const test1 = async () => {
    setLoading(true)
    setMessage('Testing Supabase connection...')
    
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      
      const { data, error } = await supabase.auth.getSession()
      setMessage(`Session test: ${error ? 'Error: ' + error.message : 'Success! Has session: ' + !!data.session}`)
    } catch (err: any) {
      setMessage(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const test2 = async () => {
    setLoading(true)
    setMessage('Testing if user can click...')
    
    setTimeout(() => {
      setMessage('✅ Button click works!')
      setLoading(false)
    }, 500)
  }

  const test3 = () => {
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Test Page</h1>
      
      <div className="space-y-4 mb-8">
        <button
          onClick={test1}
          disabled={loading}
          className="block w-full max-w-md bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Test Supabase Connection
        </button>
        
        <button
          onClick={test2}
          disabled={loading}
          className="block w-full max-w-md bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Test Button Click
        </button>
        
        <button
          onClick={test3}
          className="block w-full max-w-md bg-purple-600 text-white py-3 px-4 rounded hover:bg-purple-700"
        >
          Go to Login Page
        </button>
      </div>
      
      <div className="max-w-md p-4 bg-white rounded shadow">
        <h2 className="font-semibold mb-2">Result:</h2>
        <p className={message.includes('Error') ? 'text-red-600' : 'text-gray-800'}>
          {message}
        </p>
      </div>
      
      <div className="mt-8 max-w-md p-4 bg-yellow-50 rounded border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">Debug Info:</h3>
        <p className="text-sm text-yellow-700">
          Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}<br/>
          Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set (' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ' chars)' : '❌ Missing'}
        </p>
      </div>
    </div>
  )
}