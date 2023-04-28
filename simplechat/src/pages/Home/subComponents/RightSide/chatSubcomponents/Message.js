import { useEffect, useRef } from 'react'
import { useAuthContext } from '../../../../../contexts/authContext';
import { useChatContext } from '../../../../../contexts/chatContext';

const Message = ({message}) => {
  const { currentUser } = useAuthContext();
  const { chats } = useChatContext();
  const ref = useRef();

  const nlBEFormatter = new Intl.DateTimeFormat('nl-BE');

  // whenever we have a new msg, div with ref={ref} will be scrolled
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:'smooth'})
  },[message])
  
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
        <span style={{fontSize: 10, marginTop: 7}}>{nlBEFormatter.format(message.date.toDate().getTime()).toString()}</span>
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
