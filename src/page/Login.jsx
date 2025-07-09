import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import GoogleLogin from '../components/GoogleLogin';

const Login = () => {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

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
                navigate('/')
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
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
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

                            <label className="label">Password</label>
                            <input type='password' {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />

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