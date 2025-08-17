import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const BannerWithSearch = ({ setCurrentPage, setSearchTag }) => {
  const [input, setInput] = useState('');
  const handleSearch = () => {
    setSearchTag(input.trim());
    setCurrentPage(1);
  };
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-24 px-6 text-white text-center  shadow-md">
      <h1 className="text-4xl font-extrabold tracking-wide">Welcome to Dev Forum </h1>
      <p className='text-xl mb-8'>The most popular forum on the internet!</p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by tag (e.g., React)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input input-bordered w-full pr-10 placeholder-gray-400 dark:placeholder-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-accent bg-white text-gray-800"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none" />
        </div>
        <button
          onClick={handleSearch}
          className="btn btn-primary shadow-md hover:scale-105 transition-transform duration-200"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default BannerWithSearch;
