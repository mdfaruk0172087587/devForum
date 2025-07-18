import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../hooks/axiosSecure';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import { FaRegCommentDots, FaTrashAlt } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white shadow-md rounded-lg overflow-hidden">
      <Helmet>
        <title>My Post</title>
      </Helmet>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        My Posts
      </h2>
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
            {myPosts.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="btn btn-sm btn-outline flex items-center gap-1"
        >
          <MdKeyboardArrowLeft /> Prev
        </button>
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => setCurrentPage(n + 1)}
            className={`btn btn-sm ${currentPage === n + 1 ? 'btn-primary' : 'btn-outline'
              }`}
          >
            {n + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-outline flex items-center gap-1"
        >
          Next <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default MyPosts;
