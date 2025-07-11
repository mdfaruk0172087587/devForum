import React, { useState } from 'react';
import Modal from './Modal';

const CommentTr = ({ comment, index }) => {
  const [feedback, setFeedback] = useState('');
  const [reported, setReported] = useState(false);

  const handleReport = () => {
    // এখানে তুমি চাইলে API call করে report পাঠাতে পারো
    console.log('Reported:', {
      commentId: comment._id,
      feedback
    });

    setReported(true); // Report বাটন আবার disabled করে দেওয়া
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{comment.commenterEmail}</td>
      <td>
        {comment.commentText.length > 20 ? (
          <>
            {comment.commentText.slice(0, 20)}...
            <button
              onClick={() => document.getElementById('comment_modal').showModal()}
              className="text-blue-500 underline ml-1"
            >
              Read More
            </button>
          </>
        ) : (
          comment.commentText
        )}
      </td>

      {/* Feedback Dropdown */}
      <td>
        <select
          className="select select-sm select-bordered w-full max-w-xs"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={reported}
        >
          <option value="" disabled>Select feedback</option>
          <option value="Off-topic or irrelevant">Off-topic or irrelevant</option>
          <option value="Spam or self-promotion">Spam or self-promotion</option>
          <option value="Abusive or inappropriate language">Abusive or inappropriate language</option>
        </select>
      </td>

      {/* Report Button */}
      <td>
        <button
          className="btn btn-sm btn-warning"
          onClick={handleReport}
          disabled={!feedback || reported}
        >
          {reported ? 'Reported' : 'Report'}
        </button>
      </td>

      {/* Modal */}
      <Modal text={comment.commentText}></Modal>
    </tr>
  );
};

export default CommentTr;
