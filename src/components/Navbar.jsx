import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logout } = useAuth();
    
    const links = <>
        <li>
            <NavLink to='/'>Home</NavLink>
        </li>
        {
            user && <>
                <li>
                    <NavLink to='/membership'>Membership</NavLink>
                </li>
            </>
        }
    </>

    // handle logout
    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // log out
                logout()
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Log Out Successfully.",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        Swal.fire({
                            title: error.message,
                            icon: "error",
                            draggable: true
                        });
                    })
            }
        });
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}

                    </ul>
                </div>
                <Link to='/' className=' className=" text-xl"'>DevForum</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    {links}

                </ul>
            </div>
            <div className="navbar-end">
                <IoMdNotificationsOutline size={24} />
                {
                    user ? <>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-12 rounded-full">
                                    <img src={user?.photoURL} alt="user" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-32 space-y-1"
                            >
                                <p>Your Nme: {user?.displayName}</p>
                                <li>
                                    <Link>Dashboard</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogOut} className="btn btn-error btn-sm">Logout</button>
                                </li>
                            </ul>
                        </div>
                    </>
                        :
                        <>
                            <Link to='/login' className='btn btn-primary'>Join Us</Link>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;