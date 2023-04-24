import React from 'react'
import * as authService from '../../services/authService'


const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Chat</span>
      <div className="user">
        <img src="https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg" alt="" />
        <span>Billy</span>
        <button onClick={authService.logout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
