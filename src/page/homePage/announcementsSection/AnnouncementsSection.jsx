import React, { useEffect } from 'react';
import axiosUnSecure from '../../../hooks/axiosUnSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';
import Announcement from './Announcement';
import useAuth from '../../../hooks/useAuth';
import { FiVolume2 } from 'react-icons/fi';

const AnnouncementsSection = () => {
  const { setAnnouncementCount } = useAuth();
  const axiosUse = axiosUnSecure();

  const { data: announcementData = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosUse.get('/announcements', { withCredentials: true });
      return res.data.announcements;
    }
  });

  useEffect(() => {
    if (announcementData.length > 0) {
      setAnnouncementCount(announcementData.length);
    }
  }, [announcementData, setAnnouncementCount]);

  if (isLoading) {
    return <Loading />;
  }

  if (announcementData.length === 0) {
    return null;
  }

  return (
    <section className="my-12 px-4 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="flex justify-center items-center gap-3 mb-4">
          <FiVolume2 className="text-indigo-600 text-4xl animate-pulse" />
          <h2 className="text-3xl font-extrabold text-gray-800">Announcements</h2>
        </div>
        <p className="text-gray-600 text-base">
          🚀 Stay updated with the latest <span className="font-medium text-indigo-600">developer news</span>, feature rollouts,
          and upcoming community events. Never miss an important update!
        </p>
      </div>

      {/* Announcement Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {announcementData.map((announcement) => (
          <Announcement key={announcement._id} announcement={announcement} />
        ))}
      </div>
    </section>
  );
};

export default AnnouncementsSection;
