"use client"
import ProtectedRoute from '@/app/components/ProtectedRoute'
import React from 'react'

function Layout({children}: {children: React.ReactNode}) {
  return (
      <>
            <div className='p-6 '>{children}</div>
      </>
  )
}

export default Layout;