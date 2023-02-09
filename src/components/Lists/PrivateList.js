import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function PrivateList({ children }) {
    const { currentUser, profile } = useAuth();
    const location = useLocation()
    const listType = location.pathname.split('/')[1];
    const listPage = location.pathname.split('/')[2];

    function isItMine() {
        if(currentUser) {
            if(profile?.Lists?.includes(parseInt(listPage))) return true
        }
        return false
    }

    if(currentUser) {
        const myList = isItMine()
        if(!myList && (listType === 'mylist' || listType === 'preview')) return <Navigate to={`/list/${listPage}`} />
        if(myList && listType !== 'mylist') return <Navigate to={`/mylist/${listPage}`} />
    }
    else {
        if(listType !== 'preview') return <Navigate to={`/preview/${listPage}`} />
    }
  
    return children
}