import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth();
    const location = useLocation()
  
    return currentUser ? children : <Navigate to={"/login"} state={ location } />;
}