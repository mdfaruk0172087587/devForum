import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../hooks/axiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading';

const ManageUsers = () => {
    const axiosInstance = axiosSecure();
    const [searchName, setSearchName] = useState('');
    const [queryName, setQueryName] = useState('');

    // Fetch users based on search query
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['searchedUsers', queryName],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/search?name=${queryName}`);
            return res.data.users;
        },
        enabled: !!queryName, // won't run initially unless queryName is set
    });

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

    // handleRemoveAdmin
    const handleRemoveAdmin = async(userId) =>{
       try{
        const removeRes = await axiosInstance.put(`/users/removeAdmin/${userId}`);
        if(removeRes.data.modifiedCount > 0){
            Swal.fire('Success!', 'Admin to Remove!', 'success');
            refetch();
        }
       }
       catch(error) {
        Swal.fire('Error', error.message, 'error')
       }
    }



// handle search
    const handleSearch = (e) => {
        e.preventDefault();
        setQueryName(searchName.trim());
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
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
                    <Loading></Loading>
                ) : users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
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
                                    <td>{i + 1}</td>
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
                                            <button
                                                onClick={() => handleMakeAdmin(user._id)}

                                                className="btn btn-sm btn-warning"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
