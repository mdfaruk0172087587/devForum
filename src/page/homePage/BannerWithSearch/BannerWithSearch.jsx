import React, { useState } from 'react';


const BannerWithSearch = ({ setCurrentPage, setSearchTag }) => {

    const [input, setInput] = useState('')


    const handleSearch = () => {

        setSearchTag(input.trim())
        setCurrentPage(1);
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white text-center">
            <h1 className="text-3xl font-bold mb-4">Search Posts by Tag</h1>

            <div className="flex justify-center gap-2">
                <input
                    type="text"
                    placeholder="Search by tag (e.g., React)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="input input-bordered w-full max-w-md text-black"
                />
                <button onClick={handleSearch} className="btn btn-accent">Search</button>
            </div>
        </div>
    );
};

export default BannerWithSearch;
