import React from 'react'
import DasboardProvider from './provider'

function DashboardLayout({ children }) {
  return (
    <DasboardProvider>
       <div>
        { children }
       </div>
    </DasboardProvider>
  )
}

export default DashboardLayout