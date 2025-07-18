import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../hooks/axiosSecure';
import Loading from '../../../components/Loading';
import { FaTag } from 'react-icons/fa'; 

const MyProfilePost = () => {
  const { user } = useAuth();
  const axiosInstance = axiosSecure();
  const { data: profilePost = [], isLoading } = useQuery({
    queryKey: ['userPost', user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/devForum/myProfile/${user?.email}`);
      return res.data.posts;
    }
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-indigo-700 border-b pb-2">Recent Posts</h3>
      {profilePost.length === 0 ? (
        <p className="text-gray-500 italic">You haven’t posted anything yet.</p>
      ) : (
        <ul className="space-y-4">
          {profilePost.map((post) => (
            <li
              key={post._id}
              className="p-5 border rounded-xl shadow hover:shadow-md transition duration-300 bg-gray-50"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-1">{post.title}</h4>
              <p className="text-gray-700 mb-2">{post.description.slice(0, 100)}...</p>
              <div className="text-sm text-indigo-600 flex items-center gap-2">
                <FaTag /> {post.tag}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProfilePost;
