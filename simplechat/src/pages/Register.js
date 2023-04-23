import React, { useState } from 'react'
import Add from '../img/addImage.png'
import * as authService from '../services/authService'


const Register = () => {

  const [values, setValues] = useState({
    displayName: '',
    email: '',
    password: '',
  })

  const [err, setErr] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(values.email, values.password)
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

                <input style={{display:'none'}} type="file"id='file' />
                <button>Sign up</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>You have an account? Login</p>
        </div>
    </div>
  )
}

export default Register
