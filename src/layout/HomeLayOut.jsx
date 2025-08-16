import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomeLayOut = () => {
  return (
    <div className=''>
      <nav className='sticky top-0 z-50'>
        <Navbar></Navbar>
      </nav>
      <main className='max-w-11/12 mx-auto'>
        <Outlet></Outlet>
      </main>
      <footer className=''>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayOut;