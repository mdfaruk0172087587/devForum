import axios from 'axios';
import React from 'react';

const axiosUnSecure = () => {
    const instance = axios.create({
        baseURL: 'https://assignment-12-server-side-zeta.vercel.app'
    })
    return instance;
};

export default axiosUnSecure;