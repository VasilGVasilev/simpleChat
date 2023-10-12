import { useReducer } from 'react'
import Sidebar from './subComponents/LeftSide/Sidebar'
import Chat from './subComponents/RightSide/Chat'

const sidebarReducer = (state, action) => {
    switch(action.type){
        // laptop
        case 'sidebar':
            return 'sidebar';
        // mobile
        case 'hideSidebar':
            return 'sidebarHidden';
        case 'showSidebar':
            return 'sidebarShow';
        default:
            return state;
    }
}

const chatReducer = (state, action) => {
    switch(action.type){
        // laptop
        case 'chat':
            return 'chat';
        // mobile
        case 'showChat':
            return 'chatShow';
        case 'hideChat':
            return 'chatHidden';
        default:
            return state;
    }
}

const Home = () => {
    const [sidebarStyle, dispatchSidebar] = useReducer(sidebarReducer, 'sidebarShow');
    const [chatStyle, dispatchChat] = useReducer(chatReducer, 'chatHidden');
    
    const showChatWithUser = () => {
        if(window.innerWidth < 450){
            dispatchSidebar({
                type: 'hideSidebar',
            })
            dispatchChat({
                type: 'showChat',
            })
        }
    }

    const showSidebar = () => {
        if(window.innerWidth < 450){
            dispatchSidebar({
                type: 'showSidebar',
            })
            dispatchChat({
                type: 'hideChat',
            })
        } 
    }

    return (
        <div className='home'>
            <div className='container'>
                <Sidebar showChat={showChatWithUser} sidebarStyle={sidebarStyle}></Sidebar>
                <Chat showSidebar={showSidebar} chatStyle={chatStyle} ></Chat>
            </div>
        </div>
    )
}

export default Home

// using useReducer because basic useState does not give conditionality:
// We look at the device's resolution and determine which CSS to have, the value being stored in
// the useReducer value, while the handleFunction utilizes the the useReducer dispatch function


// as a CSS feature, show chat/ back to chats is a functionality that should be in Home component and passed on as a prop, not clutter Context API
