'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function SetupPage() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const setupDatabase = async () => {
    setLoading(true)
    setResult('')
    
    try {
      // Check current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setResult('Error: Not logged in')
        return
      }
      
      setResult(`Current user: ${user.email} (${user.id})\n`)
      
      // Check if users table exists
      const { data: tables, error: tablesError } = await supabase
        .from('users')
        .select('count')
        .limit(1)
      
      if (tablesError) {
        setResult(prev => prev + `Table error: ${tablesError.message}\n`)
        
        // Try to create user record
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: user.id,
              email: user.email,
              role: 'admin',
              created_at: new Date().toISOString()
            }
          ])
          .select()
          
        if (insertError) {
          setResult(prev => prev + `Insert failed: ${insertError.message}\n`)
        } else {
          setResult(prev => prev + `Success! Created admin user.\n`)
        }
      } else {
        setResult(prev => prev + `Users table exists.\n`)
        
        // Check if current user is in table
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()
          
        if (existingUser) {
          setResult(prev => prev + `User found in table. Role: ${existingUser.role}\n`)
          
          // Update to admin
          const { error: updateError } = await supabase
            .from('users')
            .update({ role: 'admin' })
            .eq('id', user.id)
            
          if (updateError) {
            setResult(prev => prev + `Update error: ${updateError.message}\n`)
          } else {
            setResult(prev => prev + `Updated to admin role.\n`)
          }
        } else {
          setResult(prev => prev + `User not in table. Creating...\n`)
          
          const { error: insertError } = await supabase
            .from('users')
            .insert([{
              id: user.id,
              email: user.email,
              role: 'admin',
              created_at: new Date().toISOString()
            }])
            
          if (insertError) {
            setResult(prev => prev + `Insert error: ${insertError.message}\n`)
          } else {
            setResult(prev => prev + `Created admin user.\n`)
          }
        }
      }
    } catch (error: any) {
      setResult(prev => prev + `Error: ${error.message}\n`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Setup</h1>
      <button
        onClick={setupDatabase}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Setting up...' : 'Setup Database'}
      </button>
      
      {result && (
        <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
          {result}
        </pre>
      )}
    </div>
  )
}