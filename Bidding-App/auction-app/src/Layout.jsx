import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Navbar/Nav'
import Footer from './components/Footer/Footer'

function Layout() {
    return (
      <>
      <Nav/>
      <Outlet/>
      <Footer/>
      </>
    )
  }
  
  export default Layout
