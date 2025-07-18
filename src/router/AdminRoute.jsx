import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import { Navigate } from 'react-router';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { roleLoading, role } = useUserRole();
    if (loading || roleLoading) {
        return <Loading></Loading>
    }
    if (!user || role !== 'admin') {
        return <Navigate to='/forbidden'></Navigate>
    }
    return children;
};

export default AdminRoute;