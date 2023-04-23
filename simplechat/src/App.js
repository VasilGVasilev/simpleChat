import Register from "./pages/Register";
import Login from './pages/Login';
import Home from './pages/Home';

import { AuthProvider } from './contexts/authContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './style.scss'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
