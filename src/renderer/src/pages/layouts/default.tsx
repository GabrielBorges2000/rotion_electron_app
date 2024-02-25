// import { Outlet } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'

export function Default() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)

  return (
    <Collapsible.Root
      defaultOpen
      onOpenChange={setIsSideBarOpen}
      className="h-screen w-screen bg-rotion-900 text-rotion-100 flex"
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen scrollbar-thin scrollbar-thumb-rotion-600 overflow-y-scroll scrollbar-track-rotion-800">
        <Header isSideBarOpen={isSideBarOpen} />
        <Outlet />
      </div>
    </Collapsible.Root>
  )
}
