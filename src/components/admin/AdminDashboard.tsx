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
  Calendar,
  Activity
} from 'lucide-react'
import Link from 'next/link'

// Types
interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  link: string
}

interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  company: string
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

// Mock data
const mockProjects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A modern e-commerce solution with React and Node.js',
    tech: ['React', 'Node.js', 'MongoDB'],
    image: '/project1.jpg',
    link: 'https://example.com'
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    tech: ['React Native', 'Firebase', 'Node.js'],
    image: '/project2.jpg',
    link: 'https://example.com'
  }
]

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'Amazing work! They delivered exactly what we needed.',
    author: 'John Doe',
    role: 'CEO',
    company: 'Tech Corp'
  },
  {
    id: 2,
    quote: 'Professional team with excellent communication skills.',
    author: 'Jane Smith',
    role: 'CTO',
    company: 'Innovation Labs'
  }
]

const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Anubhav Singh',
    role: 'Founder & CEO',
    email: 'anubhav@weanovas.co.in',
    location: 'India',
    joinedYear: '2022',
    bio: 'Visionary leader with a passion for innovation'
  },
  {
    id: 2,
    name: 'Hetvi Patel',
    role: 'Social Media Manager',
    email: 'hetvi@weanovas.co.in',
    location: 'India',
    joinedYear: '2023',
    bio: 'Creative strategist who crafts compelling brand stories'
  }
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    projects: mockProjects.length,
    testimonials: mockTestimonials.length,
    teamMembers: mockTeamMembers.length
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
      <div className="min-h-screen flex w-full bg-muted/40">
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
                <SidebarMenuButton>
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
          <main className="flex-1 p-4 pt-0">
            <div className="mx-auto max-w-6xl">
              {activeTab === 'overview' && (
                <DashboardOverview stats={stats} />
              )}

              {activeTab === 'projects' && (
                <ProjectsManager projects={mockProjects} />
              )}

              {activeTab === 'testimonials' && (
                <TestimonialsManager testimonials={mockTestimonials} />
              )}

              {activeTab === 'team' && (
                <TeamManager teamMembers={mockTeamMembers} />
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
      <div className="grid gap-4 md:grid-cols-2">
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
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New project added</p>
                  <p className="text-xs text-muted-foreground">E-commerce Platform was created</p>
                </div>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Testimonial updated</p>
                  <p className="text-xs text-muted-foreground">John Doe&apos;s review was modified</p>
                </div>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Team member added</p>
                  <p className="text-xs text-muted-foreground">New developer joined the team</p>
                </div>
                <span className="text-xs text-muted-foreground">3d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quick Stats
            </CardTitle>
            <CardDescription>Performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Projects Completed</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Client Satisfaction</span>
                <Badge variant="secondary">98%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Projects</span>
                <Badge variant="secondary">{stats.projects}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Team Growth</span>
                <Badge variant="secondary">+20%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Projects Manager Component
function ProjectsManager({ projects }: { projects: Project[] }) {
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

  const handleSaveProject = (projectData: Omit<Project, 'id'>) => {
    // In a real app, this would make an API call
    console.log('Saving project:', projectData)
    setShowForm(false)
    setEditingProject(undefined)
  }

  const handleDeleteProject = (projectId: number) => {
    // In a real app, this would make an API call
    console.log('Deleting project:', projectId)
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
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="group hover:shadow-md transition-shadow">
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
                  <Button size="sm" variant="outline" onClick={() => handleDeleteProject(project.id)}>
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
function TestimonialsManager({ testimonials }: { testimonials: Testimonial[] }) {
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

  const handleSaveTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    // In a real app, this would make an API call
    console.log('Saving testimonial:', testimonialData)
    setShowForm(false)
    setEditingTestimonial(undefined)
  }

  const handleDeleteTestimonial = (testimonialId: number) => {
    // In a real app, this would make an API call
    console.log('Deleting testimonial:', testimonialId)
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
          <Card key={testimonial.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <blockquote className="text-lg italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditTestimonial(testimonial)}>
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
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
function TeamManager({ teamMembers }: { teamMembers: TeamMember[] }) {
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

  const handleSaveMember = (memberData: Omit<TeamMember, 'id'>) => {
    // In a real app, this would make an API call
    console.log('Saving team member:', memberData)
    setShowForm(false)
    setEditingMember(undefined)
  }

  const handleDeleteMember = (memberId: number) => {
    // In a real app, this would make an API call
    console.log('Deleting team member:', memberId)
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
          <Card key={member.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Email:</span> {member.email}</p>
                  <p><span className="text-muted-foreground">Location:</span> {member.location}</p>
                  <p><span className="text-muted-foreground">Joined:</span> {member.joinedYear}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditMember(member)}>
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteMember(member.id)}>
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
