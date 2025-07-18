import React from 'react';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { FaShareAlt } from 'react-icons/fa';

const PostShareButton = ({ postId }) => {
  const shareUrl = `${window.location.origin}/post/${postId}`;
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn">
        <FaShareAlt className="mr-1" />
        Share
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-32 space-y-1"
      >
        <div className="mt-2 flex gap-2 z-10">
          <FacebookShareButton url={shareUrl}>
            <span className="btn btn-xs btn-outline">Facebook</span>
          </FacebookShareButton>
          <WhatsappShareButton url={shareUrl}>
            <span className="btn btn-xs btn-outline">WhatsApp</span>
          </WhatsappShareButton>
        </div>
      </ul>
    </div>
  );
};

export default PostShareButton;
