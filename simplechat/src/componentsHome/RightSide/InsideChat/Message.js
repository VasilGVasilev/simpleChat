import { useEffect, useRef } from 'react'
import { useAuthContext } from '../../../contexts/authContext'
import { useChatContext } from '../../../contexts/chatContext';

const Message = ({message}) => {
  const { currentUser } = useAuthContext();
  const { chats } = useChatContext();

  const ref = useRef();
  // whenever we have a new msg, div with ref={ref} will be scrolled
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:'smooth'})
  },[message])

  console.log(message.date.toDate());
  // TODO
  // valid date, not seconds nanoseconds
  return (
    <div ref={ref}
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
