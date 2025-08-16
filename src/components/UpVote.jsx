import React from 'react';
import axiosUnSecure from '../hooks/axiosUnSecure';
import { useQuery } from '@tanstack/react-query';

const UpVote = () => {
    const axiosUse = axiosUnSecure();
    const { data:UpData=[0]} = useQuery({
        queryKey: ['featuredPosts'],
        queryFn: async () => {
            const res = await axiosUse.get('/devForum/home/featured');
            return res.data.data;
        },
    });
    return (
       <div className="pb-12">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Posts</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        এখানে আমরা কমিউনিটিতে সবচেয়ে বেশি upvote পাওয়া অথবা pinned পোস্টগুলো highlight করেছি।
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {UpData.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
          >
            <img src={post.authorImage} alt={post.authorName} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-2">by {post.authorName}</p>
              <p className="text-sm text-gray-700 font-medium">👍 {post.upVote} upvotes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default UpVote;