'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AddApplicationDialog() {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Applied')
  const [source, setSource] = useState('LinkedIn')

  const handleSave = async () => {
    const { error } = await supabase
      .from('job_applications')
      .insert([
        {
          company_name: company,
          role_title: role,
          status,
          source,
        },
      ])

    if (error) {
      alert(error.message)
      return
    }

    alert('Application saved!')

    setCompany('')
    setRole('')
    setStatus('Applied')
    setSource('LinkedIn')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          + Add Application
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Company</Label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <Label>Role</Label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div>
            <Label>Status</Label>
            <Input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <div>
            <Label>Source</Label>
            <Input
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>

          <Button
            className="w-full"
            onClick={handleSave}
          >
            Save Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}