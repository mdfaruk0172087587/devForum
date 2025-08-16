import { IoMdNotificationsOutline } from 'react-icons/io';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, NavLink } from 'react-router';
import Logo from './Logo';

const Navbar = () => {
    const { user, logout, announcementCount } = useAuth();
    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout"
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
                    .then(() => {
                        Swal.fire("Logged out!", "You have been logged out.", "success");
                    })
                    .catch(error => {
                        Swal.fire("Error!", error.message, "error");
                    });
            }
        });
    };
    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-bold border-b-2 border-primary"
                            : "text-gray-700 hover:text-primary"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/membership"
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-bold border-b-2 border-primary"
                            : "text-gray-700 hover:text-primary"
                    }
                >
                    Membership
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/about-us"
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-bold border-b-2 border-primary"
                            : "text-gray-700 hover:text-primary"
                    }
                >
                    About
                </NavLink>
            </li>
        </>
    );
    return (
        <div className="navbar bg-white shadow-sm px-14">
            {/* Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <Logo></Logo>
            </div>

            {/* Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-3">
                    {links}
                </ul>
            </div>

            {/* End */}
            <div className="navbar-end gap-3">
                {/* Notification */}
                <div className="relative">
                    <IoMdNotificationsOutline size={26} className="text-gray-700 shadow-md hover:scale-105 transition-transform duration-200" />
                    {announcementCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                            {announcementCount}
                        </span>
                    )}
                </div>

                {/* Profile/Login */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt="User" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-48 space-y-2">
                            <li className="text-sm text-gray-600 font-semibold pointer-events-none">👤 {user?.displayName}</li>
                            <li><Link to="/dashboard" className="hover:bg-base-200">Dashboard</Link></li>
                            <li>
                                <button onClick={handleLogOut} className="btn btn-sm btn-error text-white w-full">Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-sm btn-primary shadow-md hover:scale-105 transition-transform duration-200">Join Us</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
