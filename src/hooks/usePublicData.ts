'use client'

import { useState, useEffect } from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface Project {
  _id: string
  title: string
  description: string
  tech: string[]
  image: string
  link: string
  featured?: boolean
}

interface Testimonial {
  _id: string
  quote: string
  author: string
  role: string
  company: string
  rating?: number
  avatar?: string          // Legacy field
  profilePhoto?: string    // New field
  companyLogo?: string     // New field
  featured?: boolean
  status?: string
  createdAt?: string
}

interface TeamMember {
  _id: string
  name: string
  role: string
  email: string
  location: string
  joinedYear: string
  bio: string
  avatar?: string
}

export function usePublicData() {
  const [projects, setProjects] = useState<Project[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all data in parallel
        const [projectsRes, testimonialsRes, teamRes] = await Promise.all([
          fetch(`${API_BASE_URL}/projects`),
          fetch(`${API_BASE_URL}/testimonials`),
          fetch(`${API_BASE_URL}/team`)
        ])

        if (!projectsRes.ok || !testimonialsRes.ok || !teamRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const [projectsData, testimonialsData, teamData] = await Promise.all([
          projectsRes.json(),
          testimonialsRes.json(),
          teamRes.json()
        ])

        // Extract data from the API response format
        setProjects(projectsData.projects || [])
        setTestimonials(testimonialsData.testimonials || [])
        setTeamMembers(teamData.teamMembers || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching public data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    projects,
    testimonials,
    teamMembers,
    loading,
    error
  }
}
