import React from 'react'
import NavBar from './InsideSidebar/Navbar'
import Search from './InsideSidebar/Search'
import Chats from './InsideSidebar/Chats'

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
