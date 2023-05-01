import * as authService from '../../../../../services/authService'
import { useAuthContext } from '../../../../../contexts/authContext'
import { useChatContext } from '../../../../../contexts/chatContext'



const Navbar = () => {
  const { currentUser } = useAuthContext();
  const { defaultState } = useChatContext();

  const logout = () => {
    defaultState() //no chat data is stored in state inbetween two authentication sessions
    authService.logout();
  }
  return (
    <div className='navbar'>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
      </div>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Navbar
