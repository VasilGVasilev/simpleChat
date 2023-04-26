import React from 'react'
import { useAuthContext } from '../../../contexts/authContext'
import { useChatContext } from '../../../contexts/chatContext';

const Message = ({message}) => {
  const { currentUser } = useAuthContext();
  const { chats } = useChatContext();
  // TODO
  // valid date, not seconds nanoseconds
  return (
    <div 
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
      <div className="messageInfo">
        <img 
          src={
            message.senderId === currentUser.uid 
              ? currentUser.photoURL 
              : chats.user.photoURL
          } 
          alt="" 
        />
        <span></span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img &&         
          <img 
            src={message.img} 
            alt="" 
          />
        }
      </div>
    </div>
  )
}

export default Message
