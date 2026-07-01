type Application = {
    id: string
    company_name: string
    role_title: string
    status: string
    source: string
  }
  
  type ApplicationCardProps = {
    app: Application
    onEdit: () => void
    onDelete: () => void
  }
  
  export function ApplicationCard({
    app,
    onEdit,
    onDelete,
  }: ApplicationCardProps) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold">
            {app.company_name}
          </h3>
  
          <p className="mt-2 text-sm text-zinc-500">
            {app.role_title}
          </p>
        </div>
  
        <div className="mb-4">
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
        </div>
  
        <div className="mb-4 text-sm text-zinc-500">
          Source: {app.source}
        </div>
  
        <div className="mt-4 flex gap-2">
          <button
            onClick={onEdit}
            className="rounded-xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Edit
          </button>
  
          <button
            onClick={onDelete}
            className="rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    )
  }