import Register from "./pages/Register";
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateGuard from "./utils/PrivateGuard";

import { Routes, Route } from 'react-router-dom';

import './style.scss' 

function App() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<PrivateGuard />}>
                <Route path='/' element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;
