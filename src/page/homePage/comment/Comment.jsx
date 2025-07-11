import React from 'react';
import axiosSecure from '../../../hooks/axiosSecure';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import CommentTr from './CommentTr';

const Comment = () => {
    const axiosInstance = axiosSecure();
    const {postId} = useParams();
   
    const {data:commentData = []} = useQuery({
        queryKey: ['comments', postId],
        queryFn: async() => {
            const res = await axiosInstance.get(`/comments/${postId}`);
            return res.data.comments;
        }
    })

    
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
            ) 
            :
            (
              commentData.map((comment, index) => (
               <CommentTr key={comment._id} comment={comment} index={index}></CommentTr>
              ))
            )
            }
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default Comment;