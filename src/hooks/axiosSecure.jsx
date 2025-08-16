import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'https://assignment-12-server-side-zeta.vercel.app',
    withCredentials: true
})

const axiosSecure = () => {
    return instance;
};

export default axiosSecure;