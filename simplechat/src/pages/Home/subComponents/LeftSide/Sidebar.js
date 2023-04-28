import NavBar from './sidebarSubcomponents/Navbar'
import Search from './sidebarSubcomponents/Search'
import Chats from './sidebarSubcomponents/Chats'

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
