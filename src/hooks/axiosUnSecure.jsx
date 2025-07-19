import axios from 'axios';
import React from 'react';

const axiosUnSecure = () => {
    const instance = axios.create({
        // baseURL: 'http://localhost:3000',
        baseURL: 'https://assignment-12-server-side-zeta.vercel.app'
    })
    return instance;
};

export default axiosUnSecure;