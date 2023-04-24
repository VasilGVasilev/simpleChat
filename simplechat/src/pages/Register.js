import React, { useState } from 'react'
import Add from '../img/addImage.png'
import * as authService from '../services/authService'
import { db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'


// we use Authentication, Storage, Firestore Database
// we save profile in Authentication BaaS + image in Storage BaaS
// we save profile in users collection via Firestore Database
const Register = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    displayName: '',
    email: '',
    password: '',
  })

  const [err, setErr] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let file = e.target[3].files[0]; //controlled form fails with file upload

    try {
      // upload info on authentication BaaS
      let res = await authService.register(values.email, values.password) //basically same as auth.currentUser
      console.log(res.user);
      const storageRef = ref(storage, values.displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // upload img in storage BaaS and synchronise it with the profile in authentication BaaS
      uploadTask.on(
        (error) => {
          setErr(true)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {

            // Add user in BaaS "Authentication"
            await updateProfile(res.user, {
              displayName: values.displayName,
              photoURL: downloadURL
            });

            // Add user in collection "users" in BaaS Firestore Database
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: values.displayName,
              email: values.email,
              photoURL: downloadURL,
            }); //enable write to true in collection rules 

            await setDoc(doc(db, "userChats", res.user.uid), {}) //empty object due to no convos intially

            navigate('/')
          });
        }
      );


    } catch (error) {
      setErr(true)
    }

  }

  
  const changeHandler = (e) => {
      setValues(state => ({
          ...state,
          [e.target.name]: e.target.value //we target by name due to state with multiple values, thus, need for constant //reusable
      }));
  };

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder='display name'
                  name='displayName'
                  value={values.displayName}
                  onChange={changeHandler} 
                />
                <input 
                  type="email" 
                  placeholder='email'
                  name='email'
                  value={values.email}
                  onChange={changeHandler} 
                />
                <input 
                  type="password" 
                  placeholder='******'
                  name='password'
                  value={values.password}
                  onChange={changeHandler} 
                />
                {/* display none for input so that label is decorated */}
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add user avatar</span>
                </label>

                <input 
                  style={{display:'none'}} 
                  type="file" 
                  id='file'
                />
                <button>Sign up</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>You have an account? Login</p>
        </div>
    </div>
  )
}

export default Register
