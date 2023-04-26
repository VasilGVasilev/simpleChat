import * as authService from '../../../services/authService'
import { useAuthContext } from '../../../contexts/authContext'


const Navbar = () => {
  const { currentUser } = useAuthContext();
  return (
    <div className='navbar'>
      <span className='logo'>My profile</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={authService.logout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
