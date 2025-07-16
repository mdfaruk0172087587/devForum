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
            .then( async() => {

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
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                   <Lottie animationData={registerLottie} loop={true}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-3xl text-center mt-2 font-bold">Register now!</h1>

                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                            {/* name */}
                            <label className="label">Name</label>
                            <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />
                            {
                                errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                            }
                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true, })} className="input" placeholder="Email" />
                            {
                                errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                            }
                            {/* photo */}
                            <label className="label">Photo</label>
                            <input type="file" {...register('image', { required: true })} className="input" onChange={handleUploadPhoto} placeholder="Photo" />
                            {
                                errors.image?.type === 'required' && <p className='text-red-500'>Photo is required</p>
                            }
                            {/* password */}
                            <label className="label relative">Password</label>

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
                                className="input input-bordered w-full pr-12"
                                placeholder="Password"
                            />

                            {/*  Eye Toggle Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute bottom-44 right-14  -translate-y-1/2 text-gray-500 hover:text-blue-500"
                            >
                                {showPassword ? <PiEyesFill size={22} /> : <LiaEyeSlash size={22} />}
                            </button>


                            {/* Error Message */}

                            {
                                errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password?.message}</p>
                            }


                            <button type='submit' className="btn btn-neutral mt-4">Register</button>

                        </form>
                        <p className='text-lg'>Already have an account? <Link to='/login' className='text-[#8FA748]'>Login</Link></p>

                        <GoogleLogin></GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;