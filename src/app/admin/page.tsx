import { redirect } from 'next/navigation'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

// This would typically check authentication status
async function checkAuth() {
  // Mock authentication check
  // In a real app, this would verify JWT tokens, sessions, etc.
  return true // Change to true when authenticated
}

export default async function AdminPage() {
  const isAuthenticated = await checkAuth()
  
  if (!isAuthenticated) {
    redirect('/admin/login')
  }

  return <AdminDashboard />
}
