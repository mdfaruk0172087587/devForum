import React from 'react';
import axiosSecure from '../../../hooks/axiosSecure';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa'; // ✅ React Icon import

const ReportedReplay = ({ replay, index, refetch }) => {
    const { reportedEmail, feedback, commentId, _id } = replay;
    const axiosInstance = axiosSecure();

    const handleDelete = (id, replayDeleteId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosInstance.delete(`/comments/${id}`);
                    if (res.data.success) {
                        const replayRes = await axiosInstance.delete(`/commentsReplay/${replayDeleteId}`);
                        if (replayRes.data.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Comment has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: error.message,
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <tr>
            <td>{index }</td>
            <td>{feedback}</td>
            <td>{reportedEmail}</td>
            <td>
                <button
                    onClick={() => handleDelete(commentId, _id)}
                    className="btn btn-xs btn-error flex items-center gap-2 tooltip tooltip-top"
                    data-tip="Delete this comment"
                >
                    <FaTrash className="text-white" /> Delete
                </button>
            </td>
        </tr>
    );
};

export default ReportedReplay;
