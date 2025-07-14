import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import axiosSecure from '../../hooks/axiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import { Link, useNavigate } from 'react-router';

const CheckoutForm = () => {
    const axiosInstance = axiosSecure();
    const {user} = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const {data:userData={}, isLoading, refetch} = useQuery({
        queryKey: ['checkForm', user?.email],
        queryFn: async() => {
            const userRes = await axiosInstance.get(`/users/${user?.email}`);
            return userRes.data.user;
        }
    })
    

    // handle submit
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);

        if(!card){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if(error){
           setError(error.message);
        }
        else{
            setError('');
            console.log(paymentMethod)
        }

        const paymentRes = await axiosInstance.post('/create-payment-intent', {
            amountInCents: 20 * 100,
        })
      const clientSecret =  paymentRes.data.clientSecret;

        // ste 3
          const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            });

             if (result.error) {
                setError(result.error.message);
            }

            else{
                  setError('')
                   if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    console.log(result)
                    // step 4: mark parcel paid payment history
                    const paymentData = {
                      
                        email: user?.email,
                        amount: 2000,
                        paymentMethod: result.paymentIntent.payment_method_types,
                        transactionId:result.paymentIntent.id
                    }

                    const paymentRes = await axiosInstance.post('/payments', paymentData);
                    if(paymentRes.data.insertedId){
                        refetch()
                        await Swal.fire({
                            icon: 'success',
                            title: 'payment successfully',
                            html: `<strong>Transaction ID:</strong> <code>${result.paymentIntent.id}</code>`,
                            confirmButtonText: 'Go To Add Post',
                        })

                        navigate('/dashboard/addPost')
                    }
                }
            }

    }

    if(isLoading){
        return <Loading></Loading>
    }


    if(userData.role === 'member'){
        return <section>
            <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md">
    🎉 You are already a <strong>Member</strong>!  
    Now you can post without any limitations and enjoy all the exclusive features.  
    Thank you for being with us ❤️
   
  </div>
   <div className='flex justify-center'>
    <Link to='/dashboard/addPost' className='btn btn-primary '> Go To Add Post</Link>
   </div>
        </section>
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>

                <CardElement className='p-2 border rounded '>

                </CardElement>
                <button className='btn btn-primary w-full' type="submit" disabled={!stripe}>
                   Membership  (Pay $20)
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;