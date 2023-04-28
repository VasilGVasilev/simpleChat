import React from 'react'
import Sidebar from './subComponents/LeftSide/Sidebar'
import Chat from './subComponents/RightSide/Chat'

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
