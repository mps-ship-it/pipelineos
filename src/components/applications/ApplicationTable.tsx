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
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null)
  const [editStatus, setEditStatus] = useState('')
  const appliedCount = applications.filter(
    (app) => app.status === 'Applied'
  ).length
  
  const interviewCount = applications.filter(
    (app) => app.status === 'Interview'
  ).length
  
  const offerCount = applications.filter(
    (app) => app.status === 'Offer'
  ).length
  
  const rejectedCount = applications.filter(
    (app) => app.status === 'Rejected'
  ).length

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
    const confirmed = window.confirm('Delete this application?')
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
  const updateApplication = async (
    id: string
  ) => {
    console.log('Received ID:', id);

    const { data, error } = await supabase
      .from('job_applications')
      .update({
        status: editStatus,
   
      })
      .eq('id', id)
      .select()

    console.log('UPDATED ROWS:', data)
    console.log('UPDATE ERROR:', error)

    alert(
      `Rows updated: ${data ? data.length : 0}`
    )

    if (error) {
      alert(error.message)
      return
    }

    window.location.reload()
  }

  return (
    <>
    {isEditOpen && editingApplication && (

      <div className="mb-6 rounded-xl border border-blue-500 p-4">

        <h2 className="mb-4 text-xl font-bold">

          Edit Application

        </h2>

        <p className="mb-2">

          {editingApplication.company_name}

        </p>

        <select
          value={editStatus}
          onChange={(e) =>
            setEditStatus(e.target.value)
          }
          className="mb-4 rounded border border-white/20 bg-black p-2"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditOpen(false)}
            className="rounded bg-zinc-700 px-3 py-1 text-white"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              updateApplication(
                editingApplication.id
              )
            }
            className="rounded bg-green-600 px-3 py-1 text-white"
          >
            Save
          </button>
        </div>
      </div>
    )}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-sm text-zinc-400">Applied</p>
          <p className="text-3xl font-bold">{appliedCount}</p>
        </div>

        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-sm text-zinc-400">Interview</p>
          <p className="text-3xl font-bold text-blue-500">
            {interviewCount}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-sm text-zinc-400">Offer</p>
          <p className="text-3xl font-bold text-green-500">
            {offerCount}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-sm text-zinc-400">Rejected</p>
          <p className="text-3xl font-bold text-red-500">
            {rejectedCount}
          </p>
        </div>
      </div>

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
              <td className="p-4">
                <span
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
             
                    app.status === 'Applied'
                      ? 'bg-zinc-600 text-white'
                      : app.status === 'Interview'
                      ? 'bg-blue-600 text-white'
                      : app.status === 'Offer'
                      ? 'bg-green-600 text-white'
                      : app.status === 'Rejected'
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-700 text-white'
                  }`}
                >
                  {app.status}
                </span>
              </td>
         
              <td className="p-4">{app.source}</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingApplication(app)
                      setEditStatus(app.status)
                      setIsEditOpen(true)
                    }}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
             
             
             
             

                  <button
                    onClick={() => deleteApplication(app.id)}
                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  )
}