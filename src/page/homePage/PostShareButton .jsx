import React from 'react';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { FaShareAlt } from 'react-icons/fa';

const PostShareButton = ({ id }) => {
  const shareUrl = `${window.location.origin}/postDetails/${id}`;
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn">
        <FaShareAlt className="mr-1" /> Share
      </div>
      <div className="dropdown-content z-[1] mt-2 p-2 shadow bg-base-100 rounded-box w-32">
        <FacebookShareButton url={shareUrl} className="w-full mb-2">
          <span className="btn btn-xs btn-outline w-full">Facebook</span>
        </FacebookShareButton>
        <WhatsappShareButton url={shareUrl} className="w-full">
          <span className="btn btn-xs btn-outline w-full">WhatsApp</span>
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default PostShareButton;
