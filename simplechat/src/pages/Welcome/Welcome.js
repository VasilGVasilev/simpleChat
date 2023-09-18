import { Link } from "react-router-dom";

const Welcome = () => {


    return (
        <div className='welcomeContainer'>
            <div className='formWrapper'>
                <span className='logo'>VGV Chat</span>
                <div className="welcomeBtns">

                    <Link to='/login' style={{ textDecoration: 'none', fontSize: 20 }}><span className='titleLogin'>Login</span></Link>
                    <Link to='/register' style={{ textDecoration: 'none', fontSize: 20 }}><span className='titleRegister'>Register</span></Link>
                </div>
            </div>
        </div >
    )
}

export default Welcome