import React, { useState } from 'react';
import Modal from './Modal';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import axiosSecure from '../../../hooks/axiosSecure';

const CommentTr = ({ comment, index , refetch}) => {
  const { user } = useAuth();
  const axiosInstance = axiosSecure();
  const [feedback, setFeedback] = useState('');
  const [reported, setReported] = useState(false);


  const handleReport = async () => {
    // comment replay post
    const replayPost = {
      postId: comment?.postId,
      commentId: comment?._id,
      reportedEmail: user?.email,
      feedback: feedback,
    };

    try {
      const postRes = await axiosInstance.post('/commentsReplay', replayPost);
      if (postRes.data.insertedId) {
        // update comments collection
    await axiosInstance.put(`/comments/${comment._id}`)
    refetch()
        Swal.fire({
          title: "Feedback submitted!",
          icon: "success",
          draggable: true
        });
      }
    }
    catch (err) {
      Swal.fire({
        title: "Failed to submit feedback!",
        icon: "error",
        text: err.message,
        draggable: true
      });
    }


    setReported(true);
  };

  return (
    <>
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

        <td>
          <select
            className="select select-sm select-bordered w-full max-w-xs"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={comment.status=== true}
          >
            <option value="" disabled>{comment.status === true ? 'Already Reported' : 'Select feedback'}</option>
            <option value="Off-topic or irrelevant">Off-topic or irrelevant</option>
            <option value="Spam or self-promotion">Spam or self-promotion</option>
            <option value="Abusive or inappropriate language">Abusive or inappropriate language</option>
          </select>
        </td>

        <td>
          <button
            className="btn btn-sm btn-warning"
            onClick={handleReport}
            disabled={!feedback || reported}
          >
            {reported ? 'Reported' : 'Report'}
          </button>
           <Modal text={comment.commentText}></Modal>
        </td>
      </tr>
     
    </>
  );
};

export default CommentTr;
