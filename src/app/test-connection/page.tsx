'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

type TestResult = {
  step: string
  status: 'success' | 'error' | 'warning'
  message: string
  details?: any
}

export default function TestConnectionPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)

  const addResult = (step: string, status: TestResult['status'], message: string, details?: any) => {
    console.log(`[${status.toUpperCase()}] ${step}: ${message}`, details || '')
    setResults(prev => [...prev, { step, status, message, details }])
  }

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    setResults([])
    setLoading(true)

    try {
      // 1. Check environment variables
      addResult('Environment Variables', 'warning', 'Checking...')
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey) {
        addResult('Environment Variables', 'error', 
          `Missing environment variables. URL: ${!!supabaseUrl}, Key: ${!!supabaseKey}`)
        setLoading(false)
        return
      }
      
      addResult('Environment Variables', 'success', 
        `Found! URL: ${supabaseUrl.substring(0, 30)}..., Key length: ${supabaseKey.length} chars`)

      // 2. Create Supabase client
      addResult('Create Client', 'warning', 'Attempting to create Supabase client...')
      
      const supabase = createClient(supabaseUrl, supabaseKey)
      addResult('Create Client', 'success', 'Supabase client created successfully')

      // 3. Test authentication connection
      addResult('Auth Test', 'warning', 'Testing authentication connection...')
      
      const { data: authData, error: authError } = await supabase.auth.getSession()
      
      if (authError) {
        addResult('Auth Test', 'error', `Auth error: ${authError.message}`, authError)
      } else {
        addResult('Auth Test', 'success', 
          `Auth connected! Session: ${authData.session ? 'Active' : 'No session'}`)
      }

      // 4. Test database connection (list tables)
      addResult('Database Test', 'warning', 'Testing database connection...')
      
      const { data: tables, error: tablesError } = await supabase
        .from('users')
        .select('count')
        .limit(1)
      
      if (tablesError) {
        if (tablesError.code === 'PGRST116') {
          addResult('Database Test', 'warning', 
            'Table "users" not found, but database connection is working', tablesError)
        } else {
          addResult('Database Test', 'error', 
            `Database error: ${tablesError.message}`, tablesError)
        }
      } else {
        addResult('Database Test', 'success', 
          'Database connection successful! Table "users" exists')
      }

      // 5. Test RPC (if available)
      addResult('RPC Test', 'warning', 'Testing RPC functions...')
      
      const { data: rpcData, error: rpcError } = await supabase.rpc('version')
      
      if (rpcError) {
        // This is expected if version() function doesn't exist
        addResult('RPC Test', 'warning', 
          'RPC test skipped (version function not available)', rpcError)
      } else {
        addResult('RPC Test', 'success', `RPC working! Database version: ${rpcData}`)
      }

      // 6. List all tables in public schema
      addResult('List Tables', 'warning', 'Fetching all tables...')
      
      // Using a direct query via RPC (requires enabling)
      const { data: allTables, error: allTablesError } = await supabase
        .from('users') // Use any existing table
        .select('*')
        .limit(0) // Just to test connection
      
      if (allTablesError) {
        addResult('List Tables', 'warning', 
          `Cannot list tables directly: ${allTablesError.message}`)
      } else {
        // Alternative: Create a function in Supabase to list tables
        addResult('List Tables', 'success', 'Can query database successfully')
      }

      // 7. Test storage (if used)
      addResult('Storage Test', 'warning', 'Testing storage connection...')
      
      const { data: buckets, error: storageError } = await supabase.storage.listBuckets()
      
      if (storageError) {
        addResult('Storage Test', 'warning', 
          `Storage error (might not be enabled): ${storageError.message}`)
      } else {
        addResult('Storage Test', 'success', 
          `Storage connected! Found ${buckets.length} bucket(s)`)
      }

    } catch (error: any) {
      addResult('Unexpected Error', 'error', 
        `Test failed: ${error.message}`, error)
    } finally {
      addResult('Test Complete', 'success', 'All tests completed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supabase Connection Test</h1>
        <p className="text-gray-600 mb-8">Testing connection between your Next.js app and Supabase</p>
        
        <div className="mb-8">
          <button
            onClick={testConnection}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Run Connection Tests'}
          </button>
          
          <button
            onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
            className="ml-4 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700"
          >
            Open Supabase Dashboard
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Test Results</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {results.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Click "Run Connection Tests" to start
              </div>
            ) : (
              results.map((result, index) => (
                <div key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3
                      ${result.status === 'success' ? 'bg-green-100 text-green-600' : 
                        result.status === 'error' ? 'bg-red-100 text-red-600' : 
                        'bg-yellow-100 text-yellow-600'}`}
                    >
                      {result.status === 'success' ? '✓' : 
                       result.status === 'error' ? '✗' : '!'}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-900">{result.step}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium
                          ${result.status === 'success' ? 'bg-green-100 text-green-800' : 
                            result.status === 'error' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                        >
                          {result.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{result.message}</p>
                      
                      {result.details && (
                        <details className="mt-2">
                          <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                            View details
                          </summary>
                          <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                            {JSON.stringify(result.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Connection Diagram */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connection Diagram</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-700">Next.js App</div>
              <div className="text-sm text-blue-600 mt-1">localhost:3000</div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-gray-400">→</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="font-medium text-green-700">Environment Vars</div>
              <div className="text-sm text-green-600 mt-1">.env.local</div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-gray-400">→</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="font-medium text-purple-700">Supabase</div>
              <div className="text-sm text-purple-600 mt-1">Database + Auth</div>
            </div>
          </div>
        </div>

        {/* Quick Checks */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-medium text-gray-900 mb-3">1. Check .env.local</h4>
            <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...`}
            </pre>
            <p className="text-sm text-gray-600 mt-2">
              File location: <code>/my-legacy-living-group/.env.local</code>
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-medium text-gray-900 mb-3">2. Verify in Browser Console</h4>
            <p className="text-sm text-gray-600 mb-2">Press F12 and run:</p>
            <pre className="text-sm bg-gray-100 p-3 rounded">
{`console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)`}
            </pre>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-medium text-gray-900 mb-3">3. Test Direct Query</h4>
            <p className="text-sm text-gray-600 mb-2">In Supabase SQL Editor:</p>
            <pre className="text-sm bg-gray-100 p-3 rounded">
{`-- Check auth users
SELECT * FROM auth.users;

-- Check public tables
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public';`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}