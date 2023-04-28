import { useState } from 'react'
import * as authService from '../../services/authService'

import { useNavigate, Link } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({}); //client error

  const [err, setErr] = useState(false); //server error

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(errors.length > 0){
      return; //stops onSubmit before passing on data to service
    }
  
    try {

      await authService.login(values.email, values.password) // res is basically same as auth.currentUser
      navigate('/home')

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

  const minLength = (e, bound) => {
    setErrors(state => ({
        ...state,
        [e.target.name]: values[e.target.name].length < bound,
    }));
  };

  // Error msg disappears on retry
  const resetError = (e) => {
      setErrors(state => ({
          ...state,
          [e.target.name]: '',
      }));

  };


  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder='email'
                  name='email'
                  value={values.email}
                  onChange={changeHandler}
                  onBlur={(e) => validEmail(e)} 
                  onClick={(e) => resetError(e)}
                />
                <input 
                  type="password"  
                  placeholder='******'
                  name='password'
                  value={values.password}
                  onChange={changeHandler}
                  onBlur={(e) => minLength(e, 4)}  
                  onClick={(e) => resetError(e)}
                />
                <button>Sign in</button>
                {err && <span>Email or password invalid</span>}
            </form>
            <p>You do not have an account? <Link to='/register' style={{ textDecoration: 'none', fontSize: 14 }}>Register</Link></p>
        </div>
    </div>
  )
}

export default Login
