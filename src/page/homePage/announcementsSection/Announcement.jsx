import React from 'react';
import { FaBullhorn, FaClock } from 'react-icons/fa';

const Announcement = ({ announcement }) => {
  const { authorImage, authorName, title, description, createdAt } = announcement;

  // Format Date
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-4 border-l-4 border-blue-600 hover:shadow-xl transition-all ">
      <div className="flex items-center gap-3 mb-4">
        <FaBullhorn className="text-blue-600 text-2xl" />
        <h2 className="text-xl font-bold text-blue-700">{title}</h2>
      </div>

      <p className="text-gray-700 mb-4">{description}</p>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <img src={authorImage} alt="Author" className="w-8 h-8 rounded-full border" />
          <span>{authorName}</span>
        </div>

        <div className="flex items-center gap-1">
          <FaClock />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
