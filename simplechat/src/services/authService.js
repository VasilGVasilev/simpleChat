import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase'

// Register user 
export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password) 
// Logout
export const logout = () => signOut(auth)



// TODO
// abstract createUserWithEmailAndPassword for register
// save currently logged in user in context
// abstract signInWithEmailAndPassword for login
