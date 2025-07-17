import React, { useState } from 'react';
import axiosSecure from '../../../hooks/axiosSecure';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import CommentTr from './CommentTr';
import Loading from '../../../components/Loading';


const Comment = () => {
   
    const axiosInstance = axiosSecure();
    const { postId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['comments', postId, currentPage],
        queryFn: async () => {
            const res = await axiosInstance.get(`/comments/${postId}?page=${currentPage}&limit=${limit}`);
            return res.data; // expects { comments, totalComments }
        },
        keepPreviousData: true,
    });

    const commentData = data?.comments || [];
    const totalComments = data?.totalComments || 0;
    const totalPages = Math.ceil(totalComments / limit);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">All Comments for Post</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Commenter Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commentData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-6">No comments found.</td>
                            </tr>
                        ) : (
                            commentData.map((comment, index) => (
                                <CommentTr
                                    key={comment._id}
                                    comment={comment}
                                    index={(currentPage - 1) * limit + index + 1}
                                    refetch={refetch}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2">
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
        </div>
    );
};

export default Comment;
