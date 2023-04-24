import React from 'react'
import { useNavigate, Link } from 'react-router-dom'


const Login = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat</span>
            <span className='title'>Login</span>
            <form>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='******'/>
                <button>Sign in</button>
            </form>
            <p>You do not have an account? <Link to='/register' style={{ textDecoration: 'none', fontSize: 14 }}>Register</Link></p>
        </div>
    </div>
  )
}

export default Login
