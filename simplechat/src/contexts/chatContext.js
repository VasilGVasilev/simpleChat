import { createContext, useContext, useEffect, useReducer } from "react";


export const ChatContext  = createContext();



const chatReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_USER':
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

    const [chats, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    const changeUser = (userData, currentUser) => {
        dispatch({
            type: 'CHANGE_USER',
            payload: userData,
            currentUser
        })
    }

    return (
        <ChatContext.Provider value={{
            changeUser
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