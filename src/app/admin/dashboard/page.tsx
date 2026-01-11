'use client'

import { useState } from 'react'

const mockApplications = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'pending', date: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'approved', date: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'rejected', date: '2024-01-13' },
]

export default function AdminDashboard() {
  const [applications, setApplications] = useState(mockApplications)

  const handleApprove = (id: number) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'approved' } : app
    ))
  }

  const handleReject = (id: number) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'rejected' } : app
    ))
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#1F3A5F] mb-8">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow border border-[#E5E7EB]">
            <h3 className="text-lg font-semibold text-[#1F3A5F]">Total Applications</h3>
            <p className="text-3xl font-bold mt-2">{applications.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-[#E5E7EB]">
            <h3 className="text-lg font-semibold text-[#1F3A5F]">Pending Review</h3>
            <p className="text-3xl font-bold mt-2">{applications.filter(a => a.status === 'pending').length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-[#E5E7EB]">
            <h3 className="text-lg font-semibold text-[#1F3A5F]">Approved</h3>
            <p className="text-3xl font-bold mt-2">{applications.filter(a => a.status === 'approved').length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-xl font-bold text-[#1F3A5F]">Applications</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E5E7EB]">
              <thead className="bg-[#FAFAF7]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#2E2E2E]">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#2E2E2E]">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#2E2E2E]">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#2E2E2E]">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#2E2E2E]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{app.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{app.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{app.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {app.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(app.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(app.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}