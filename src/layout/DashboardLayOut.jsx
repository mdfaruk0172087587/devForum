import React from 'react';
import Logo from '../components/Logo';
import { NavLink, Outlet } from 'react-router';
import { FaListUl, FaPlusSquare, FaUserCircle, FaUserCog, FaBullhorn, FaExclamationTriangle, FaUsersCog, FaHome } from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';
import AdminProfile from '../page/adminDashboard/AdminProfile';

const DashboardLayOut = () => {
    const { role, roleLoading } = useUserRole();
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-primary text-white font-semibold' : 'hover:bg-base-300'
        }`;
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 text-lg font-semibold">Dashboard</div>
                </div>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
                    <Logo />
                      <li>
                        <NavLink to="/dashboard" end className={linkClasses}>
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    {/* Member Section */}
                    {!roleLoading && role !== 'admin' && (
                        <>
                            <li>
                                <NavLink to='/dashboard/myProfile' className={linkClasses}>
                                    <FaUserCircle /> My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/addPost' className={linkClasses}>
                                    <FaPlusSquare /> Add Post
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myPosts' className={linkClasses}>
                                    <FaListUl /> My Posts
                                </NavLink>
                            </li>
                        </>
                    )}
                    {/* Admin Section */}
                    {!roleLoading && role === 'admin' && (
                        <>
                            <li>
                                <NavLink to='/dashboard/adminProfile' className={linkClasses}>
                                    <FaUserCog /> Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageUsers' className={linkClasses}>
                                    <FaUsersCog /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/makeAnnouncement' className={linkClasses}>
                                    <FaBullhorn /> Make Announcement
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/reportedActivities' className={linkClasses}>
                                    <FaExclamationTriangle /> Reported Activities
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayOut;
