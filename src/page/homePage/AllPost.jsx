import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosUnSecure from '../../hooks/axiosUnSecure';
import Loading from '../../components/Loading';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import BannerWithSearch from './BannerWithSearch/BannerWithSearch';
import TagSection from './tags/TagSection';
import DisplayAllPost from './displayAllPost/DisplayAllPost';
import { FaClipboardList } from 'react-icons/fa';
import { SiReact, SiJavascript, SiNodedotjs } from "react-icons/si";
import { motion } from "framer-motion";

const AllPost = () => {
  const { setTotalPosts } = useAuth();
  const useAxios = axiosUnSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTag, setSearchTag] = useState('');
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const limit = 5;

  const { data, isLoading } = useQuery({
    queryKey: ['allPost', currentPage, sortByPopularity, searchTag],
    queryFn: async () => {
      const tagQuery = searchTag ? `&tag=${searchTag}` : '';
      const endpoint = sortByPopularity ? '/devForum/popular' : '/devForum'
      const res = await useAxios.get(`${endpoint}?page=${currentPage}&limit=${limit}${tagQuery}`);
      return res.data;
    },
    keepPreviousData: true,
  });


  // totalPosts cha ck
  useEffect(() => {
    if (data?.totalPosts >= 0) {
      setTotalPosts(data.totalPosts)
    }
  }, [data, setTotalPosts])
  if (isLoading) {
    return <Loading />;
  }
  const totalPages = data?.totalPages || 1;
  console.log(data.posts)

  return (
    <div className="py-6">
      <BannerWithSearch setSearchTag={setSearchTag} setCurrentPage={setCurrentPage}></BannerWithSearch>
      <TagSection setCurrentPage={setCurrentPage} setSearchTag={setSearchTag}></TagSection>

      <h2 className="text-3xl font-extrabold text-center mb-2 flex items-center justify-center gap-2 text-gray-800">
        <FaClipboardList className="text-blue-500" /> All Posts
      </h2>
     <p className="text-center text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
  <motion.span
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 font-bold text-xl mb-2"
  >
    Welcome to DevForum 🚀
  </motion.span>

  Dive into expert discussions, real-world solutions, and helpful questions about today’s top web technologies.

  <div className="flex justify-center flex-wrap gap-2 mt-4">
    <span className="badge badge-outline flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700">
      <SiReact /> React
    </span>
    <span className="badge badge-outline flex items-center gap-1 px-3 py-2 bg-yellow-100 text-yellow-700">
      <SiJavascript /> JavaScript
    </span>
    <span className="badge badge-outline flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700">
      <SiNodedotjs /> Node.js
    </span>
    <span className="badge badge-outline flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-800">
      + More
    </span>
  </div>

  <span className="block mt-4 text-sm text-gray-600">
    Use the search bar or select a tag above to explore content you're most interested in. Let's learn and grow together 💡
  </span>
</p>

      <div className='flex  justify-center'>
        <button
          onClick={() => {
            setSortByPopularity(prev => !prev);
            setCurrentPage(1);
          }}
          className="btn btn-outline "
        >
          {sortByPopularity ? "Sort by Newest" : "Sort by Popularity"}
        </button>
      </div>
      {/* Posts */}
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-2'>
        {
          data?.posts?.map(post => <DisplayAllPost post={post} key={post._id}></DisplayAllPost>)
        }
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages).keys()].map(n => (
          <button
            key={n}
            onClick={() => setCurrentPage(n + 1)}
            className={`px-4 py-2 rounded ${currentPage === n + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-300'
              }`}
          >
            {n + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPost;
