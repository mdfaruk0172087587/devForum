import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [announcementCount, setAnnouncementCount] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    // register
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };
    // update user
    const updateUser = (data) => {
        setLoading(true);
        return updateProfile(auth.currentUser, data)
    }
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
            if (currentUser?.email) {
                const userData = { email: currentUser.email };
                axios.post('http://localhost:3000/jwt', userData, {
                    withCredentials: true
                })
                    .then(() => {

                    })
                    .catch(() => {

                    })
            }
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
        googleLogin,
        updateUser,
        announcementCount,
        setAnnouncementCount,
        setTotalPosts,
        totalPosts,
    }
    return (
        <AuthContext value={userInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;