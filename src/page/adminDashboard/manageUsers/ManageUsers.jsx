import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../hooks/axiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading';
import useAuth from '../../../hooks/useAuth';
import { FaSearch, FaUserShield, FaUserTimes } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Pagination from '../../homePage/Pagination';

const ManageUsers = () => {
    const { user } = useAuth();
    const axiosInstance = axiosSecure();
    const [searchName, setSearchName] = useState('');
    const [queryName, setQueryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const { data: usersData = {}, isLoading, refetch } = useQuery({
        queryKey: ['searchedUsers', queryName, currentPage],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/manage/${user?.email}/search?name=${queryName}&page=${currentPage}&limit=${limit}`);
            return res.data;
        },
        enabled: !!queryName,
    });
    const users = usersData?.users || [];
    const totalPages = usersData?.totalPages || 1;
    // handleMakeAdmin
    const handleMakeAdmin = async (userId) => {
        try {
            const res = await axiosInstance.put(`/users/admin/${userId}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire('Success!', 'User promoted to Admin!', 'success');
                refetch();
            }
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };
    const handleRemoveAdmin = async (userId) => {
        try {
            const res = await axiosInstance.put(`/users/removeAdmin/${userId}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire('Success!', 'Admin removed successfully!', 'success');
                refetch();
            }
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setQueryName(searchName.trim());
    };
    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
            <Helmet>
                <title>Manage Users</title>
            </Helmet>
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Manage Users</h2>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row max-w-md mx-auto gap-2">
                <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Search by name"
                    className="input input-bordered w-full bg-white text-gray-950"
                />
                <button type="submit" className="btn btn-primary flex items-center justify-center gap-2 px-4">
                    <FaSearch /> <span className="hidden sm:inline">Search</span>
                </button>
            </form>
            {/* Users Table */}
            <div className="overflow-x-auto">
                {isLoading ? (
                    <Loading />
                ) : users.length === 0 ? (
                    <div className="text-center text-gray-500 py-6">
                        <p className="text-lg font-medium mb-2">No users matched your search.</p>
                        <p className="text-sm italic">
                            💡 Tip: Try typing a <span className="font-semibold">name</span> or just a
                            <span className="font-bold text-indigo-600"> "." </span> to see all users.
                        </p>
                    </div>
                ) : (
                    <>
                        <table className="table table-zebra w-full text-center text-sm sm:text-base">
                            <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th className="hidden md:table-cell">Email</th>
                                    <th>Subscription</th>
                                    <th>Make Admin</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 dark:text-gray-100">
                                {users.map((user, i) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <td className='text-gray-500'>{(currentPage - 1) * limit + i + 1}</td>
                                        <td className="break-words text-gray-500">{user.name}</td>
                                        <td className="break-words hidden md:table-cell text-gray-500">{user.email}</td>
                                        <td>
                                            {user.role === "admin" ? (
                                                <span className="text-green-600 dark:text-green-400 font-semibold">
                                                    Admin
                                                </span>
                                            ) : user.role === "member" ? (
                                                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                                    Member
                                                </span>
                                            ) : (
                                                <span className="text-gray-700 dark:text-gray-300">User</span>
                                            )}
                                        </td>
                                        <td>
                                            {user.role === "admin" ? (
                                                <button
                                                    onClick={() => handleRemoveAdmin(user._id)}
                                                    className="btn btn-sm btn-warning flex items-center justify-center gap-2 dark:text-white"
                                                >
                                                    <FaUserTimes className="text-xs sm:text-base" />
                                                    <span className="hidden md:inline">Remove</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleMakeAdmin(user._id)}
                                                    className="btn btn-sm btn-success flex items-center justify-center gap-2 dark:text-white"
                                                >
                                                    <FaUserShield className="text-xs sm:text-base" />
                                                    <span className="hidden md:inline">Make</span>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Buttons */}
                        <Pagination pageCount={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}></Pagination>
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
