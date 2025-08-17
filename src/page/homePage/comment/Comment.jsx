import React, { useState } from 'react';
import axiosSecure from '../../../hooks/axiosSecure';
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import CommentTr from './CommentTr';
import Loading from '../../../components/Loading';
import { FiMessageCircle } from 'react-icons/fi';
import Pagination from '../Pagination';
import { FaRegCommentDots } from 'react-icons/fa';

const Comment = () => {
    const axiosInstance = axiosSecure();
    const { postId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['comments', postId, currentPage],
        queryFn: async () => {
            const res = await axiosInstance.get(`/comments/${postId}?page=${currentPage}&limit=${limit}`);
            return res.data;
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
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-indigo-700 justify-center">
                <FiMessageCircle className="text-3xl" />
                All Comments for Post
            </h2>

            {commentData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl shadow-inner">
                    <FaRegCommentDots className="text-6xl text-indigo-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">No comments yet!</p>
                    <p className="text-sm text-gray-500 mb-4">
                        Be the first to interact with your post and engage with the community.
                    </p>
                    <Link
                        to="/dashboard/myPosts"
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                    >
                        Go to My Posts
                    </Link>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="">
                                <tr className="bg-gray-100 text-gray-700 text-left">
                                    <th  className="whitespace-nowrap">#</th>
                                    <th  className="whitespace-nowrap">Email</th>
                                    <th  className="whitespace-nowrap">Comment</th>
                                    <th  className="whitespace-nowrap">Feedback</th>
                                    <th  className="whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commentData.map((comment, index) => (
                                    <CommentTr
                                        key={comment._id}
                                        comment={comment}
                                        index={(currentPage - 1) * limit + index + 1}
                                        refetch={refetch}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <Pagination
                        pageCount={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default Comment;
