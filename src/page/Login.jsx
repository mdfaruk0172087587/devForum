import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import GoogleLogin from '../components/GoogleLogin';
import loginLottie from '../assets/lottie/loginLottie.json';
import Lottie from 'lottie-react';
import { PiEyesFill } from 'react-icons/pi';
import { LiaEyeSlash } from 'react-icons/lia';
import { Helmet } from 'react-helmet-async';
import Logo from '../components/Logo';

const Login = () => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    // onSubmit
    const onSubmit = (data) => {
        //    login
        login(data?.email, data?.password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "LogIn Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location.state || '/')
            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }
    return (
        <div className="min-h-screen flex flex-col font-sans ">
            <Helmet>
                <title>Login Page</title>
            </Helmet>
            {/* Main Content */}
            <div className="flex flex-1">
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 flex justify-center items-center p-8 ">
                    <div className="w-full max-w-sm">
                            <Logo></Logo>
                        <h2 className="text-3xl font-medium text-center  text-gray-900 mb-6">Welcome back</h2>
                        {/* main part */}
                        <div className='space-y-4'>
                            <form className=" relative" onSubmit={handleSubmit(onSubmit)} >
                                {/* email */}
                                <div>
                                    <label className="label block mb-1 text-sm font-medium text-gray-700">Email</label>
                                    <input type='email' {...register('email', { required: true, })} className="input w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white" placeholder="Email" />
                                    {
                                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                                    }
                                </div>
                                {/* pass */}
                                <div>
                                    <label className="label relative block mb-1 text-sm font-medium text-gray-700">Password</label>
                                    <input type={showPassword ? 'text' : 'password'} {...register('password', { required: true, minLength: 6 })} className="input w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white" placeholder="Password" />
                                </div>
                                {/* Eye Toggle Button */}
                                <button className=' -translate-y-1/2  absolute right-6 bottom-11 z-10 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300' type='button' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <PiEyesFill size={24}></PiEyesFill > : <LiaEyeSlash size={24}></LiaEyeSlash>}
                                </button>
                                {
                                    errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                                }
                                {
                                    errors.password?.type === 'minLength' && <p className='text-red-500'>password has ben 6 charecter</p>
                                }
                                <button className="w-full bg-purple-700 text-white mt-2 py-2 rounded-md hover:bg-purple-800 transition font-medium">Login</button>
                            </form>
                            <p className='text-sm text-center text-gray-600'>Don’t have any account? <Link to='/register'><span className=' text-purple-700 hover:underline font-medium'>Register</span></Link></p>
                            <GoogleLogin></GoogleLogin>
                        </div>
                    </div>
                </div>
                {/* Right Side - Image */}
                <div className="hidden md:flex w-1/2 bg-purple-100 justify-center items-center p-8">
                    <Lottie animationData={loginLottie} loop={true}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default Login;