import { useState } from 'react'
import Add from '../../img/addImage.png'
import * as authService from '../../services/authService'
import { db, storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom'


// we use Authentication, Storage, Firestore Database
// we save profile in Authentication BaaS + image in Storage BaaS
// we save profile in users collection via Firestore Database
const Register = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({}); //client error

  const [err, setErr] = useState(false); //server error

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);

    let file = e.target[4].files[0]; //controlled form fails with file upload

    if(errors.length > 0){
        return; //stops onSubmit before passing on data to service
    }
    
    try {
      // upload info on authentication BaaS
      let res = await authService.register(values.email, values.password) // res is basically same as auth.currentUser

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

            // Add user in collection 'userChats' in BaaS Firestore Database
            await setDoc(doc(db, "userChats", res.user.uid), {}) //empty object due to no convos intially

            navigate('/home')
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
   // Data validation

   const minLength = (e, bound) => {
      setErrors(state => ({
          ...state,
          [e.target.name]: values[e.target.name].length < bound,
      }));
  };
  const minLengthmisMatch = (e, bound) => {
      setErrors(state => ({
          ...state,
          [e.target.name]: values[e.target.name].length < bound,
      }));
      if (values.password != values.confirmPassword) {
          setErrors(state => ({
              ...state,
              mismatch: 'mismatch'
          }))
      }
  } 

  const validEmail = (e) => {
      const regex = /^(.+)@(.+)\.(.+)$/g;
      const found = values[e.target.name].match(regex);

      if(!found){
          setErrors(state => ({
              ...state,
              [e.target.name]: values[e.target.name]
          }));
      }
  };

  // Error msg disappears on retry
  const resetError = (e) => {
      setErrors(state => ({
          ...state,
          [e.target.name]: '',
          mismatch: '',
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
                  onBlur={(e) => minLength(e, 4)}  
                  onClick={(e) => resetError(e)}   
                />
                {errors.displayName &&
                  <p className="formError">
                    Password should be at least 4 characters long!
                  </p>
                }
                <input 
                  type="email" 
                  placeholder='email'
                  name='email'
                  onBlur={(e) => validEmail(e)}  
                  value={values.email}
                  onChange={changeHandler}
                  onClick={(e) => resetError(e)} 
                />
                {errors.email &&
                  <p className="formError">
                    Enter valid email!
                  </p>
                }
                <input 
                  type="password" 
                  placeholder='******'
                  name='password'
                  value={values.password}
                  onChange={changeHandler}
                  onBlur={(e) => minLength(e, 6)}  
                  onClick={(e) => resetError(e)}  
                />
                {errors.password &&
                  <p className="formError">
                    Password should be at least 6 characters long!
                  </p>
                }
                <input 
                  type="password" 
                  placeholder='******'
                  name='confirmPassword'
                  value={values.confirmPassword}
                  onChange={changeHandler}
                  onBlur={(e) => minLengthmisMatch(e, 6)} 
                  onClick={(e) => resetError(e)}  
                />
                {errors.confirmPassword &&
                  <p className="formError">
                    Confirm password should be at least 6 characters long!
                  </p>
                }
                {errors.mismatch &&
                  <p className="formError">
                    Repeated password should match password!
                  </p>
                }
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
            <p>You have an account? <Link to='/login' style={{ textDecoration: 'none', fontSize: 14 }}>Login</Link></p>
        </div>
    </div>
  )
}

export default Register
