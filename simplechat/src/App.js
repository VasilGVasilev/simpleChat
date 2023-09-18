import Register from "./pages/Register/Register";
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Welcome from "./pages/Welcome/Welcome";

import PrivateGuard from "./utils/PrivateGuard";

import { Routes, Route } from 'react-router-dom';

import './style.scss' 

function App() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<PrivateGuard />}>
                <Route path='/home' element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;
