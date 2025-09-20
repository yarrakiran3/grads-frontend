"use client"
import ProtectedRoute from '@/app/components/ProtectedRoute'
import React from 'react'

function Layout({children}: {children: React.ReactNode}) {
  return (
      <ProtectedRoute redirectTo='/auth/login'>
            <div>{children}</div>
      </ProtectedRoute>
  )
}

export default Layout;