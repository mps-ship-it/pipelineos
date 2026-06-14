import { AddApplicationDialog } from '@/components/applications/AddApplicationDialog'
import { ApplicationTable } from '@/components/applications/ApplicationTable'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Applications
        </h1>

        <AddApplicationDialog />
      </div>

      <ApplicationTable />
    </main>
  )
}