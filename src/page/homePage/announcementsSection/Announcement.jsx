import React from 'react';
import { FaBullhorn, FaClock } from 'react-icons/fa';

const Announcement = ({ announcement }) => {
  const { authorImage, authorName, title, description, createdAt } = announcement;
  // Format Date
  const formattedDate = new Date(createdAt).toLocaleString();
  return (
    <div className="bg-white shadow-sm hover:shadow-lg border-l-4 border-blue-600 rounded-xl p-5 transition duration-200 ease-in-out ">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <FaBullhorn className="text-blue-600 text-xl" />
        <h2 className="text-lg font-semibold text-blue-700">{title}</h2>
      </div>
      {/* Description */}
      <p className="text-gray-700 text-sm mb-5 leading-relaxed">{description}</p>
      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <img
            src={authorImage || 'https://i.ibb.co/4pDNDk1/avatar.png'}
            alt="Author"
            className="w-8 h-8 rounded-full object-cover border"
          />
          <span className="font-medium">{authorName}</span>
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
