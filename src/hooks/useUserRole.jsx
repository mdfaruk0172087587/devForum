import React from 'react';
import useAuth from './useAuth';
import axiosSecure from './axiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosInstance = axiosSecure();
    const {
        data: role = 'user',
        isLoading: roleLoading,
        refetch,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/role?email=${user.email}`);
            return res.data.role;
        }
    })
    return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;