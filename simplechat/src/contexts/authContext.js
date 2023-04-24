import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext  = createContext();

export const AuthProvider = ({children}) => {
    const [ currentUser, setCurrentUser] = useState({})

    useEffect(()=>{
        // keep data about currently logged-in user or {} in context for app to use
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
        return () => {
            unsub() //against memory leaking
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            currentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}


// Custom Hook to not repeat useContext in every Component
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}