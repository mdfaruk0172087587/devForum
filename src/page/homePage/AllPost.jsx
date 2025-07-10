import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosUnSecure from '../../hooks/axiosUnSecure';
import Loading from '../../components/Loading';
import { Link } from 'react-router';

const AllPost = () => {
  const useAxios = axiosUnSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const limit = 5;

  const { data, isLoading } = useQuery({
    queryKey: ['allPost', currentPage, sortByPopularity],
    queryFn: async () => {
        const endpoint = sortByPopularity? '/devForum/popular' : '/devForum'
      const res = await useAxios.get(`${endpoint}?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading />;
  }
  
  const totalPages = data?.totalPages || 1;

  return (
    <div className=" p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Posts</h2>
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
        {data?.posts?.map(post => (
        <div key={post._id} className="border p-4 mb-4 rounded shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <img src={post.authorImage} alt="" className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-700">
            <p><strong>Tag:</strong> {post.tag}</p>
            <p><strong>Upvotes:</strong> {post.upVote} | <strong>Downvotes:</strong> {post.downVote}</p>
            <p><strong>Total Votes:</strong> {post.upVote - post.downVote}</p>
          </div>
        
           <div className='flex justify-end'>
             <Link to={`/postDetails/${post?._id}`} className='btn btn-primary '>View More</Link>
           </div>
         
        </div>
      ))}
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
            className={`px-4 py-2 rounded ${
              currentPage === n + 1
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
