import { createContext, useContext, useReducer, useState } from "react";


export const ChatContext  = createContext();



const chatReducer = (state, action) => {
    switch(action.type){
        case 'SELECT_USER':
            return {
                user: action.payload,
                chatId: action.currentUser.uid > action.payload.uid 
                            ? action.currentUser.uid + action.payload.uid 
                            : action.payload.uid + action.currentUser.uid
            };
        default:
            return state;
    }
}

export const ChatProvider = ({children}) => {

    // we need useReducer to customize update of state, but also better to use when state is a combination of two DBs
    const INITIAL_STATE = {
        chatId: 'null',
        user: {}
    }

    const [chats, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    const [userSelected, setUserSelected] = useState(false);

    const selectUser = (userData, currentUser) => {
        dispatch({
            type: 'SELECT_USER',
            payload: userData,
            currentUser
        })
    }

    return (
        <ChatContext.Provider value={{
            chats,
            selectUser,
            userSelected,
            setUserSelected
        }}>
            {children}
        </ChatContext.Provider>
    )
}


// Custom Hook to not repeat useContext in every Component
export const useChatContext = () => {
    const context = useContext(ChatContext);
    return context;
}