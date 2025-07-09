import axios from 'axios';
import React from 'react';

const axiosUnSecure = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:3000'
    })
    return instance;
};

export default axiosUnSecure;