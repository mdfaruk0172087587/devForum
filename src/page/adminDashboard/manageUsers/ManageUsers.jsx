import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../hooks/axiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading';
import useAuth from '../../../hooks/useAuth';

const ManageUsers = () => {
    const {user} = useAuth();
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
        setCurrentPage(1); // Reset to first page
        setQueryName(searchName.trim());
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Search by name"
                    className="input input-bordered w-full"
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {/* Users Table */}
            <div className="overflow-x-auto">
                {isLoading ? (
                    <Loading />
                ) : users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <>
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Subscription</th>
                                    <th>Make Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => (
                                    <tr key={user._id}>
                                        <td>{(currentPage - 1) * limit + i + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === 'admin'
                                                ? 'Admin'
                                                : user.role === 'member'
                                                    ? 'Member'
                                                    : 'User'}
                                        </td>
                                        <td>
                                            {user.role === 'admin' ? (
                                                <button onClick={() => handleRemoveAdmin(user._id)} className="btn btn-sm btn-warning">Remove Admin</button>
                                            ) : (
                                                <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-sm btn-warning">Make Admin</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Buttons */}
                        <div className="flex justify-center mt-4 gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="btn btn-sm"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages).keys()].map(n => (
                                <button
                                    key={n}
                                    onClick={() => setCurrentPage(n + 1)}
                                    className={`btn btn-sm ${currentPage === n + 1 ? 'btn-primary' : 'btn-outline'}`}
                                >
                                    {n + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="btn btn-sm"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
