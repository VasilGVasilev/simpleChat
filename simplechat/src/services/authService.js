import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'

// Register 
export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password) 

// Login
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

// Logout
export const logout = () => signOut(auth)

// TODO
// abstract createUserWithEmailAndPassword for register
// save currently logged in user in context
// abstract signInWithEmailAndPassword for login
