import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { PiEyesFill } from 'react-icons/pi';
import { LiaEyeSlash } from 'react-icons/lia';
import GoogleLogin from '../components/GoogleLogin';
import axiosUnSecure from '../hooks/axiosUnSecure';
import registerLottie from '../assets/lottie/registarLottie.json'
import Lottie from 'lottie-react';
import { Helmet } from 'react-helmet-async';
import Logo from '../components/Logo';

const Register = () => {
    const { createUser, updateUser } = useAuth();
    const [uploadImage, setUploadImage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const useAxios = axiosUnSecure();
    // handle submit
    const onSubmit = (data) => {
        // register
        createUser(data?.email, data?.password)
            .then(async () => {
                // update user firebase
                const updateFirebase = {
                    displayName: data.name,
                    photoURL: uploadImage
                }
                updateUser(updateFirebase)
                    .then(() => {

                    })
                    .catch(error => {
                        Swal.fire({
                            title: error.message,
                            icon: "success",
                            draggable: true
                        });
                    })
                // users database a post
                const userPost = {
                    name: data.name,
                    email: data.email,
                    role: 'user',
                    image: uploadImage,
                    createdAt: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                }
                await useAxios.post('/users', userPost)
                // success
                Swal.fire({
                    title: "Your Register Successfully!",
                    icon: "success",
                    draggable: true
                });
                navigate('/')
            })
            .catch(error => {
                Swal.fire({
                    title: error.message,
                    icon: "error",
                    draggable: true
                });
            })
    }
    // handle upload photo
    const handleUploadPhoto = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image)
        const imageUrlUpload = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_url}`
        const res = await axios.post(imageUrlUpload, formData);
        setUploadImage(res.data.data.url)
    }
    return (
        <div className="min-h-screen flex flex-col font-sans ">
            <Helmet>
                <title>Register Page</title>
            </Helmet>
            {/* Main Content */}
            <div className="flex flex-1">
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 flex justify-center items-center p-8">
                    <div className="w-full max-w-sm">
                            <Logo></Logo>
                        <h2 className="text-3xl font-medium text-center  text-gray-900 mb-6">Welcome back</h2>
                        {/* main part */}
                        <div className='space-y-4'>
                            <form className="" onSubmit={handleSubmit(onSubmit)} >
                                {/* name */}
                                <div>
                                    <label className="label block mb-1 text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" {...register('name', { required: true })} className="input w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white" placeholder="Name" />
                                    {
                                        errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                                    }
                                </div>
                                {/* email */}
                                <div>
                                    <label className="label block mb-1 text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" {...register('email', { required: true, })} className="input w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white" placeholder="Email" />
                                    {
                                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                                    }
                                </div>
                                {/* photo */}
                                <div>
                                    <label className="label block mb-1 text-sm font-medium text-gray-700">Photo</label>
                                    <input type="file" {...register('image', { required: true })} className="input w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white" onChange={handleUploadPhoto} placeholder="Photo" />
                                    {
                                        errors.image?.type === 'required' && <p className='text-red-500'>Photo is required</p>
                                    }
                                </div>
                                {/* password */}
                                <div className=''>
                                    <label className="label relative block mb-1 text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters'
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{6,}$/,
                                                message: 'Password must include uppercase, lowercase, number & special character (!@#$%)'
                                            }
                                        })}
                                        className=" w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                        placeholder="Password"
                                    />
                                    {
                                        errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password?.message}</p>
                                    }
                                </div>
                                {/*  Eye Toggle Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-[15%] bottom-[9.5%] md:right-[58%] lg:bottom-[24.5%] lg:right-[61%] z-10 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    {showPassword ? <PiEyesFill size={22} /> : <LiaEyeSlash size={22} />}
                                </button>
                                <button type='submit' className="w-full bg-purple-700 text-white mt-2 py-2 rounded-md hover:bg-purple-800 transition font-medium">Register</button>
                            </form>
                            <p className='text-sm text-center text-gray-600'>Already have an account? <Link to='/login' className='text-purple-700 hover:underline font-medium'>Login</Link></p>
                            <GoogleLogin></GoogleLogin>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:flex w-1/2 bg-purple-100 justify-center items-center p-8">
                    <Lottie animationData={registerLottie} loop={true}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default Register;