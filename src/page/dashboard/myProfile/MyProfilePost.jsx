import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../hooks/axiosSecure';
import Loading from '../../../components/Loading';

const MyProfilePost = () => {
    const { user } = useAuth();
    const axiosInstance = axiosSecure();
    const { data: profilePost = [], isLoading } = useQuery({
        queryKey: ['userPost', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/devForum/${user?.email}`);
            return res.data.posts
        }
    })
   if(isLoading){
    return <Loading></Loading>
   }
    return (
        <div>
        <h3 className="text-xl font-semibold mb-2">Recent Posts</h3>
        {profilePost.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <ul className="space-y-3">
            {profilePost.map((post) => (
              <li key={post._id} className="p-3 border rounded">
                <h4 className="text-lg font-bold">{post.title}</h4>
                <p className="text-gray-700">{post.description.slice(0, 100)}...</p>
                <p className="text-sm text-gray-500">Tag: {post.tag}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
};

export default MyProfilePost;