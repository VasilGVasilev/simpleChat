import React from 'react'
import NavBar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <NavBar></NavBar>
      <Search></Search>
      <Chats></Chats>
    </div>
  )
}

export default Sidebar
