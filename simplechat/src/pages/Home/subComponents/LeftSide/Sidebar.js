import NavBar from './sidebarSubcomponents/Navbar'
import Search from './sidebarSubcomponents/Search'
import Chats from './sidebarSubcomponents/Chats'

const Sidebar = ({showChat, sidebarStyle}) => {
  return (
    <div 
      data-cy="sidebar"
      className={window.innerWidth > 450 ? 'sidebar' : sidebarStyle}
    >
      <NavBar></NavBar>
      <Search></Search>
      <Chats showChat={showChat}></Chats>
    </div>
  )
}

export default Sidebar
