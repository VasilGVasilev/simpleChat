import Messages from './Messages'
import Input from './Input'

import { useChatContext } from '../../contexts/chatContext';


const Chat = () => {
  const { chats } = useChatContext();
  

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{chats.user?.displayName}</span>
        </div>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  )
}

export default Chat
