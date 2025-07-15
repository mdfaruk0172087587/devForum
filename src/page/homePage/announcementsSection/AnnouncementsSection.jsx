import React, { useEffect } from 'react';
import axiosUnSecure from '../../../hooks/axiosUnSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import Announcement from './Announcement';
import useAuth from '../../../hooks/useAuth';

const AnnouncementsSection = () => {
    const {setAnnouncementCount} = useAuth();
    const axiosUse = axiosUnSecure();
    const {data:announcementData = [], isLoading} = useQuery({
        queryKey: ['announcements'],
        queryFn: async() => {
            const res = await axiosUse.get('/announcements');
            return res.data.announcements;
        }
    })

    useEffect(() => {
        if(announcementData.length > 0){
            setAnnouncementCount(announcementData.length)
        }
    }, [announcementData, setAnnouncementCount])
    
    if(isLoading){
        return <Loading></Loading>
    }

    if(announcementData.length === 0){
        return;
    }

 
    return (
        <div>
            <h1 className='text-center'>this is AnnouncementsSection</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-3'>
                {
                announcementData.map(announcement => <Announcement key={announcement._id} announcement={announcement}></Announcement>)
            }
            </div>
        </div>
    );
};

export default AnnouncementsSection;