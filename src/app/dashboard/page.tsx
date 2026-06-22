'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabase'

import { AddApplicationDialog } from '@/components/applications/AddApplicationDialog'
import { ApplicationTable } from '@/components/applications/ApplicationTable'
import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/')
      }
    }

    checkUser()
  }, [router])

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Applications
            </h1>
            <p className="mt-2 text-zinc-500">
              Track applications, interviews and offers
            </p>
          </div>
          <AddApplicationDialog />
        </div>
   
   

        <ApplicationTable />
      </main>
    </div>
  )
}