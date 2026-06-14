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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
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
    window.location.reload()
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

            <Select
              value={status}
              onValueChange={setStatus}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Applied">
                  Applied
                </SelectItem>

                <SelectItem value="Interview">
                  Interview
                </SelectItem>

                <SelectItem value="Offer">
                  Offer
                </SelectItem>

                <SelectItem value="Rejected">
                  Rejected
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
     

          <div>
            <Label>Source</Label>

            <Select
              value={source}
              onValueChange={setSource}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="LinkedIn">
                  LinkedIn
                </SelectItem>

                <SelectItem value="Referral">
                  Referral
                </SelectItem>

                <SelectItem value="Company Website">
                  Company Website
                </SelectItem>

                <SelectItem value="Recruiter">
                  Recruiter
                </SelectItem>
              </SelectContent>
            </Select>
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