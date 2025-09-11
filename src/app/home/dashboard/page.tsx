"use client"
import ProtectedRoute from '@/app/components/ProtectedRoute'
import React from 'react'

function page() {
  return (
    <ProtectedRoute redirectTo='/auth/login'>

            <div>Dashboard page</div>

    </ProtectedRoute>
  )
}

export default page