import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';

// re-directs based on auth status
const PrivateGuard = () => {
    const { isAuthenticated } = useAuthContext();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />  
};

export default PrivateGuard;


//Outlet is a placeholder for the nested routes, thus, you can add markup to Outlet