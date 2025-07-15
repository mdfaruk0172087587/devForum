import React from 'react';
import axiosSecure from '../../../hooks/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import ReportedReplay from './ReportedReplay';

const ReportedActivities = () => {
    const axiosInstance = axiosSecure();
    const { data: replayData = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedActivities'],
        queryFn: async () => {
            const res = await axiosInstance.get('/commentsReplay');
            return res.data.replays;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    if(replayData.length === 0){
        return <p>no </p>
    }

    return (
        <div>
            <h1>thsi si ReportedActivities</h1>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Feedback</th>
                        <th>Reported Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        replayData.map((replay, index) => <ReportedReplay key={replay._id} index={index} replay={replay} refetch={refetch}></ReportedReplay>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ReportedActivities;