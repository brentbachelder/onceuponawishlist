import { onValue } from 'firebase/database'
import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { ref } from "firebase/database"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user ? "User logged in" : "No user")
            setCurrentUser(user)
            const fetchFirebase = async () => {
                if(user)
                    return onValue(ref(db, `/Users/${user.uid}`), querySnapShot => {
                        console.log("updated firebase")
                        let data = querySnapShot.val() || {}
                        setProfile(data)
                    })
                else setProfile({})
            }
            fetchFirebase().catch(console.error)
            setLoading(false)
        })

        return unsubscribe
    }, [])
  
    const value = {
        currentUser,
        profile,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
  
    return (
        <AuthContext.Provider value={ value }>
            { !loading && children }
        </AuthContext.Provider>
    )
}
