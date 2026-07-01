'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ApplicationCard } from './ApplicationCard'

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
    async function fetchApplications() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {
          ascending: false,
        })

      if (error) {
        console.error(error)
        return
      }

      setApplications(data || [])
    }

    fetchApplications()
  }, [])

  const deleteApplication = async (
    id: string
  ) => {
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

  const updateApplication = async (
    id: string
  ) => {
    const { error } = await supabase
      .from('job_applications')
      .update({
        status: editStatus,
      })
      .eq('id', id)

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

          <p className="mb-3">
            {editingApplication.company_name}
          </p>

          <select
            value={editStatus}
            onChange={(e) =>
              setEditStatus(e.target.value)
            }
            className="mb-4 rounded border border-white/20 bg-black p-2"
          >
            <option value="Applied">
              Applied
            </option>

            <option value="Interview">
              Interview
            </option>

            <option value="Offer">
              Offer
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setIsEditOpen(false)
              }
              className="rounded bg-zinc-700 px-4 py-2 text-white"
            >
              Cancel
            </button>

            <button
              onClick={() =>
                updateApplication(
                  editingApplication.id
                )
              }
              className="rounded bg-green-600 px-4 py-2 text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/10 p-5">
          <p className="text-sm text-zinc-400">
            Applied
          </p>

          <p className="text-3xl font-bold">
            {appliedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <p className="text-sm text-zinc-400">
            Interview
          </p>

          <p className="text-3xl font-bold text-blue-500">
            {interviewCount}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <p className="text-sm text-zinc-400">
            Offer
          </p>

          <p className="text-3xl font-bold text-green-500">
            {offerCount}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 p-5">
          <p className="text-sm text-zinc-400">
            Rejected
          </p>

          <p className="text-3xl font-bold text-red-500">
            {rejectedCount}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            app={app}
            onEdit={() => {
              setEditingApplication(app)
              setEditStatus(app.status)
              setIsEditOpen(true)
            }}
            onDelete={() =>
              deleteApplication(app.id)
            }
          />
        ))}
      </div>
    </>
  )
}