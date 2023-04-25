import React from 'react'
import { useAuthContext } from '../../contexts/authContext'
import { useChatContext } from '../../contexts/chatContext';

const Message = (message) => {
  const { currentUser } = useAuthContext();
  const { chats } = useChatContext();

  return (
    <div className='message owner'>
      <div className="messageInfo">
        <img src='' alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg" alt="" />
      </div>
    </div>
  )
}

export default Message
