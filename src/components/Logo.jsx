import React from 'react';
import logo from '../assets/projetLogo.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center justify-center '>
                <img className='w-10' src={logo} alt="" />
                <h1 className='text-xl font-bold '><span className=' text-gray-500'>Dev</span><span className='text-primary'>Forum</span></h1>
            </div>
        </Link>
    );
};

export default Logo;