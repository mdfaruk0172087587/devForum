import React from 'react';
import axiosSecure from '../../hooks/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import Loading from '../../components/Loading';
import { FaShareAlt, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import PostShareButton from './PostShareButton ';
import { useForm } from 'react-hook-form';

const PostDetails = () => {
    const axiosInstance = axiosSecure();
    const { user } = useAuth();
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const { data: post = {}, isLoading, refetch } = useQuery({
        queryKey: ['postDetails', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/devForum/${id}`);
            return res.data.post;
        }
    })

    if (isLoading) {
        return <Loading />
    }

    const handleUpVote = async (id) => {
        try {
            const res = await axiosInstance.patch(`/devForum/upvote/${id}`);
            if (res.data.success) {
                refetch();
            }
        } catch (err) {
            Swal.fire({
                title: err.message,
                icon: "error",
                draggable: true
            });
        }
    }

    const handleDownVote = async (id) => {
        try {
            const downRes = await axiosInstance.patch(`/devForum/downvote/${id}`);
            if (downRes.data.success) {
                refetch();
            }
        } catch (err) {
            Swal.fire({
                title: err.message,
                icon: "error",
                draggable: true
            });
        }
    }

    const onSubmit = async (data) => {
        const commentPost = {
            commenterEmail: user?.email,
            commentText: data.text,
            postId: id
        }
        const commentRes = await axiosInstance.post('/comments', commentPost);
        if (commentRes.data.success) {
            Swal.fire({
                title: "Your Comment has been saved",
                icon: "success",
                draggable: true
            });
            reset();
        }
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg my-8">
            <div className="flex items-center gap-4 mb-6">
                <img src={post?.authorImage} alt="Author" className="w-14 h-14 rounded-full border border-gray-200 shadow-sm" />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{post?.authorName}</h3>
                    <p className="text-sm text-gray-500">{new Date(post?.createdAt).toLocaleString()}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">{post?.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{post?.description}</p>
            <p className="text-sm text-gray-600 mb-6"><strong>Tag:</strong> <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{post?.tag}</span></p>

            {user && (
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => handleUpVote(id)}
                        className="flex items-center gap-1 text-sm text-gray-700 hover:text-green-600 transition">
                        <FaThumbsUp className="text-lg" /> {post?.upVote}
                    </button>
                    <button
                        onClick={() => handleDownVote(id)}
                        className="flex items-center gap-1 text-sm text-gray-700 hover:text-red-600 transition">
                        <FaThumbsDown className="text-lg" /> {post?.downVote}
                    </button>
                    <PostShareButton postId={id} />
                </div>
            )}

            {user && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Leave a Comment</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col sm:flex-row gap-3 items-start sm:items-center'>
                        <input
                            type="text"
                            {...register('text', { required: true })}
                            placeholder="Write a comment..."
                            className="input input-bordered w-full sm:flex-1"
                        />
                        <button type='submit' className="btn btn-primary">Comment</button>
                    </form>
                </div>
            )}

            {!user && (
                <p className="text-sm text-red-500 mt-4">You must be logged in to comment or vote.</p>
            )}
        </div>
    );
};

export default PostDetails;
