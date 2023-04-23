import React from 'react'
import Sidebar from '../componentsHome/LeftSide/Sidebar'
import Chat from '../componentsHome/RightSide/Chat'
import { useAuthContext } from '../contexts/authContext'

const Home = () => {
    const {currentUser} = useAuthContext();

    console.log(currentUser);
    return (
        <div className='home'>
            <div className='container'>
                <Sidebar></Sidebar>
                <Chat></Chat>
            </div>
        </div>
    )
}

export default Home
