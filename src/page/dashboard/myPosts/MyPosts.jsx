import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../hooks/axiosSecure';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyPosts = () => {
    const axiosInstance = axiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const { user } = useAuth();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['myPosts', user?.email, currentPage],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/devForum/myPosts/${user?.email}?page=${currentPage}&limit=${limit}`
            );
            return res.data; // must return { posts, totalPosts }
        },
        keepPreviousData: true,
    });

    const myPosts = data?.posts || [];
    const totalPosts = data?.totalPosts || 0;
    const totalPages = Math.ceil(totalPosts / limit);

    if (isLoading) {
        return <Loading />;
    }

    // handle delete
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosInstance.delete(`/devForum/${user?.email}/${id}`);
                    if (res.data.deletedId) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                        });
                        refetch();
                    }
                } catch (error) {
                    Swal.fire({
                        title: error.message,
                        icon: 'error',
                        draggable: true,
                    });
                }
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">My Posts</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Post Title</th>
                            <th>Votes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myPosts.map((post, index) => (
                            <tr key={post._id}>
                                <td>{(currentPage - 1) * limit + index + 1}</td>
                                <td className="font-medium">{post.title}</td>
                                <td>{post.upVote + post.downVote}</td>
                                <td className="flex gap-2">
                                    <Link
                                        to={`/dashboard/comments/${post._id}`}
                                        className="btn btn-sm btn-info"
                                    >
                                        Comment
                                    </Link>
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

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-sm"
                >
                    Previous
                </button>

                {[...Array(totalPages).keys()].map((n) => (
                    <button
                        key={n}
                        onClick={() => setCurrentPage(n + 1)}
                        className={`btn btn-sm ${currentPage === n + 1 ? 'btn-primary' : 'btn-outline'
                            }`}
                    >
                        {n + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyPosts;
