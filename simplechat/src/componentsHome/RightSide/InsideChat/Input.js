import { useState } from 'react'
import Img from '../../../img/addImage.png'
import { useAuthContext } from '../../../contexts/authContext';
import { useChatContext } from '../../../contexts/chatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImage] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useAuthContext();
  const { chats, userSelected } = useChatContext();

  const handleSend = async () => {
    // update chats collection in DB 
    if(img){
      // process image
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setErr(true)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {

            await updateDoc(doc(db, "chats", chats.chatId),{
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              })
            })

          });
        }
      );

    } else {
      // process text message
      await updateDoc(doc(db, "chats", chats.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })

    }

    // update userChats collection in DB (for last message in leftSidebar)

    await updateDoc(doc(db, 'userChats', currentUser.uid),{
      // updating nested object done via . notation and here we mix variabale and string via [] notation
      [chats.chatId+'.lastMessage']: {
        text
      },
      [chats.chatId+'.date']: serverTimestamp()
    })

    await updateDoc(doc(db, 'userChats', chats.user.uid),{
      // updating nested object done via . notation and here we mix variabale and string via [] notation
      [chats.chatId+'.lastMessage']: {
        text
      },
      [chats.chatId+'.date']: serverTimestamp()
    })


    setText('');
    setImage(null);
  }
  // enter on input triggers send, too
  const handleKey = (e) => {
    e.code === 'Enter' && handleSend(); //specify that keydown is 'Enter' otherwise it will be any key down
  } 

  return (
    <div className='input'>
      <input 
        type="text" 
        placeholder='Type something...'
        value={text}
        onChange={e=>setText(e.target.value)}
        onKeyDown={handleKey} 
      />
      <div className="send">
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <input 
          type="text" 
          style={{display:'none'}} 
          id='file'
          onChange={e=>setImage(e.target.files[0])}
          disabled={!userSelected ? true : false}
        />
        <button disabled={!userSelected ? true : false} onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
// NB we cannot use serverTimestamp in arrayUnion, thus, there is Timestamp 

export default Input
