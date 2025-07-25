'use client'

import { useState, useRef } from 'react'
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
import { Project, Testimonial, TeamMember, apiClient } from '@/lib/api'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ProjectFormProps {
  project?: Project
  onSave: (project: Omit<Project, '_id'>) => void
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
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let imageUrl = formData.image
    
    // Upload image if a file is selected
    if (imageFile) {
      try {
        console.log('Starting image upload...', imageFile.name)
        setUploadingImage(true)
        const response = await apiClient.uploadProjectImage(imageFile)
        console.log('Upload response:', response)
        
        if (response.success && response.data?.image?.url) {
          imageUrl = response.data.image.url
          console.log('Final image URL:', imageUrl)
        } else {
          console.error('Upload response missing image URL:', response)
          alert('Upload failed - no image URL received')
          return
        }
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('Failed to upload image. Please try again.')
        return
      } finally {
        setUploadingImage(false)
      }
    }
    
    onSave({
      title: formData.title,
      description: formData.description,
      tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean),
      image: imageUrl,
      link: formData.link
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Create preview URL for display only
      const previewUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, image: previewUrl }))
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setFormData(prev => ({ ...prev, image: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
              <Label htmlFor="image">Project Image</Label>
              <div className="space-y-3">
                {formData.image && (
                  <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                    <Image
                      src={formData.image}
                      alt="Project preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500">
                  Or enter image URL:
                </div>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  value={imageFile ? '' : formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  disabled={!!imageFile}
                />
              </div>
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
            <Button type="submit" disabled={uploadingImage}>
              {uploadingImage ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                project ? 'Update Project' : 'Add Project'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface TestimonialFormProps {
  testimonial?: Testimonial
  onSave: (testimonial: Omit<Testimonial, '_id'> | FormData) => void
  onCancel: () => void
}

export function TestimonialForm({ testimonial, onSave, onCancel }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    quote: testimonial?.quote || '',
    author: testimonial?.author || '',
    role: testimonial?.role || '',
    company: testimonial?.company || '',
    profilePhoto: testimonial?.profilePhoto || '',
    companyLogo: testimonial?.companyLogo || ''
  })
  
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null)
  const [companyLogoFile, setCompanyLogoFile] = useState<File | null>(null)
  const [uploadingFiles, setUploadingFiles] = useState(false)
  const profilePhotoInputRef = useRef<HTMLInputElement>(null)
  const companyLogoInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploadingFiles(true)
    
    try {
      // If we have files to upload, use FormData
      if (profilePhotoFile || companyLogoFile) {
        const formDataToSubmit = new FormData()
        
        // Add text fields
        formDataToSubmit.append('quote', formData.quote)
        formDataToSubmit.append('author', formData.author)
        formDataToSubmit.append('role', formData.role)
        formDataToSubmit.append('company', formData.company)
        
        // Add files if selected
        if (profilePhotoFile) {
          formDataToSubmit.append('profilePhoto', profilePhotoFile)
        }
        
        if (companyLogoFile) {
          formDataToSubmit.append('companyLogo', companyLogoFile)
        }
        
        console.log('Submitting testimonial with FormData:', {
          hasProfilePhoto: !!profilePhotoFile,
          hasCompanyLogo: !!companyLogoFile,
          textData: {
            quote: formData.quote,
            author: formData.author,
            role: formData.role,
            company: formData.company
          }
        })
        
        // Pass FormData directly to onSave
        await onSave(formDataToSubmit)
      } else {
        // No files, just send regular data
        const testimonialData = {
          quote: formData.quote,
          author: formData.author,
          role: formData.role,
          company: formData.company,
          profilePhoto: formData.profilePhoto,
          companyLogo: formData.companyLogo
        }
        
        await onSave(testimonialData)
      }
    } catch (error) {
      console.error('Error saving testimonial:', error)
      alert('Failed to save testimonial. Please try again.')
    } finally {
      setUploadingFiles(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfilePhotoFile(file)
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, profilePhoto: previewUrl }))
    }
  }

  const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCompanyLogoFile(file)
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, companyLogo: previewUrl }))
    }
  }

  const removeProfilePhoto = () => {
    setProfilePhotoFile(null)
    setFormData(prev => ({ ...prev, profilePhoto: '' }))
    if (profilePhotoInputRef.current) {
      profilePhotoInputRef.current.value = ''
    }
  }

  const removeCompanyLogo = () => {
    setCompanyLogoFile(null)
    setFormData(prev => ({ ...prev, companyLogo: '' }))
    if (companyLogoInputRef.current) {
      companyLogoInputRef.current.value = ''
    }
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
            
            <div className="space-y-2">
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <div className="space-y-3">
                {formData.profilePhoto && (
                  <div className="relative w-32 h-32 mx-auto border rounded-full overflow-hidden">
                    <Image
                      src={formData.profilePhoto}
                      alt="Profile photo preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1"
                      onClick={removeProfilePhoto}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Input
                    ref={profilePhotoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="hidden"
                    id="profilePhoto-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => profilePhotoInputRef.current?.click()}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Profile Photo
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyLogo">Company Logo</Label>
              <div className="space-y-3">
                {formData.companyLogo && (
                  <div className="relative w-32 h-20 mx-auto border rounded overflow-hidden">
                    <Image
                      src={formData.companyLogo}
                      alt="Company logo preview"
                      fill
                      className="object-contain"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1"
                      onClick={removeCompanyLogo}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Input
                    ref={companyLogoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCompanyLogoChange}
                    className="hidden"
                    id="companyLogo-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => companyLogoInputRef.current?.click()}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Company Logo
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploadingFiles}>
              {uploadingFiles ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                testimonial ? 'Update Testimonial' : 'Add Testimonial'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface TeamMemberFormProps {
  teamMember?: TeamMember
  onSave: (teamMember: Omit<TeamMember, '_id'>) => void
  onCancel: () => void
}

export function TeamMemberForm({ teamMember, onSave, onCancel }: TeamMemberFormProps) {
  const [formData, setFormData] = useState({
    name: teamMember?.name || '',
    role: teamMember?.role || '',
    email: teamMember?.email || '',
    location: teamMember?.location || '',
    joinedYear: teamMember?.joinedYear || new Date().getFullYear().toString(),
    bio: teamMember?.bio || '',
    avatar: teamMember?.avatar || ''
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let avatarUrl = formData.avatar
    
    // Upload avatar if a file is selected
    if (avatarFile) {
      try {
        console.log('Starting avatar upload...', avatarFile.name)
        setUploadingAvatar(true)
        const response = await apiClient.uploadTeamAvatar(avatarFile)
        console.log('Avatar upload response:', response)
        
        if (response.success && response.data?.avatar?.url) {
          avatarUrl = response.data.avatar.url
          console.log('Final avatar URL:', avatarUrl)
        } else {
          console.error('Upload response missing avatar URL:', response)
          alert('Upload failed - no avatar URL received')
          return
        }
      } catch (error) {
        console.error('Error uploading avatar:', error)
        alert('Failed to upload avatar. Please try again.')
        return
      } finally {
        setUploadingAvatar(false)
      }
    }
    
    onSave({
      name: formData.name,
      role: formData.role,
      email: formData.email,
      location: formData.location,
      joinedYear: formData.joinedYear,
      bio: formData.bio,
      avatar: avatarUrl
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, avatar: previewUrl }))
    }
  }

  const removeAvatar = () => {
    setAvatarFile(null)
    setFormData(prev => ({ ...prev, avatar: '' }))
    if (avatarInputRef.current) {
      avatarInputRef.current.value = ''
    }
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
              <Label htmlFor="avatar">Profile Avatar</Label>
              <div className="space-y-3">
                {formData.avatar && (
                  <div className="relative w-32 h-32 mx-auto border rounded-full overflow-hidden">
                    <Image
                      src={formData.avatar}
                      alt="Avatar preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1"
                      onClick={removeAvatar}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => avatarInputRef.current?.click()}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Avatar
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500">
                  Or enter avatar URL:
                </div>
                <Input
                  id="avatar"
                  name="avatar"
                  type="url"
                  value={avatarFile ? '' : formData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  disabled={!!avatarFile}
                />
              </div>
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
            <Button type="submit" disabled={uploadingAvatar}>
              {uploadingAvatar ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                teamMember ? 'Update Member' : 'Add Member'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
