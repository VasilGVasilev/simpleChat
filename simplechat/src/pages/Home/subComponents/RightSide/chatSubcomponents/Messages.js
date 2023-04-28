import { useEffect, useState } from 'react'
import Message from './Message'
import { useChatContext } from '../../../../../contexts/chatContext';
import { db } from '../../../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';


const Messages = () => {
  const [ messages, setMessages ] = useState();
  const { chats } = useChatContext();
  // again realtime using onSnapshot()
  useEffect(()=>{
    const unsub = onSnapshot(doc(db, 'chats', chats.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    }
  }, [chats.chatId])
  
  return (
    <div className='messages'>
      {messages?.map(m=>(
        <Message key={m.id} message={m}></Message>
      ))}
    </div>
  )
}

export default Messages
