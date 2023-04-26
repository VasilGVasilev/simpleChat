import Messages from './InsideChat/Messages'
import Input from './InsideChat/Input'

import { useChatContext } from '../../contexts/chatContext';


const Chat = () => {
  const { chats } = useChatContext();
  const defaultGreeting = 'Select user to chat with...';
  const customGreeting = `Chat buddy: ${chats.user?.displayName}`;
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{!!chats.user.displayName ? customGreeting : defaultGreeting}</span>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  )
}

export default Chat
