import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
    <Navbar />
    <div className="min-h-[calc(100vh-112px-268.8px)] min-w-[400px]">
      <Outlet />
    </div>
    <Footer />
  </>
}
