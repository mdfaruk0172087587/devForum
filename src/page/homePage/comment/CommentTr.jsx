import React, { useState } from 'react';
import Modal from './Modal';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import axiosSecure from '../../../hooks/axiosSecure';
import { FiAlertTriangle, FiCheckCircle, FiEye } from 'react-icons/fi';

const CommentTr = ({ comment, index, refetch }) => {
  const { user } = useAuth();
  const axiosInstance = axiosSecure();
  const [feedback, setFeedback] = useState('');
  const [reported, setReported] = useState(false);
  const handleReport = async () => {
    const replayPost = {
      postId: comment?.postId,
      commentId: comment?._id,
      reportedEmail: user?.email,
      feedback: feedback,
    };
    try {
      const postRes = await axiosInstance.post('/commentsReplay', replayPost);
      if (postRes.data.insertedId) {
        await axiosInstance.put(`/comments/${user?.email}/${comment._id}`);
        refetch();
        Swal.fire({
          title: "Feedback submitted!",
          icon: "success",
          draggable: true,
          timer: 1500,
          showConfirmButton: false,
        });
        setReported(true);
      }
    } catch (err) {
      Swal.fire({
        title: "Failed to submit feedback!",
        icon: "error",
        text: err.message,
        draggable: true,
      });
    }
  };
  return (
    <>
      <tr className="hover:bg-gray-100 transition-colors duration-200">
        <td className="text-center font-semibold text-gray-700 dark:text-gray-300">{index}</td>
        <td className="font-mono text-sm text-gray-700 dark:text-gray-300">{comment.commenterEmail}</td>
        <td className='font-mono text-sm text-gray-700 dark:text-gray-300'>
          {comment.commentText.length > 20 ? (
            <>
              {comment.commentText.slice(0, 20)}...
              <button
                onClick={() => document.getElementById('comment_modal').showModal()}
                className="text-indigo-600 underline ml-2 flex items-center gap-1 hover:text-indigo-800 "
                aria-label="Read full comment"
              >
                <FiEye /> Read More
              </button>
            </>
          ) : (
            comment.commentText
          )}
        </td>
        <td>
          <select
            className="select select-sm select-bordered w-full max-w-xs bg-white text-gray-900"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={comment.status === true || reported}
            aria-label="Select feedback type"
          >
            <option value="" disabled>
              {comment.status === true || reported ? 'Already Reported' : 'Select feedback'}
            </option>
            <option value="Off-topic or irrelevant">Off-topic or irrelevant</option>
            <option value="Spam or self-promotion">Spam or self-promotion</option>
            <option value="Abusive or inappropriate language">Abusive or inappropriate language</option>
          </select>
        </td>
        <td className="flex items-center gap-2 ">
          <button
            className={`btn btn-sm flex items-center gap-1 text-gray-700 dark:text-gray-300 ${reported ? 'btn-success cursor-default' : 'btn-warning hover:btn-error '
              }`}
            onClick={handleReport}
            disabled={!feedback || reported || comment.status === true}
            aria-label={reported ? 'Reported' : 'Report comment'}
          >
            {reported ? <><FiCheckCircle /> Reported</> : <><FiAlertTriangle /> Report</>}
          </button>
          <Modal text={comment.commentText} />
        </td>
      </tr>
    </>
  );
};

export default CommentTr;
