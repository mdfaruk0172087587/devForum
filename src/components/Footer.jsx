import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Footer = () => {
    const links = (
        <>

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

        </>
    );
    return (
        <footer className="footer footer-horizontal footer-center bg-base-300 text-base-content rounded p-10">
            <nav className="grid grid-flow-col gap-4">
                {links}
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-6 text-3xl">
                    {/* Facebook */}
                    <a
                        href="https://facebook.com/faruk5872a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600"
                    >
                        <FaFacebook />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://linkedin.com/in/omar-faruk8/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500"
                    >
                        <FaLinkedin />
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/mdfaruk0172087587"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-800"
                    >
                        <FaGithub />
                    </a>
                </div>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Omar Faruk</p>
            </aside>
        </footer>
    );
};

export default Footer;