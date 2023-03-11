import React from 'react'
import Add from '../img/addImage.png'

const Register = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat</span>
            <span className='title'>Register</span>
            <form>
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='******'/>
                {/* display none for input so that label is decorated */}
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add user avatar</span>
                </label>

                <input style={{display:'none'}} type="file"id='file' />
                <button>Sign up</button>
            </form>
            <p>You have an account? Login</p>
        </div>
    </div>
  )
}

export default Register
