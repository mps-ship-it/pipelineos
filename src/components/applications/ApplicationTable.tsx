'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Application = {
  id: string
  company_name: string
  role_title: string
  status: string
  source: string
}

export function ApplicationTable() {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    async function fetchData() {
      const result = await supabase
        .from('job_applications')
        .select('*')
  
      if (result.data) {
        setApplications(result.data)
      }
    }
  
    fetchData()
  }, [])
  
  const deleteApplication = async (id: string) => {
    const confirmed = window.confirm(
      'Delete this application?'
    )
  
    if (!confirmed) return
  
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', id)
  
    if (error) {
      alert(error.message)
      return
    }
  
    window.location.reload()
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Source</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr
              key={app.id}
              className="border-b border-white/10"
            >
              <td className="p-4">{app.company_name}</td>
              <td className="p-4">{app.role_title}</td>
              <td className="p-4">{app.status}</td>
              <td className="p-4">{app.source}</td>
              <td className="p-4">
  <button
    onClick={() => deleteApplication(app.id)}
    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
  >
    Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}