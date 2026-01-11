'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react'

interface Application {
  id: string
  status: string
  submitted_at: string
  form_data: any
  pre_approval_reason: string
  user_email?: string
}

export default function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  async function fetchApplications() {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('submitted_at', { ascending: false })

    if (error) {
      console.error('Error fetching applications:', error)
      return
    }

    setApplications(data || [])
    setLoading(false)
  }

  async function updateApplicationStatus(id: string, status: 'approved' | 'rejected') {
    const { error } = await supabase
      .from('applications')
      .update({ 
        status,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) {
      alert('Error updating application: ' + error.message)
      return
    }

    fetchApplications() // Refresh list
    alert(`Application ${status === 'approved' ? 'approved' : 'rejected'}`)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />
      case 'pre_approved': return <CheckCircle className="w-5 h-5 text-blue-500" />
      default: return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8FAF9B]"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-[#E5E7EB]">
        <h2 className="text-xl font-bold text-[#1F3A5F]">Applications ({applications.length})</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#E5E7EB]">
          <thead className="bg-[#FAFAF7]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#2E2E2E] uppercase tracking-wider">
                Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#2E2E2E] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#2E2E2E] uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#2E2E2E] uppercase tracking-wider">
                Pre-approval
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#2E2E2E] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#E5E7EB]">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-[#FAFAF7]">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[#2E2E2E]">
                    {app.form_data?.fullName || 'N/A'}
                  </div>
                  <div className="text-sm text-[#2E2E2E]">
                    {app.form_data?.emailAddress || 'No email'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(app.status)}
                    <span className="ml-2 capitalize">{app.status.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E2E2E]">
                  {new Date(app.submitted_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-[#2E2E2E]">
                  {app.pre_approval_reason || 'No reason provided'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        // View details
                        alert(JSON.stringify(app.form_data, null, 2))
                      }}
                      className="text-[#1F3A5F] hover:text-opacity-80 flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    
                    {app.status === 'pre_approved' && (
                      <>
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'approved')}
                          className="text-green-600 hover:text-green-800"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'rejected')}
                          className="text-red-600 hover:text-red-800"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}