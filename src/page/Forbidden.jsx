import React from 'react';
import { FaUserShield } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <FaUserShield className="text-red-500 text-6xl mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
            <p className="text-lg text-gray-600 mb-6">
                You do not have permission to access this page. <br />
                This section is restricted to certain user roles.
            </p>
            <Link to="/" className="btn btn-primary">
                🔙 Back to Home
            </Link>
        </div>
    );
};

export default Forbidden;
