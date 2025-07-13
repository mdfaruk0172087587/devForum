import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import axiosSecure from '../../../hooks/axiosSecure';
import Loading from '../../../components/Loading';
import MyProfilePost from './MyProfilePost';

const MyProfile = () => {
    const {user} = useAuth();
    const axiosInstance = axiosSecure();
    const {data:userInfo = {}, isLoading} = useQuery({
        queryKey: ['myProfile', user?.email],
        queryFn: async() => {
            const res = await axiosInstance.get(`/users/${user?.email}`);
            return res.data.user;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }
  
    return (
         <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {/* User Info Section */}
      <div className="flex items-center gap-4 mb-6">
        <img src={userInfo.image} alt="User" className="w-20 h-20 rounded-full" />
        <div>
          <p className="text-xl font-semibold">{userInfo.name}</p>
          <p className="text-gray-600">{userInfo.email}</p>

          {/* Badges */}
          <div className="mt-2 flex gap-2">
            
            {userInfo.role === 'member' ? <>
             <span className="badge badge-warning">🥇 Gold</span>
            </> 
            :
             <>
             <span className="badge badge-accent">🥉 Bronze</span>
             </>}
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}

      <MyProfilePost></MyProfilePost>
     
    </div>
    );
};

export default MyProfile;