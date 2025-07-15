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
        const postData = {
            tag: data?.tag
        }
        const tagPost = await axiosInstance.post('/tags', postData)
        if (tagPost.data.insertedId) {
            Swal.fire({
                icon: 'success',
                title: 'Tag Added!',
                text: `Tag "${data.tag}" has been successfully added.`,
            });
            reset();
        }


    };

    if(loading || commentLoading || usersLoading){
        return <Loading></Loading>
    }


    return (
        <div className="max-w-5xl mx-auto p-6 space-y-10">
            {/* Profile Section */}
            <div className="bg-white shadow-md rounded-lg p-6 flex gap-6 items-center">
                <img
                    src={user?.photoURL}
                    alt="Admin"
                    className="w-24 h-24 rounded-full border-4 border-blue-500"
                />
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FaUser className="text-blue-500" /> {user?.displayName}
                    </h2>
                    <p className="flex items-center gap-2 text-gray-600 mt-1">
                        <FaEnvelope /> {user?.email}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4">
                        <span className="badge badge-primary">Posts: {totalPosts}</span>
                        <span className="badge badge-secondary">Comments: {commentCount}</span>
                        <span className="badge badge-accent">Users: {usersCount}</span>
                    </div>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Platform Overview</h3>
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
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FaTags /> Add New Tag
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center">
                    <input
                        {...register("tag", { required: true })}
                        type="text"
                        placeholder="Enter tag name (e.g., React)"
                        className="input input-bordered w-full max-w-xs"
                    />
                    <button type="submit" className="btn btn-primary">Add Tag</button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
