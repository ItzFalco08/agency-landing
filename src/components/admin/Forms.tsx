'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  link: string
}

interface ProjectFormProps {
  project?: Project
  onSave: (project: Omit<Project, 'id'>) => void
  onCancel: () => void
}

export function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    tech: project?.tech?.join(', ') || '',
    image: project?.image || '',
    link: project?.link || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title: formData.title,
      description: formData.description,
      tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean),
      image: formData.image,
      link: formData.link
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Dialog open onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogDescription>
            {project ? 'Update the project information below.' : 'Fill in the details for the new project.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tech">Technologies</Label>
              <Input
                id="tech"
                name="tech"
                value={formData.tech}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB (comma separated)"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link">Project Link</Label>
              <Input
                id="link"
                name="link"
                type="url"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://example.com"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {project ? 'Update Project' : 'Add Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  company: string
}

interface TestimonialFormProps {
  testimonial?: Testimonial
  onSave: (testimonial: Omit<Testimonial, 'id'>) => void
  onCancel: () => void
}

export function TestimonialForm({ testimonial, onSave, onCancel }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    quote: testimonial?.quote || '',
    author: testimonial?.author || '',
    role: testimonial?.role || '',
    company: testimonial?.company || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Dialog open onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
          <DialogDescription>
            {testimonial ? 'Update the testimonial information below.' : 'Fill in the details for the new testimonial.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quote">Quote</Label>
              <Textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder="Enter the testimonial quote"
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="CEO, CTO, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company name"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {testimonial ? 'Update Testimonial' : 'Add Testimonial'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface TeamMember {
  id: number
  name: string
  role: string
  email: string
  location: string
  joinedYear: string
  bio: string
}

interface TeamMemberFormProps {
  teamMember?: TeamMember
  onSave: (teamMember: Omit<TeamMember, 'id'>) => void
  onCancel: () => void
}

export function TeamMemberForm({ teamMember, onSave, onCancel }: TeamMemberFormProps) {
  const [formData, setFormData] = useState({
    name: teamMember?.name || '',
    role: teamMember?.role || '',
    email: teamMember?.email || '',
    location: teamMember?.location || '',
    joinedYear: teamMember?.joinedYear || new Date().getFullYear().toString(),
    bio: teamMember?.bio || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Dialog open onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{teamMember ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
          <DialogDescription>
            {teamMember ? 'Update the team member information below.' : 'Fill in the details for the new team member.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role/Position</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Software Developer, Designer, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="joinedYear">Joined Year</Label>
                <Input
                  id="joinedYear"
                  name="joinedYear"
                  type="number"
                  min="2020"
                  max="2030"
                  value={formData.joinedYear}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Brief bio or description"
                rows={3}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {teamMember ? 'Update Member' : 'Add Member'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
