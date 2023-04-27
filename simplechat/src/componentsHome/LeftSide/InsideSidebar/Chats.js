import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase';
import { useAuthContext } from '../../../contexts/authContext';
import { useChatContext } from '../../../contexts/chatContext';



const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuthContext();
  const { selectUser, setUserSelected, userSelected } = useChatContext();


  // realtime listening for changes in collection -> You can listen to a document with the onSnapshot() method.
    // An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. 
    // Then, each time the contents change, another call updates the document snapshot
  useEffect(()=>{
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data())
      });
  
      return () => {
        unsub();
      }
    }

    currentUser.uid && getChats();
  }, [currentUser.uid])

  const handleSelect = (userInfo) => {
    selectUser(userInfo, currentUser)
    setUserSelected(userInfo.uid);
  }



  // console.log(chats); it logs out objects, while we need an array for the leftsidebar, thus, Object.entries()
  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat=>(
        <div className='userChat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              {/* logic - if I have not selected other user, but they have written to me, I get red bold prompt, if I selected the chat with them, no need for lastmessage color specification */}
                <span style={(chat[1].lastMessage?.msgOwner !== currentUser?.uid && chat[1].lastMessage?.msgOwner !== userSelected ) ? { fontWeight:'bold', color: 'red'} : {} }>{chat[1].userInfo.displayName}</span>
                <p style={(chat[1].lastMessage?.msgOwner !== currentUser?.uid && chat[1].lastMessage?.msgOwner !== userSelected) ? { color: 'red'} : {} }>{chat[1].lastMessage?.text}</p>
            </div>
        </div>
      ))}

    </div>
  )
}

export default Chats
