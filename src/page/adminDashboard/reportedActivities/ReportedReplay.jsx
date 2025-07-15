import React from 'react';
import axiosSecure from '../../../hooks/axiosSecure';
import Swal from 'sweetalert2';

const ReportedReplay = ({ replay, index, refetch }) => {
    const { reportedEmail, feedback, commentId, _id } = replay;
    const axiosInstance = axiosSecure();

    //   handle delete
    const handleDelete =  (id, replayDeleteId) => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then( async(result) => {
            if (result.isConfirmed) {
                try {
            const res = await axiosInstance.delete(`/comments/${id}`);
            if (res.data.success) {
                // replay collection theke delete
                const replayRes = await axiosInstance.delete(`/commentsReplay/${replayDeleteId}`);
                if (replayRes.data.success) {
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                    refetch()
                }
            }
        }
        catch (error) {
            Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                });
        }

                
            }
        });

        
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
