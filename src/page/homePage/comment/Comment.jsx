import React, { useState } from 'react';
import axiosSecure from '../../../hooks/axiosSecure';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import CommentTr from './CommentTr';
import Loading from '../../../components/Loading';
import { FiChevronLeft, FiChevronRight, FiMessageCircle } from 'react-icons/fi';
import Pagination from '../Pagination';

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
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-indigo-700">
                <FiMessageCircle className="text-3xl" />
                All Comments for Post
            </h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th>#</th>
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Feedback</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commentData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-6">
                                    No comments found.
                                </td>
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
           <Pagination pageCount={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}></Pagination>
        </div>
    );
};

export default Comment;
