import React, { useContext } from 'react'
import logo from '../img/logo.jpg'
import { Link } from 'react-router-dom'
import { authContext } from './context/authContext'

const Nav = () => {
  const {currentUser,logout}=useContext(authContext);

  return (

      <div className='navbar'>
        <div className='container'>
            <div className='logo'>
              <img src={logo} alt='logo'/>
            </div>
            <div className='links'>
              <Link className='link'to='/?cat=art'><h6>Art</h6></Link>
              <Link className='link'to='/?cat=science'><h6>Science</h6></Link>
              <Link className='link'to='/?cat=technology'><h6>Technology</h6></Link>
              <Link className='link'to='/?cat=cinema'><h6>Cinema</h6></Link>
              <Link className='link'to='/?cat=design'><h6>Design</h6></Link>
              <Link className='link'to='/?cat=food'><h6>Food</h6></Link>
              <span>{currentUser?.username}</span>
                {currentUser?<span onClick={logout}>Logout</span>:<Link to='/login' className='link'>Login</Link>}
                {currentUser&&
              <span className='write'>
              <Link to='write' className='link'>Write</Link>
              </span>
                }
            </div>
        </div>
      </div>
  
  )
}

export default Nav