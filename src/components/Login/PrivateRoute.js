import { Navigate } from 'react-router-dom'
import { useAuth } from '../../etc/AuthContext'

export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth();

    return currentUser ? <Navigate to={"/dashboard"} /> : children;
}