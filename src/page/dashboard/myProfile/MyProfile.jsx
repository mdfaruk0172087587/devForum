import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import axiosSecure from '../../../hooks/axiosSecure';
import Loading from '../../../components/Loading';
import MyProfilePost from './MyProfilePost';

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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
        My Profile
      </h2>

      {/* User Info Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <img
          src={userInfo.image}
          alt="User"
          className="w-28 h-28 rounded-full border-4 border-indigo-100 shadow-md"
        />
        <div className="text-center sm:text-left">
          <p className="text-2xl font-semibold text-gray-800">{userInfo.name}</p>
          <p className="text-gray-600">{userInfo.email}</p>

          {/* Badges */}
          <div className="mt-3 flex justify-center sm:justify-start gap-2">
            {userInfo.role === 'member' ? (
              <span className="badge badge-warning text-lg py-1 px-3">🥇 Gold Member</span>
            ) : (
              <span className="badge badge-accent text-lg py-1 px-3">🥉 Bronze Member</span>
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