import { useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebase';

// use query for search 
const Search = () => {
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

    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch(); //specify that keydown is 'Enter' otherwise it will be any key down
    }
    return (
        <div className='search'>
            <div className='searchForm'>
                <input type="text" placeholder='Search...' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)}/>
            </div>
            {err && <span>User not found</span>}
            { user && 
                <div className='userChat'>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Search
