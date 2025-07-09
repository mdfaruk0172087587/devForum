import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../hooks/axiosSecure';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';

const MyPosts = () => {
    const axiosInstance = axiosSecure();
    const { user } = useAuth();
    const { data: myPosts = [], isLoading , refetch} = useQuery({
        queryKey: ['myPosts', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/devForum/myPosts/${user?.email}`);
            return res.data.posts;
        }
    })


    if (isLoading) {
        return <Loading></Loading>
    }

    // handle delete
    const handleDelete = (id) => {
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // delete
                try {
                    const res = await axiosInstance.delete(`/devForum/${id}`);
                   if(res.data.deletedId){
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                refetch();
                   }
                }
                catch (error) {
                    Swal.fire({
                        title: error.message,
                        icon: "error",
                        draggable: true
                    });
                }
                
            }
        });
    }
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">My Posts</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Post Title</th>
                            <th>Votes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {myPosts.map((post, index) => (
                            <tr key={post._id}>
                                <td>{index + 1}</td>
                                <td className="font-medium">{post.title}</td>
                                <td>{post.upVote + post.downVote}</td>
                                <td className="flex gap-2">
                                    <button
                                        // onClick={() => handleComment(post._id)}

                                        className="btn btn-sm btn-info"
                                    >
                                        Comment
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {myPosts.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500 py-6">
                                    No posts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPosts;