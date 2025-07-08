import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true)



// register
const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
};

// login 
const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
};

// google login
const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
}

// logout
const logout = () => {
    setLoading(true);
    return signOut(auth);
};



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    })

    const userInfo = {
        user,
        loading,
        createUser,
        login,
        logout,
        googleLogin

    }
    return (
        <AuthContext value={userInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;