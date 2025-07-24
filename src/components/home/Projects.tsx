import React from 'react'
import Link from 'next/link'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  techStack: string[]
  link: string
  githubLink?: string
  image: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with advanced filtering, real-time inventory management, and seamless checkout experience. Built with performance and user experience in mind.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma", "PostgreSQL"],
    link: "https://example-ecommerce.com",
    githubLink: "https://github.com/example/ecommerce",
    image: "/placeholder-project-1.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, team workspaces, and advanced project tracking capabilities.",
    techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    link: "https://example-tasks.com",
    githubLink: "https://github.com/example/tasks",
    image: "/placeholder-project-2.jpg"
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "AI-powered content generation tool that helps businesses create engaging copy, blog posts, and marketing materials with advanced customization options.",
    techStack: ["Next.js", "OpenAI API", "Vercel", "Tailwind CSS", "Supabase"],
    link: "https://example-ai-content.com",
    image: "/placeholder-project-3.jpg",
    featured: true
  },
  {
    id: 4,
    title: "Real Estate Platform",
    description: "Comprehensive real estate platform with property listings, virtual tours, mortgage calculators, and agent management system.",
    techStack: ["Vue.js", "Laravel", "MySQL", "AWS", "Stripe"],
    link: "https://example-realestate.com",
    githubLink: "https://github.com/example/realestate",
    image: "/placeholder-project-4.jpg"
  },
  {
    id: 5,
    title: "Health & Fitness Tracker",
    description: "Personal health and fitness tracking application with workout plans, nutrition tracking, and progress analytics.",
    techStack: ["React Native", "Firebase", "Redux", "Chart.js"],
    link: "https://example-fitness.com",
    image: "/placeholder-project-5.jpg"
  },
  {
    id: 6,
    title: "Learning Management System",
    description: "Educational platform with course creation tools, student progress tracking, interactive quizzes, and video streaming capabilities.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS S3"],
    link: "https://example-lms.com",
    githubLink: "https://github.com/example/lms",
    image: "/placeholder-project-6.jpg"
  }
]

function Projects() {
  return (
    <section className="py-24 border-l-[1px] border-r-[1px] px-4 sm:px-0  border-border">
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div id='title' className='w-full py-8 flex flex-col items-center justify-center mb-6'>
          <h2 className="font-semibold text-center relative z-20 py-4 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
            Our Previous Work
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl ">
            See the projects we&apos;ve built for our clients. From online stores to mobile apps, 
            we create digital solutions that work.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group relative bg-card dark:bg-[#121212] rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                {/* Placeholder for project image */}
                <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-muted/20 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/30">{project.id}</div>
                </div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center gap-3">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black p-2 rounded-full hover:bg-white/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black p-2 rounded-full hover:bg-white/90 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-md">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-3">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View Project
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  {project.githubLink && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Code
                        <Github className="w-3 h-3" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors group"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 transition-all ease-out group-hover:ml-3 group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Projects