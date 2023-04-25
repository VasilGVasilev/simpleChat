import React from 'react'
import Sidebar from '../componentsHome/LeftSide/Sidebar'
import Chat from '../componentsHome/RightSide/Chat'

const Home = () => {

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
