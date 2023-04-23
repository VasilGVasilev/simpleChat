import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'

// to register user on server
export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password) 
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

// TODO
// abstract createUserWithEmailAndPassword for register
// save currently logged in user in context
// abstract signInWithEmailAndPassword for login
