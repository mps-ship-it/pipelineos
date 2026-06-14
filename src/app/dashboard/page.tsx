import { AddApplicationDialog } from '@/components/applications/AddApplicationDialog'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Applications
        </h1>

        <AddApplicationDialog />
      </div>

      <div className="mt-8 rounded-xl border border-white/10 p-6">
        <p className="text-zinc-400">
          No applications yet.
        </p>
      </div>
    </main>
  )
}