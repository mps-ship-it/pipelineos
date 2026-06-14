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

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Source</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}