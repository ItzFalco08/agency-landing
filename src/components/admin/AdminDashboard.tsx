'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { ProjectForm, TestimonialForm, TeamMemberForm } from './Forms'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  MessageSquare, 
  FolderOpen, 
  LogOut,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  BarChart3,
  Home,
  Settings,
  Bell,
  User,
  Activity,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useProjects, useTestimonials, useTeamMembers } from '@/hooks/useApiData'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import { Project, Testimonial, TeamMember } from '@/lib/api'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const { logout } = useAuth()
  
  // API hooks
  const {
    projects,
    loading: projectsLoading,
    createProject,
    updateProject,
    deleteProject,
  } = useProjects()

  const {
    testimonials,
    loading: testimonialsLoading,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  } = useTestimonials()

  const {
    teamMembers,
    loading: teamLoading,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
  } = useTeamMembers()

  const stats = {
    projects: projects.length,
    testimonials: testimonials.length,
    teamMembers: teamMembers.length
  }

  // Wrapper functions to handle FormData for testimonials
  const handleCreateTestimonial = async (testimonialData: Omit<Testimonial, '_id'> | FormData) => {
    if (testimonialData instanceof FormData) {
      // Let the API client handle FormData directly
      try {
        await apiClient.createTestimonial(testimonialData)
        // Refresh testimonials
        window.location.reload() // Simple refresh for now
      } catch (error) {
        console.error('Error creating testimonial:', error)
        throw error
      }
    } else {
      await createTestimonial(testimonialData)
    }
  }

  const handleUpdateTestimonial = async (id: string, testimonialData: Partial<Testimonial> | FormData) => {
    if (testimonialData instanceof FormData) {
      // Let the API client handle FormData directly
      try {
        await apiClient.updateTestimonial(id, testimonialData)
        // Refresh testimonials
        window.location.reload() // Simple refresh for now
      } catch (error) {
        console.error('Error updating testimonial:', error)
        throw error
      }
    } else {
      await updateTestimonial(id, testimonialData)
    }
  }

  // Sidebar navigation items
  const navigationItems = [
    {
      title: "Overview",
      icon: Home,
      id: "overview",
    },
    {
      title: "Projects",
      icon: FolderOpen,
      id: "projects",
    },
    {
      title: "Testimonials", 
      icon: MessageSquare,
      id: "testimonials",
    },
    {
      title: "Team Members",
      icon: Users,
      id: "team",
    },
  ]

  const getPageTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Dashboard Overview'
      case 'projects': return 'Projects'
      case 'testimonials': return 'Testimonials'
      case 'team': return 'Team Members'
      default: return 'Dashboard'
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-neutral-950 ">
        {/* Sidebar */}
        <Sidebar variant="inset" className='bg-neutral-900'>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <div>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <BarChart3 className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Admin Panel</span>
                      <span className="truncate text-xs">Weanovas Agency</span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/">
                        <Eye />
                        <span>View Site</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User />
                  <span>Admin User</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/admin">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{getPageTitle()}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto px-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Badge variant="secondary" className="hidden sm:flex">
                  Admin
                </Badge>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 pt-12">
            <div className="mx-auto max-w-6xl">
              {activeTab === 'overview' && (
                <DashboardOverview stats={stats} />
              )}

              {activeTab === 'projects' && (
                <ProjectsManager 
                  projects={projects} 
                  loading={projectsLoading}
                  onCreateProject={createProject}
                  onUpdateProject={updateProject}
                  onDeleteProject={deleteProject}
                />
              )}

              {activeTab === 'testimonials' && (
                <TestimonialsManager 
                  testimonials={testimonials}
                  loading={testimonialsLoading}
                  onCreateTestimonial={handleCreateTestimonial}
                  onUpdateTestimonial={handleUpdateTestimonial}
                  onDeleteTestimonial={deleteTestimonial}
                />
              )}

              {activeTab === 'team' && (
                <TeamManager 
                  teamMembers={teamMembers}
                  loading={teamLoading}
                  onCreateTeamMember={createTeamMember}
                  onUpdateTeamMember={updateTeamMember}
                  onDeleteTeamMember={deleteTeamMember}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

// Dashboard Overview Component
function DashboardOverview({ stats }: { stats: { projects: number, testimonials: number, teamMembers: number } }) {
  // Generate recent activity based on current data
  const getRecentActivity = () => {
    const activities = []
    
    if (stats.projects > 0) {
      activities.push({
        type: 'project',
        title: 'Projects Active',
        description: `${stats.projects} project${stats.projects !== 1 ? 's' : ''} currently in portfolio`,
        time: 'Active',
        color: 'bg-green-500'
      })
    }
    
    if (stats.testimonials > 0) {
      activities.push({
        type: 'testimonial',
        title: 'Client Reviews',
        description: `${stats.testimonials} testimonial${stats.testimonials !== 1 ? 's' : ''} from satisfied clients`,
        time: 'Updated',
        color: 'bg-blue-500'
      })
    }
    
    if (stats.teamMembers > 0) {
      activities.push({
        type: 'team',
        title: 'Team Status',
        description: `${stats.teamMembers} team member${stats.teamMembers !== 1 ? 's' : ''} actively working`,
        time: 'Online',
        color: 'bg-purple-500'
      })
    }
    
    // Add default activity if no data
    if (activities.length === 0) {
      activities.push({
        type: 'default',
        title: 'Welcome to Admin Dashboard',
        description: 'Start by adding your first project, testimonial, or team member',
        time: 'Now',
        color: 'bg-gray-500'
      })
    }
    
    return activities
  }

  const recentActivities = getRecentActivity()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Manage your agency&apos;s content and team members
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/50 bg-card hover:bg-accent/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 bg-card hover:bg-accent/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.testimonials}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-border/50 bg-card hover:bg-accent/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.teamMembers}</div>
            <p className="text-xs text-muted-foreground">
              Active members
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates across all sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Projects Manager Component
function ProjectsManager({ 
  projects, 
  loading,
  onCreateProject,
  onUpdateProject,
  onDeleteProject 
}: { 
  projects: Project[]
  loading: boolean
  onCreateProject: (projectData: Omit<Project, '_id'>) => Promise<void>
  onUpdateProject: (id: string, projectData: Partial<Project>) => Promise<void>
  onDeleteProject: (id: string) => Promise<void>
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()

  const handleAddProject = () => {
    setEditingProject(undefined)
    setShowForm(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleSaveProject = async (projectData: Omit<Project, '_id'>) => {
    try {
      if (editingProject?._id) {
        await onUpdateProject(editingProject._id, projectData)
      } else {
        await onCreateProject(projectData)
      }
      setShowForm(false)
      setEditingProject(undefined)
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    try {
      await onDeleteProject(projectId)
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={handleAddProject}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        {searchTerm && (
          <div className="text-sm text-muted-foreground">
            {filteredProjects.length} of {projects.length} projects
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Card key={project._id} className="group hover:shadow-md transition-shadow overflow-hidden">
              {/* Project Image */}
              {project.image && (
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteProject(project._id!)}>
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No projects found</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? `No projects match "${searchTerm}"` : 'No projects available'}
            </p>
          </div>
        )}
      </div>

      {/* Form Dialog */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setShowForm(false)
            setEditingProject(undefined)
          }}
        />
      )}
    </div>
  )
}

// Testimonials Manager Component
function TestimonialsManager({ 
  testimonials,
  loading,
  onCreateTestimonial,
  onUpdateTestimonial,
  onDeleteTestimonial 
}: { 
  testimonials: Testimonial[]
  loading: boolean
  onCreateTestimonial: (testimonialData: Omit<Testimonial, '_id'> | FormData) => Promise<void>
  onUpdateTestimonial: (id: string, testimonialData: Partial<Testimonial> | FormData) => Promise<void>
  onDeleteTestimonial: (id: string) => Promise<void>
}) {
  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | undefined>()

  const handleAddTestimonial = () => {
    setEditingTestimonial(undefined)
    setShowForm(true)
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setShowForm(true)
  }

  const handleSaveTestimonial = async (testimonialData: Omit<Testimonial, '_id'> | FormData) => {
    try {
      if (editingTestimonial?._id) {
        await onUpdateTestimonial(editingTestimonial._id, testimonialData)
      } else {
        await onCreateTestimonial(testimonialData)
      }
      setShowForm(false)
      setEditingTestimonial(undefined)
    } catch (error) {
      console.error('Error saving testimonial:', error)
    }
  }

  const handleDeleteTestimonial = async (testimonialId: string) => {
    try {
      await onDeleteTestimonial(testimonialId)
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Testimonials</h2>
          <p className="text-muted-foreground">Manage client reviews and feedback</p>
        </div>
        <Button onClick={handleAddTestimonial}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial._id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  {/* Profile Photo */}
                  <div className="flex-shrink-0">
                    {testimonial.profilePhoto || testimonial.avatar ? (
                      <Image
                        src={testimonial.profilePhoto || testimonial.avatar || ''}
                        alt={`${testimonial.author} profile`}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <blockquote className="text-lg italic mb-3">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                        
                        {/* Company Logo */}
                        {testimonial.companyLogo && (
                          <div className="ml-3">
                            <Image
                              src={testimonial.companyLogo}
                              alt={`${testimonial.company} logo`}
                              width={32}
                              height={32}
                              className="rounded object-contain"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditTestimonial(testimonial)}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteTestimonial(testimonial._id!)}>
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Form Dialog */}
      {showForm && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onSave={handleSaveTestimonial}
          onCancel={() => {
            setShowForm(false)
            setEditingTestimonial(undefined)
          }}
        />
      )}
    </div>
  )
}

// Team Manager Component
function TeamManager({ 
  teamMembers,
  loading,
  onCreateTeamMember,
  onUpdateTeamMember,
  onDeleteTeamMember 
}: { 
  teamMembers: TeamMember[]
  loading: boolean
  onCreateTeamMember: (memberData: Omit<TeamMember, '_id'>) => Promise<void>
  onUpdateTeamMember: (id: string, memberData: Partial<TeamMember>) => Promise<void>
  onDeleteTeamMember: (id: string) => Promise<void>
}) {
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | undefined>()

  const handleAddMember = () => {
    setEditingMember(undefined)
    setShowForm(true)
  }

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member)
    setShowForm(true)
  }

  const handleSaveMember = async (memberData: Omit<TeamMember, '_id'>) => {
    try {
      if (editingMember?._id) {
        await onUpdateTeamMember(editingMember._id, memberData)
      } else {
        await onCreateTeamMember(memberData)
      }
      setShowForm(false)
      setEditingMember(undefined)
    } catch (error) {
      console.error('Error saving team member:', error)
    }
  }

  const handleDeleteMember = async (memberId: string) => {
    try {
      await onDeleteTeamMember(memberId)
    } catch (error) {
      console.error('Error deleting team member:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team Members</h2>
          <p className="text-muted-foreground">Manage your team information</p>
        </div>
        <Button onClick={handleAddMember}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member._id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                    {member.avatar ? (
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Users className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-base">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="text-xs text-muted-foreground">{member.location}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Email:</span> {member.email}</p>
                  <p><span className="text-muted-foreground">Joined:</span> {member.joinedYear}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{member.bio}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditMember(member)}>
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteMember(member._id!)}>
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Form Dialog */}
      {showForm && (
        <TeamMemberForm
          teamMember={editingMember}
          onSave={handleSaveMember}
          onCancel={() => {
            setShowForm(false)
            setEditingMember(undefined)
          }}
        />
      )}
    </div>
  )
}
