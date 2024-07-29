import React from 'react'
import Nav2 from './components/Navbar/Nav2'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'

function LsLayout() {
    return (
      <>
      <Nav2/>
      <Outlet/>
      </>
    )
  }
  
  export default LsLayout