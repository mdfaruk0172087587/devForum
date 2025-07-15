import React from 'react';
import axiosSecure from '../../../hooks/axiosSecure';

const ReportedReplay = ({ replay, index, refetch }) => {
    const { reportedEmail, feedback, commentId, _id } = replay;
    const axiosInstance = axiosSecure();

    //   handle delete
    const handleDelete = async (id, replayDeleteId) => {

        try {
            const res = await axiosInstance.delete(`/comments/${id}`);
            if (res.data.success) {
                // replay collection theke delete
                const replayRes = await axiosInstance.delete(`/commentsReplay/${replayDeleteId}`);
                if (replayRes.data.success) {
                    refetch()
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{feedback}</td>
            <td>{reportedEmail}</td>
            <td>
                <button onClick={() => handleDelete(commentId, _id)} className="btn btn-xs btn-error">Delete Comment</button>
            </td>
        </tr>
    );
};

export default ReportedReplay;
