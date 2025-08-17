import React from 'react';
import axiosUnSecure from '../hooks/axiosUnSecure';
import { useQuery } from '@tanstack/react-query';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const LastPost = () => {
  const axiosUse = axiosUnSecure();
  const { data: posts = [0] } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: async () => {
      const res = await axiosUse.get('/devForum/home/last');
      return res.data.data;
    },
  });
  return (
    <div className="">
      <h2 className="text-3xl font-bold text-center text-gray-600">Latest Posts</h2>
      <p className="text-center text-gray-600 mb-8 mt-2">
        Check out the most recent discussions and updates from our community. Stay informed and engaged with the latest posts.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
          >
            {/* Author info */}
            <div className="flex items-center mb-4">
              <img
                src={post.authorImage}
                alt={post.authorName}
                className="w-10 h-10 rounded-full mr-3 border-2 border-blue-500"
              />
              <div>
                <h3 className="font-semibold text-gray-600">{post.authorName}</h3>
                <p className="text-sm text-gray-500">{post.createdAt}</p>
              </div>
            </div>

            {/* Post Title */}
            <h4 className="font-bold text-xl mb-2 text-gray-600">{post.title}</h4>

            {/* Description */}
            <p className="text-gray-600 mb-3">{post.description}</p>

            {/* Tag */}
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">
              {post.tag}
            </span>

            {/* Upvote / Downvote */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <FaArrowUp /> {post.upVote}
              </div>
              <div className="flex items-center gap-1 text-red-600 font-semibold">
                <FaArrowDown /> {post.downVote}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastPost;