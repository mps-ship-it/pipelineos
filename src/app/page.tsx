'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/dashboard',
      },
    })
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            PipelineOS
          </h1>

          <p className="mt-4 text-zinc-400 leading-relaxed">
            Your career command center.
            <br />
            Track applications, interviews, and offers.
          </p>

          <Button
            onClick={handleGoogleLogin}
            className="mt-8 w-full rounded-xl bg-white text-black hover:bg-zinc-200"
          >
            Continue with Google
          </Button>

          <p className="mt-6 text-xs text-zinc-500">
            Organize your job hunt like a modern sales pipeline.
          </p>
        </div>
      </div>
    </main>
  )
}