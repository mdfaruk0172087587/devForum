import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

const axiosSecure = () => {
    return instance;
};

export default axiosSecure;