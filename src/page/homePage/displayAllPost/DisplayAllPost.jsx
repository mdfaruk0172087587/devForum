import React from 'react';
import { Link } from 'react-router';
import Loading from '../../../components/Loading';
import { BiLike, BiDislike, BiCommentDetail } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';

const DisplayAllPost = ({ post }) => {

  const { _id, authorImage, title, createdAt, tag, upVote, downVote, commentCount } = post;
  return (
    <div className="card bg-base-100 border border-gray-200 shadow-md hover:shadow-xl rounded-lg transform hover:scale-[1.02] transition-all duration-300">
  <div className="card-body space-y-5">

    {/* Header */}
    <div className="flex items-start gap-4">
      <img
        src={authorImage}
        alt="Author"
        className="w-16 h-16 rounded-full border-2 border-primary shadow-sm"
      />
      <div className="flex-1">
        <h2 className="text-lg md:text-2xl font-bold line-clamp-3">{title}</h2>
        <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1 mt-1">
          <FaRegCalendarAlt className="text-gray-400" />{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>

    {/* Tag & Stats */}
    <div className="flex flex-wrap gap-3 text-sm md:text-base mt-2">
      <span className="badge badge-info badge-outline px-3 py-1">#{tag}</span>
      <span className="flex items-center gap-1 text-green-600 font-medium">
        <BiLike /> {upVote}
      </span>
      <span className="flex items-center gap-1 text-red-600 font-medium">
        <BiDislike /> {downVote}
      </span>
      <span className="flex items-center gap-1 text-gray-700 font-medium">
        <BiCommentDetail /> {commentCount} Comments
      </span>
    </div>

    {/* Total Votes */}
    <p className="text-sm md:text-base text-gray-600 mt-2">
      Total Votes: <span className="font-bold">{upVote - downVote}</span>
    </p>

    {/* Action / View Details */}
    <div className="card-actions justify-end mt-4">
      <Link
        to={`/postDetails/${_id}`}
        className="btn btn-md md:btn-lg btn-primary shadow-md rounded-full hover:scale-105 transition-transform duration-200"
      >
        View Details
      </Link>
    </div>

  </div>
</div>


  );
};

export default DisplayAllPost;
