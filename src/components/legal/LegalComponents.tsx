import React from 'react'
import { LucideIcon } from 'lucide-react'

interface ContentSectionProps {
  icon: LucideIcon
  title: string
  iconColor?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
  children: React.ReactNode
}

const iconColorClasses = {
  blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  red: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
}

export function ContentSection({ icon: Icon, title, iconColor = 'blue', children }: ContentSectionProps) {
  return (
    <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
      <div className="flex flex-col lg:flex-row items-start gap-4 mb-6">
        <div className={`p-2 rounded-lg ${iconColorClasses[iconColor]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-3">{title}</h2>
          <div className="space-y-4 text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

interface InfoBoxProps {
  title: string
  children: React.ReactNode
  variant?: 'default' | 'warning' | 'info'
}

export function InfoBox({ title, children, variant = 'default' }: InfoBoxProps) {
  const variantClasses = {
    default: 'bg-muted/50',
    warning: 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800',
  }

  return (
    <div className={`rounded-lg p-4 mt-4 ${variantClasses[variant]}`}>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <div className="text-sm">{children}</div>
    </div>
  )
}

interface RightItemProps {
  title: string
  description: string
}

export function RightItem({ title, description }: RightItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
      <div>
        <strong className="text-foreground">{title}:</strong> {description}
      </div>
    </div>
  )
}

interface ContactSectionProps {
  icon: LucideIcon
  title: string
  description: string
  email: string
  additionalInfo?: string
}

export function ContactSection({ icon: Icon, title, description, email, additionalInfo }: ContactSectionProps) {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border p-8">
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">{title}</h2>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <a href={`mailto:${email}`} className="text-primary hover:underline font-medium">
                {email}
              </a>
            </div>
            {additionalInfo && (
              <p className="text-sm text-muted-foreground">{additionalInfo}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
