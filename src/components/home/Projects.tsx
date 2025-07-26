'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github, ArrowUpRight, Loader2 } from 'lucide-react'
import { usePublicData } from '@/hooks/usePublicData'



function Projects() {
  const { projects, loading, error } = usePublicData()

  if (loading) {
    return (
      <section id='OurWork' className="py-24 border-l-[1px] border-r-[1px] px-4 sm:px-0 border-border">
        <div className='max-w-5xl mx-auto'>
          <div id='title' className='w-full py-8 flex flex-col items-center justify-center mb-6'>
            <h2 className="font-semibold text-center relative z-20 py-4 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
              Our Previous Work
            </h2>
          </div>
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 border-l-[1px] border-r-[1px] px-4 sm:px-0 border-border">
        <div className='max-w-5xl mx-auto'>
          <div id='title' className='w-full py-8 flex flex-col items-center justify-center mb-6'>
            <h2 className="font-semibold text-center relative z-20 py-4 bg-clip-text text-transparent bg-black dark:bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white">
              Our Previous Work
            </h2>
          </div>
          <div className="text-center text-muted-foreground">
            Failed to load projects. Please try again later.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id='OurWork' className="py-24 border-l-[1px] border-r-[1px] px-4 sm:px-0 border-border">
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
              key={project._id}
              className={`group relative bg-card dark:bg-[#121212] rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-muted overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <span className="text-muted-foreground">No Image</span>
                  </div>
                )}
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Project Links Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-background transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Project Link */}
                <div className="pt-2 border-t border-border">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
                  >
                    View Project
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && !loading && (
          <div className="text-center text-muted-foreground py-12">
            No projects available at the moment.
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects