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
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    {/* animation */}
                    <Lottie animationData={loginLottie} loop={true}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-3xl text-center mt-2 font-bold">Login now!</h1>

                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                            <label className="label">Email</label>
                            <input type='email' {...register('email', { required: true, })} className="input" placeholder="Email" />

                            {
                                errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                            }

                            <label className="label relative">Password</label>
                            <input type= {showPassword? 'text': 'password'} {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                            {/* Eye Toggle Button */}
                            <button className='absolute bottom-44 right-14 z-20  -translate-y-1/2 text-gray-500 hover:text-blue-500' type='button' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword? <PiEyesFill size={24}></PiEyesFill > : <LiaEyeSlash size={24}></LiaEyeSlash>}
                            </button>

                            {
                                errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                            }
                            {
                                errors.password?.type === 'minLength' && <p className='text-red-500'>password has ben 6 charecter</p>
                            }

                            <button className="btn btn-neutral mt-4">Login</button>
                           
                        </form>
                         <p className='text-lg'>Don’t have any account? <Link to='/register'><span className='text-[#8FA748]'>Register</span></Link></p>

                         <GoogleLogin></GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;