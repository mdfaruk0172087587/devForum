import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import axiosSecure from '../../../hooks/axiosSecure';
import Loading from '../../../components/Loading';
import MyProfilePost from './MyProfilePost';
import { Helmet } from 'react-helmet-async';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosInstance = axiosSecure();
  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ['myProfile', user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user?.email}`);
      return res.data.user;
    }
  })
  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <div className="p-6">
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
        My Profile
      </h2>
      {/* User Info Section */}
      <div className="flex flex-col items-center sm:items-center md:flex-col lg:flex-col xl:flex-col gap-4 md:gap-6 mb-8">
        {/* User Image */}
        <div className="flex-shrink-0">
          <img
            src={userInfo.image}
            alt="User"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-indigo-100 shadow-md mx-auto"
          />
        </div>

        {/* User Details */}
        <div className="text-center">
          <p className="text-xl sm:text-2xl md:text-2xl font-semibold text-gray-800">{userInfo.name}</p>
          <p className="text-gray-600">{userInfo.email}</p>

          {/* Badges */}
          <div className="mt-2 sm:mt-3 flex justify-center gap-2 flex-wrap">
            {userInfo.role === 'member' ? (
              <span className="badge badge-warning text-base sm:text-lg py-1 px-3">🥇 Gold Member</span>
            ) : (
              <span className="badge badge-accent text-base sm:text-lg py-1 px-3">🥉 Bronze Member</span>
            )}
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <MyProfilePost />
    </div>
  );
};

export default MyProfile;