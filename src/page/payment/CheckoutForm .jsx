import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import axiosSecure from '../../hooks/axiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import { Link, useNavigate } from 'react-router';
import { FaArrowRight, FaCrown, FaTools, FaUserShield } from 'react-icons/fa'; // 👑 Membership icon
import { BsCreditCard2Front } from 'react-icons/bs'; // 💳 Card icon

const CheckoutForm = () => {
    const axiosInstance = axiosSecure();
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { data: userData = {}, isLoading, refetch } = useQuery({
        queryKey: ['checkForm', user?.email],
        queryFn: async () => {
            const userRes = await axiosInstance.get(`/users/${user?.email}`);
            return userRes.data.user;
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            console.log(paymentMethod)
        }

        const paymentRes = await axiosInstance.post('/create-payment-intent', {
            amountInCents: 20 * 100,
        });
        const clientSecret = paymentRes.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                },
            },
        });

        if (result.error) {
            setError(result.error.message);
        } else {
            setError('');
            if (result.paymentIntent.status === 'succeeded') {
                const paymentData = {
                    email: user?.email,
                    amount: 2000,
                    paymentMethod: result.paymentIntent.payment_method_types,
                    transactionId: result.paymentIntent.id
                };

                const paymentRes = await axiosInstance.post('/payments', paymentData);
                if (paymentRes.data.insertedId) {
                    refetch();
                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful',
                        html: `<strong>Transaction ID:</strong> <code>${result.paymentIntent.id}</code>`,
                        confirmButtonText: 'Go To Add Post',
                    });
                    navigate('/dashboard/addPost');
                }
            }
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (userData.role === 'member') {
        return (
            <section className="text-center space-y-6 py-20 px-4">
            <div className="bg-green-50 border border-green-300 text-green-900 px-6 py-6 rounded-lg shadow-md flex items-center justify-center gap-3">
                <FaCrown className="text-3xl text-green-600" />
                <div className="text-left">
                    <h2 className="text-2xl font-semibold">🎉 Congratulations!</h2>
                    <p className="text-lg mt-1">
                        You are already a <span className="font-bold text-green-700">Member</span> of <strong>DevForum</strong>!
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                        As a member, you now have full access to create posts, join discussions, and contribute your thoughts freely within the community.
                    </p>
                </div>
            </div>

            <Link
                to="/dashboard/addPost"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-200 shadow-md"
            >
                <span>Go to Add Post</span>
                <FaArrowRight className="text-sm" />
            </Link>
        </section>
        );
    }

    if(userData.role === 'admin'){
        return  <section className="text-center space-y-6 py-20 px-4">
            <div className="bg-blue-50 border border-blue-300 text-blue-900 px-6 py-6 rounded-lg shadow-md flex items-center justify-center gap-3">
                <FaUserShield className="text-3xl text-blue-600" />
                <div className="text-left">
                    <h2 className="text-2xl font-semibold">👑 Welcome Admin!</h2>
                    <p className="text-lg mt-1">
                        You have <span className="font-bold text-blue-700">full control</span> over the DevForum platform.
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                        From managing users to moderating posts and tags — you ensure this community stays productive and safe.
                    </p>
                </div>
            </div>

            <Link
                to="/dashboard/manageUsers"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all duration-200 shadow-md"
            >
                <span>Go to Admin Panel</span>
                <FaTools className="text-sm" />
            </Link>
        </section>
    }

    return (
        <div className="py-28 bg-[#F8FAFC] min-h-screen">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-center text-indigo-600 flex items-center justify-center gap-2">
                    <BsCreditCard2Front className="text-3xl" />
                    Membership Payment
                </h2>
                <p className="text-gray-600 text-sm text-center">
                    Unlock premium features, post without limits, and stand out in the community. Secure your membership for only <strong>$20</strong>.
                </p>
                <CardElement className="p-3 border rounded-md focus:outline-indigo-500" />
                <button className="btn btn-primary w-full" type="submit" disabled={!stripe}>
                    Become a Member (Pay $20)
                </button>
                {error && <p className="text-red-600 text-center">{error}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
