'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { Loader2 } from 'lucide-react'

function ProtectedAdminDashboard() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return <AdminDashboard />
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <ProtectedAdminDashboard />
    </AuthProvider>
  )
}
