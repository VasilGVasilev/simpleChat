import Register from "./pages/Register";
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateGuard from "./utils/PrivateGuard";

import { AuthProvider } from './contexts/authContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './style.scss' 

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route element={<PrivateGuard />}>
                        <Route path='/' element={<Home />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
