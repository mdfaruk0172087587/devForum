import React from 'react';
import axiosSecure from '../../hooks/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import Loading from '../../components/Loading';
import { FaShareAlt, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import PostShareButton from './PostShareButton ';

const PostDetails = () => {
    const axiosInstance = axiosSecure();
    const { user } = useAuth();
    const { id } = useParams();
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
                    <input
                        type="text"
                        // value={commentText}
                        // onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="input input-bordered w-full"
                    // disabled={!user}
                    />
                    <button
                        // onClick={handleComment}
                        className="btn btn-primary"
                    // disabled={!user || !commentText.trim()}
                    >
                        Comment
                    </button>
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