'use client'

import { AuthProvider } from '@/hooks/useAuth'
import AdminLogin from '@/components/admin/AdminLogin'

export default function LoginPage() {
  return (
    <AuthProvider>
      <AdminLogin />
    </AuthProvider>
  )
}
