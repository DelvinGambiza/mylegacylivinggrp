'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    role: 'user'
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // First, check if current user is admin
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('You must be logged in as an admin')
        setLoading(false)
        return
      }

      // Verify current user is admin
      const { data: currentUserData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (currentUserData?.role !== 'admin') {
        setError('Only admins can create new users')
        setLoading(false)
        return
      }

      // Check if email already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', formData.email)

      if (checkError) {
        console.error('Check error:', checkError)
      }

      if (existingUsers && existingUsers.length > 0) {
        setError('A user with this email already exists')
        setLoading(false)
        return
      }

      console.log('Creating user:', formData)

      // SIMPLE METHOD: Use Supabase Auth to create user
      try {
        // Try to create user via Supabase Auth (admin API)
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: formData.email,
          password: 'Temporary123!', // Temporary password
          email_confirm: true, // Auto-confirm email
          user_metadata: {
            full_name: formData.fullName
          }
        })

        if (authError) {
          console.error('Auth create error:', authError)
          throw authError
        }

        if (authData.user) {
          console.log('Auth user created:', authData.user.id)
          
          // Now create record in public.users table
          const { error: dbError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email: formData.email,
              full_name: formData.fullName,
              role: formData.role,
              created_at: new Date().toISOString()
            })

          if (dbError) {
            console.error('Database insert error:', dbError)
            
            // Try to delete the auth user we just created
            await supabase.auth.admin.deleteUser(authData.user.id)
            
            throw new Error(`Failed to save to database: ${dbError.message}`)
          }

          // Send password reset email so user can set their own password
          const { error: resetError } = await supabase.auth.admin.generateLink({
            type: 'recovery',
            email: formData.email
          })

          if (resetError) {
            console.warn('Could not send reset email:', resetError.message)
            setSuccess(`User ${formData.email} created successfully as ${formData.role}. Password: Temporary123! (User should reset password)`)
          } else {
            setSuccess(`User ${formData.email} created successfully as ${formData.role}. Password reset email sent.`)
          }

          // Reset form
          setFormData({ email: '', fullName: '', role: 'user' })
        }

      } catch (createError: any) {
        console.error('Create user error:', createError)
        
        // Fallback method if admin API doesn't work
        if (createError.message.includes('Admin API')) {
          setError('Admin API access required. Please create user manually in Supabase dashboard.')
        } else {
          setError(`Failed to create user: ${createError.message}`)
        }
      }

    } catch (err: any) {
      console.error('Error:', err)
      setError(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const createUserManually = async () => {
    // Simple manual creation using your existing user table
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('You must be logged in')
        return
      }

      // Generate a random ID for the user
      const userId = crypto.randomUUID()
      
      // Insert directly into users table (user will need to login via Supabase dashboard first)
      const { error } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: formData.email,
          full_name: formData.fullName,
          role: formData.role,
          created_at: new Date().toISOString()
        })

      if (error) {
        setError(`Database error: ${error.message}`)
      } else {
        setSuccess(`User ${formData.email} added to database as ${formData.role}. User must be created in Supabase Auth dashboard to login.`)
        setFormData({ email: '', fullName: '', role: 'user' })
      }
    } catch (err: any) {
      setError(`Error: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF7] to-[#F0F4F1] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="mb-6">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center text-[#1F3A5F] hover:text-[#8FAF9B] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E5E7EB]/20">
          {/* Header with gradient matching your design */}
          <div className="bg-gradient-to-r from-[#1F3A5F] to-[#8FAF9B] p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Create New User</h1>
            <p className="text-white/80">Add new members to your admin team</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-green-800">{success}</p>
                    {success.includes('Supabase dashboard') && (
                      <a 
                        href="https://supabase.com/dashboard" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm text-green-600 hover:text-green-500"
                      >
                        Open Supabase Dashboard →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-[#8FAF9B] transition-all"
                  placeholder="user@example.com"
                  required
                  disabled={loading}
                />
                <p className="mt-2 text-sm text-gray-500">
                  User will receive an invitation to set their password
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-[#8FAF9B] transition-all"
                  placeholder="John Doe"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8FAF9B] focus:border-[#8FAF9B] transition-all bg-white"
                  required
                  disabled={loading}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">User</p>
                    <p className="text-xs text-blue-600 mt-1">Basic access, view-only</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Admin</p>
                    <p className="text-xs text-green-600 mt-1">Full access to all features</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-purple-800">Moderator</p>
                    <p className="text-xs text-purple-600 mt-1">Manage content but not users</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-[#8FAF9B] to-[#8FAF9B]/90 text-white py-3 px-4 rounded-lg font-medium hover:shadow-md hover:scale-105 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating User...
                    </span>
                  ) : (
                    'Create User Account'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                  className="px-6 bg-gradient-to-r from-[#1F3A5F] to-[#1F3A5F]/90 text-white py-3 rounded-lg font-medium hover:shadow-md transition-all duration-200 shadow-sm"
                >
                  Supabase Dashboard
                </button>
              </div>
            </form>

            {/* Alternative manual method */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Alternative Method</h3>
                <button
                  type="button"
                  onClick={createUserManually}
                  className="text-sm text-[#1F3A5F] hover:text-[#8FAF9B] font-medium"
                >
                  Add to Database Only
                </button>
              </div>
              <p className="text-sm text-gray-600">
                If the automated method fails, you can add the user directly to the database.
                The user will need to be created in Supabase Auth separately to login.
              </p>
            </div>

            {/* Quick guide */}
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3">Quick Guide</h4>
              <ol className="text-sm text-blue-700 space-y-2">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2">1</span>
                  <span>Enter user details above and select role</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2">2</span>
                  <span>Click "Create User Account" to create in Supabase Auth</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2">3</span>
                  <span>User receives email to set password and login</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2">4</span>
                  <span>User appears in your database with selected role</span>
                </li>
              </ol>
            </div>

            {/* Current user info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Currently logged in as admin</p>
                  <button
                    onClick={async () => {
                      const { data: { user } } = await supabase.auth.getUser()
                      if (user) {
                        const { data: userData } = await supabase
                          .from('users')
                          .select('role')
                          .eq('id', user.id)
                          .single()
                        alert(`You are: ${user.email}\nRole: ${userData?.role}`)
                      }
                    }}
                    className="mt-1 text-xs text-[#1F3A5F] hover:text-[#8FAF9B]"
                  >
                    Check your permissions
                  </button>
                </div>
                <a
                  href="/admin/users"
                  className="text-sm text-[#1F3A5F] hover:text-[#8FAF9B] font-medium"
                >
                  View all users →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}