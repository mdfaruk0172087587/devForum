/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosUnSecure from '../../hooks/axiosUnSecure';
import Loading from '../../components/Loading';
import BannerWithSearch from './BannerWithSearch/BannerWithSearch';
import TagSection from './tags/TagSection';
import DisplayAllPost from './displayAllPost/DisplayAllPost';
import Pagination from './Pagination';

const AllPost = () => {
  const useAxios = axiosUnSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTag, setSearchTag] = useState('');
  const [activeTag, setActiveTag] = React.useState('');
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const limit = 8;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['allPost', currentPage, sortByPopularity, searchTag],
    queryFn: async () => {
      const tagQuery = searchTag ? `&tag=${searchTag}` : '';
      const sortType = sortByPopularity ? "popularity" : "latest";
      const res = await useAxios.get(
        `/devForum/popular?page=${currentPage}&limit=${limit}&sort=${sortType}${tagQuery}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  const totalPages = data?.totalPages || 1;

  return (
    <div className="py-6">
      {/* Search & Tag Sections */}
      <BannerWithSearch setSearchTag={setSearchTag} setCurrentPage={setCurrentPage} />
      <TagSection
        setCurrentPage={setCurrentPage}
        setSearchTag={setSearchTag}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />

      {/* Sort Dropdown */}
      <div className="flex justify-center mb-4">
        <div className="dropdown dark:bg-white">
          <label tabIndex={0} className="btn btn-outline m-1 text-gray-500">
            Sort by
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button
                onClick={() => {
                  setSortByPopularity(true);
                  setCurrentPage(1);
                }}
              >
                Popularity
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSortByPopularity(false);
                  setCurrentPage(1);
                }}
              >
                Newest
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Posts */}
      {isFetching ? (
        <div className="flex justify-center my-10">
          <Loading />
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
          {data?.posts?.map((post) => (
            <DisplayAllPost post={post} key={post._id} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        pageCount={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllPost;
