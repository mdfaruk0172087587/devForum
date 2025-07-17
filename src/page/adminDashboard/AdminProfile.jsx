import React from 'react';
import { FaUser, FaEnvelope, FaTags } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../hooks/axiosSecure';
import Loading from '../../components/Loading';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const AdminProfile = () => {
    const { user, totalPosts, loading } = useAuth();
    const axiosInstance = axiosSecure();

    const { register, handleSubmit, reset } = useForm();

    const { data: commentCount = 0 , isLoading:commentLoading} = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const commentRes = await axiosInstance.get('/comments');
            return commentRes.data.count;
        }
    });
    const { data: usersCount = 0 , isLoading:usersLoading} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const usersRes = await axiosInstance.get('/users');
            return usersRes.data.count;
        }
    })

    // Pie chart data
    const chartData = [
        { name: 'Posts', value: totalPosts },
        { name: 'Comments', value: commentCount },
        { name: 'Users', value: usersCount },
    ];

    // form submit
    const onSubmit = async (data) => {
        const postData = { tag: data?.tag }
        try{
             const tagPost = await axiosInstance.post('/tags', postData);
              if (tagPost.data.insertedId) {
            Swal.fire({
                icon: 'success',
                title: 'Tag Added!',
                text: `Tag "${data.tag}" has been successfully added.`,
                timer: 2000,
                showConfirmButton: false
            });
            reset();
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops!',
                text: 'Something went wrong. Tag was not added.',
            });
        }
        }
        catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error.response?.data?.message || error.message || 'An unexpected error occurred.',
        });
    }
    };

    if (loading || commentLoading || usersLoading) {
        return <Loading />;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-12">

            {/* Profile Section */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
                <img
                    src={user?.photoURL}
                    alt="Admin"
                    className="w-24 h-24 rounded-full border-4 border-blue-500"
                />
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-3 mb-1">
                        <FaUser className="text-blue-500" /> {user?.displayName}
                    </h2>
                    <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-3">
                        <FaEnvelope /> {user?.email}
                    </p>
                    <div className="mt-4 flex justify-center md:justify-start flex-wrap gap-4">
                        <span className="badge badge-primary px-4 py-2 text-lg">Posts: {totalPosts}</span>
                        <span className="badge badge-secondary px-4 py-2 text-lg">Comments: {commentCount}</span>
                        <span className="badge badge-accent px-4 py-2 text-lg">Users: {usersCount}</span>
                    </div>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-center">Platform Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Add Tag Form */}
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
                    <FaTags /> Add New Tag
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center justify-center">
                    <input
                        {...register("tag", { required: true })}
                        type="text"
                        placeholder="Enter tag name (e.g., React)"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <button type="submit" className="btn btn-primary px-6">
                        Add Tag
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
