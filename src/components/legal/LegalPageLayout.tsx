import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, LucideIcon } from 'lucide-react'

interface LegalPageLayoutProps {
  title: string
  description: string
  icon: LucideIcon
  children: React.ReactNode
}

export function LegalPageLayout({ title, description, icon: Icon, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              {description}
            </p>
            <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
