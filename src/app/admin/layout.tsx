import React from 'react'

function Layout({children}:{children: React.ReactNode}) {
  return (
    <div>Admin Layout
        <div>
            {children}
        </div>
    </div>
  )
}

export default Layout