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
        return <Loading></Loading>
    }

    // handle upVote
    const handleUpVote = async (id) => {
        try {
            const res = await axiosInstance.patch(`/devForum/upvote/${id}`);
            if (res.data.success) {
                refetch();
            }
        }
        catch (err) {
            Swal.fire({
                title: err,
                icon: "error",
                draggable: true
            });
        }
    }
    // handle downVote
    const handleDownVote = async (id) => {
        try {
            const downRes = await axiosInstance.patch(`/devForum/downvote/${id}`);
            if (downRes.data.success) {
                refetch();
            }
        }
        catch (err) {
            Swal.fire({
                title: err,
                icon: "error",
                draggable: true
            });
        }
    }

    // form submit 
    const onSubmit = async (data) => {
        const commentPost = {
            commenterEmail: user?.email,
            commentText: data.text,
            postId: id
        }
        //    post
        const commentRes = await axiosInstance.post('/comments', commentPost);
        if (commentRes.data.success) {
            Swal.fire({
                title: "Your Comment Save",
                icon: "success",
                draggable: true
            });
                reset();
        }
    }
    return (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded my-8">
            <div className="flex items-center gap-4 mb-4">
                <img src={post?.authorImage} alt="Author" className="w-14 h-14 rounded-full" />
                <div>
                    <h3 className="text-lg font-semibold">{post?.authorName}</h3>
                    <p className="text-sm text-gray-500">{new Date(post?.createdAt).toLocaleString()}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">{post?.title}</h2>
            <p className="text-gray-700 mb-2">{post?.description}</p>
            <p className="text-sm mb-4"><strong>Tag:</strong> {post?.tag}</p>

            {
                user &&
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => handleUpVote(id)}
                        className="btn btn-outline btn-sm flex items-center gap-1">
                        <FaThumbsUp /> {post?.upVote}
                    </button>
                    <button
                        onClick={() => handleDownVote(id)}
                        className="btn btn-outline btn-sm flex items-center gap-1">
                        <FaThumbsDown /> {post?.downVote}
                    </button>
                    <PostShareButton postId={id}></PostShareButton>
                </div>
            }

            {/* Comment Section */}
            {
                user &&

                <div>
                    <h3 className="text-lg font-semibold mb-2">Comments</h3>
                    <div className="flex gap-2">
                        <form onSubmit={handleSubmit(onSubmit)} className='flex w-full gap-2 items-center'>
                            <input type="text" {...register('text', {required: true})} placeholder="Write comment..." className="textarea input-bordered w-full" />
                            <button type='submit' className="btn btn-primary" >  Comment </button>
                        </form>
                    </div>

                    {!user && (
                        <p className="text-sm text-red-500 mt-2">You must be logged in to comment or vote.</p>
                    )}
                </div>
            }

        </div>
    );
};

export default PostDetails;