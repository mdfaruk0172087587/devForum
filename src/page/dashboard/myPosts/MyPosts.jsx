import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../hooks/axiosSecure';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import { FaRegCommentDots, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import Pagination from '../../homePage/Pagination';

const MyPosts = () => {
  const axiosInstance = axiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['myPosts', user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/devForum/myPosts/${user?.email}?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const myPosts = data?.posts || [];
  const totalPosts = data?.totalPosts || 0;
  const totalPages = Math.ceil(totalPosts / limit);

  if (isLoading) return <Loading />;

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#DC2626',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.delete(`/devForum/${user?.email}/${id}`);
          if (res.data.deletedId) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your post has been deleted.',
              icon: 'success',
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: error.message,
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
      <Helmet>
        <title>My Posts</title>
      </Helmet>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
        My Posts
      </h2>

      {myPosts.length === 0 ? (
        // 👇 fallback UI when no posts found
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
            alt="No posts"
            className="w-40 h-40 mb-6 opacity-80"
          />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            You haven’t created any posts yet!
          </h3>
          <p className="text-gray-500 mb-6">
            Start sharing your thoughts with the community by creating your first post.
          </p>
          <Link
            to="/dashboard/addpost"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            <FaPlusCircle /> Create New Post
          </Link>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="whitespace-nowrap">#</th>
                  <th className="whitespace-nowrap">Post Title</th>
                  <th className="whitespace-nowrap">Votes</th>
                  <th className="whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myPosts.map((post, index) => (
                  <tr key={post._id} className="hover:bg-gray-50 transition">
                    <td className="font-medium">
                      {(currentPage - 1) * limit + index + 1}
                    </td>
                    <td className="max-w-[200px] truncate">{post.title}</td>
                    <td>{post.upVote + post.downVote}</td>
                    <td>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <Link
                          to={`/dashboard/comments/${post._id}`}
                          className="flex items-center justify-center gap-1 px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700 transition text-xs"
                        >
                          <FaRegCommentDots /> Comment
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="flex items-center justify-center gap-1 px-3 py-1 rounded text-white bg-red-600 hover:bg-red-700 transition text-xs"
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
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

export default MyPosts;
