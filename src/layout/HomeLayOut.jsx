import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const HomeLayOut = () => {
    return (
        <div className='max-w-11/12 mx-auto'>
          <nav>
            <Navbar></Navbar>
          </nav>
           <Outlet></Outlet>
        </div>
    );
};

export default HomeLayOut;