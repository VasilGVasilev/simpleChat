import { useState } from 'react'
import { collection, query, where, getDoc, getDocs, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../../../../firebase';
import { useAuthContext } from '../../../../../contexts/authContext'


// use query for search 
const Search = () => {

    const { currentUser } = useAuthContext();

    const [username, setUsername] = useState(''); // username to search for
    const [user, setUser] = useState(null); //user that is searched for
    const [err, setErr] = useState(false);

    const handleSearch = async () => {
        // create query
        const usersRef = collection(db, "users");
        const q = query(usersRef, where('displayName', "==", username))
        try {
        // use query
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              setUser(doc.data())
            });
            
        } catch (error) {
            setErr(true)
        }
        
    }

    const handleSelect = async () => {
        // check if the group(chat in firestore) exists, if not create new one
        // TODO: see logic behind this
        const combinedId = 
            currentUser.uid > user.uid 
                ? currentUser.uid + user.uid 
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            // initiate db relations
            if(!res.exists()) { //firebase method
                // create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), {messages: []});

                // create reference to update user chats
                const currentUserChatsRef = doc(db, 'userChats', currentUser.uid);
                const searchedUserChatsRef = doc(db, 'userChats', user.uid);

                // currentUser perspective
                await updateDoc(currentUserChatsRef, {
                  [combinedId + '.userInfo']: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                  },
                  [combinedId + '.date']: serverTimestamp() //firebase default time setter
                });
                // serachedUser perspective
                await updateDoc(searchedUserChatsRef, {
                    [combinedId + '.userInfo']: {
                      uid: currentUser.uid,
                      displayName: currentUser.displayName,
                      photoURL: currentUser.photoURL
                    },
                    [combinedId + '.date']: serverTimestamp()
                  });

            }
        } catch (error) {
            
        }
        // pop user off sidebar after search
        setUser(null);
        setUsername('');
    }

    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch(); //specify that keydown is 'Enter' otherwise it will be any key down
    }

    return (
        <div className='search'>
            <div className='searchForm'>
                <input 
                    type="text" 
                    placeholder='Search...'
                    value={username} 
                    onKeyDown={handleKey} 
                    onChange={e => setUsername(e.target.value)}
                    data-cy='searchBtn'
                />
            </div>
            {err && <span>User not found</span>}
            { user && 
                <div className='userChat' onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span data-cy='searchedDisplayName' >{user.displayName}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Search
