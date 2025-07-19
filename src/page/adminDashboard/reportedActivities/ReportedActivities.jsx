import React, { useState } from 'react';
import axiosSecure from '../../../hooks/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import ReportedReplay from './ReportedReplay';
import { MdNavigateBefore, MdNavigateNext, MdOutlineReportProblem } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';
import Pagination from '../../homePage/Pagination';

const ReportedActivities = () => {
  const axiosInstance = axiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data = {}, isLoading, refetch } = useQuery({
    queryKey: ['reportedActivities', currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get(`/commentsReplay?page=${currentPage}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true
  });
  const replays = data.replays || [];
  const totalPages = data.totalPages || 1;
  if (isLoading) {
    return <Loading />;
  }
  if (replays.length === 0) {
    return (
      <p className="text-center text-gray-600 py-10 text-lg">
        <MdOutlineReportProblem className="inline-block mr-2 text-xl text-red-500" />
        Hmmm, no reported activities found yet.
        <br />
        Looks like there’s nothing to review or report at the moment.
        <br />
        Keep contributing to the forum — any issues or reports will show up here!
      </p>

    );
  }
  return (
    <div className="lg:max-w-6xl lg:mx-auto p-6 bg-white shadow-md rounded-md border my-10">
      <Helmet>
        <title>Reported Activities</title>
      </Helmet>
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <MdOutlineReportProblem className="text-red-500 text-3xl" />
        Reported Activities
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Feedback</th>
              <th className="py-3 px-4">Reported Email</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {replays.map((replay, index) => (
              <ReportedReplay
                key={replay._id}
                index={(currentPage - 1) * limit + index + 1}
                replay={replay}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
     <Pagination  pageCount={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}></Pagination>
    </div>
  );
};

export default ReportedActivities;
