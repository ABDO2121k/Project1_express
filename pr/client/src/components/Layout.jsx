import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='container'>
          <Nav/>
          <Outlet/>
          <Footer/>
    </div>

  )
}

export default Layout