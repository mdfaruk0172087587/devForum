import React from 'react';
import logo from '../assets/devLogo.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
       <Link to='/'>
        <div>
            <img className='' src={logo} alt="" />
        </div>
       </Link>
    );
};

export default Logo;