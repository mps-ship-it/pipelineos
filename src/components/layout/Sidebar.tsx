'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function Sidebar() {
    const router = useRouter()

const handleLogout = async () => {
  await supabase.auth.signOut()
  window.location.href = '/'

}
    return (
      <div className="flex h-screen w-48 flex-col border-r border-white/10 bg-black p-6">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold">
            P
          </div>
          <h1 className="text-xl font-bold">
            PipelineOS
          </h1>
        </div>
   
  
        <nav className="flex flex-col gap-2">
          <button className="rounded-xl bg-white/10 px-4 py-3 text-left">
            Applications
          </button>
  
          <button className="rounded-xl px-4 py-3 text-left text-zinc-400 hover:bg-white/5">
            Analytics
          </button>
  
          <button className="rounded-xl px-4 py-3 text-left text-zinc-400 hover:bg-white/5">
            Settings
          </button>
        </nav>
  
        <div className="mt-auto border-t border-white/10 pt-4">
          <div className="mb-4">
            <p className="font-medium">
              Manpreet Singh
            </p>
            <p className="text-sm text-zinc-500">
              PipelineOS Founder
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/10 px-4 py-3 text-left text-zinc-400 hover:bg-white/5"
          >
            Logout
          </button>
     
        </div>
      </div>
    )
  }
   