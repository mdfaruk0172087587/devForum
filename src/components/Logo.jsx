import React from 'react';
import logo from '../assets/logo.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
       <Link to='/'>
        <div>
            <img className='w-20 h-10' src={logo} alt="" />
        </div>
       </Link>
    );
};

export default Logo;