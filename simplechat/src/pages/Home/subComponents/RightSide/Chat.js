import Messages from './chatSubcomponents/Messages'
import Input from './chatSubcomponents/Input'

import { useChatContext } from '../../../../contexts/chatContext';


const Chat = ({showSidebar, chatStyle}) => {
  const { chats } = useChatContext();
  const defaultGreeting = 'Select user to chat with...';
  const customGreeting = `Chat buddy: ${chats.user?.displayName}`;
  return (
    <div 
      className={window.innerWidth > 450 ? 'chat' : chatStyle}
      data-cy="chat"
    >
      <div className="chatInfo">
        <span>{!!chats.user.displayName ? customGreeting : defaultGreeting}</span>
        {/* todo disable hide button in laptop version */}
        <button 
          onClick={showSidebar}
          data-cy="backToSidebar"
        >&lt;</button>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  )
}

export default Chat
