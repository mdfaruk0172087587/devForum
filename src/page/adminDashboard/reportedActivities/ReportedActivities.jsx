import React, { useState } from 'react';
import axiosSecure from '../../../hooks/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import ReportedReplay from './ReportedReplay';

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
console.log(data)
  const replays = data.replays || [];
  const totalPages = data.totalPages || 1;

  if (isLoading) {
    return <Loading />;
  }

  if (replays.length === 0) {
    return <p className="text-center text-gray-500 py-10">No reported activities found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Reported Activities</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Feedback</th>
              <th>Reported Email</th>
              <th>Actions</th>
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
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="btn btn-sm"
        >
          Previous
        </button>

        {[...Array(totalPages).keys()].map(n => (
          <button
            key={n}
            onClick={() => setCurrentPage(n + 1)}
            className={`btn btn-sm ${currentPage === n + 1 ? 'btn-primary' : 'btn-outline'}`}
          >
            {n + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReportedActivities;
