'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SyncUsersPage() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const syncUsers = async () => {
    setLoading(true)
    setResult('Starting user sync...\n\n')
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setResult('Error: Not logged in\nPlease login first.')
        return
      }
      
      setResult(prev => prev + `Current user: ${user.email}\n`)
      
      // Check if user exists in public.users
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (checkError && checkError.code === 'PGRST116') {
        setResult(prev => prev + 'User not found in database. Creating...\n')
        
        // Create user record
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            role: 'admin',
            created_at: new Date().toISOString()
          })
        
        if (insertError) {
          setResult(prev => prev + `Error: ${insertError.message}\n`)
        } else {
          setResult(prev => prev + '✅ User created as admin!\n\nYou can now login.\n')
        }
      } else if (existingUser) {
        setResult(prev => prev + `User found. Current role: ${existingUser.role}\n`)
        
        // Update to admin
        const { error: updateError } = await supabase
          .from('users')
          .update({ role: 'admin' })
          .eq('id', user.id)
        
        if (updateError) {
          setResult(prev => prev + `Update error: ${updateError.message}\n`)
        } else {
          setResult(prev => prev + '✅ Updated to admin role!\n\nYou can now access admin pages.\n')
        }
      }
      
    } catch (error: any) {
      setResult(prev => prev + `Error: ${error.message}\n`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Fix User Database Issue</h1>
        <p className="mb-6 text-gray-600">
          This tool will create/update your user in the database with admin role.
        </p>
        
        <button
          onClick={syncUsers}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 mb-6"
        >
          {loading ? 'Processing...' : 'Make Me Admin'}
        </button>
        
        {result && (
          <pre className="bg-white p-4 rounded-lg border whitespace-pre-wrap">
            {result}
          </pre>
        )}
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold text-yellow-800 mb-2">What's happening?</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Your user exists in Supabase Authentication</li>
            <li>• But not in your application's database (public.users)</li>
            <li>• Click the button above to create your user record</li>
            <li>• This will set your role to 'admin'</li>
          </ul>
        </div>
      </div>
    </div>
  )
}