import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const BannerWithSearch = ({ setCurrentPage, setSearchTag }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    setSearchTag(input.trim());
    setCurrentPage(1);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-24 px-6 text-white text-center rounded-b-3xl shadow-md">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wide">Search Posts by Tag</h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by tag (e.g., React)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input input-bordered w-full pr-10 text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <button
          onClick={handleSearch}
          className="btn btn-accent shadow-md hover:scale-105 transition-transform duration-200"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default BannerWithSearch;
