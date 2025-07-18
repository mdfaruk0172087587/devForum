import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router';
import axiosUnSecure from '../../../hooks/axiosUnSecure';
import Loading from '../../../components/Loading';
import { BiLike, BiDislike, BiCommentDetail } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';

const DisplayAllPost = ({ post }) => {
  const { _id, authorImage, title, createdAt, tag, upVote, downVote } = post;
  const axiosUse = axiosUnSecure();
  const { data: commentCount = 0, isLoading } = useQuery({
    queryKey: ['commentsCount'],
    queryFn: async () => {
      const res = await axiosUse.get(`/comments/${_id}`);
      return res.data.count;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="card-body space-y-3">
        {/* Header */}
        <div className="flex items-center gap-4">
          <img src={authorImage} alt="Author" className="w-12 h-12 rounded-full border" />
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FaRegCalendarAlt className="text-gray-400" />{" "}
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {/* Tag & Stats */}
        <div className="text-sm flex flex-wrap gap-4">
          <p className="badge badge-info badge-outline px-3 py-1">#{tag}</p>
          <p className="flex items-center gap-1 text-green-600 font-medium">
            <BiLike /> {upVote}
          </p>
          <p className="flex items-center gap-1 text-red-600 font-medium">
            <BiDislike /> {downVote}
          </p>
          <p className="flex items-center gap-1 text-gray-700 font-medium">
            <BiCommentDetail /> {commentCount} Comments
          </p>
          <p className="text-sm text-gray-500">
            Total Votes: <span className="font-bold">{upVote - downVote}</span>
          </p>
        </div>
        {/* Action */}
        <div className="card-actions justify-end">
          <Link to={`/postDetails/${_id}`} className="btn btn-sm btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisplayAllPost;
