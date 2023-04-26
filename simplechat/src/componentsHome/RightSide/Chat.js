import Messages from './InsideChat/Messages'
import Input from './InsideChat/Input'

import { useChatContext } from '../../contexts/chatContext';


const Chat = () => {
  const { chats } = useChatContext();
  const defaultGreeting = 'Select user to chat with...';
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{!!chats.user.displayName ? chats.user?.displayName : defaultGreeting}</span>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  )
}

export default Chat
