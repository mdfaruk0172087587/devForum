import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import axiosSecure from '../../hooks/axiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
    const axiosInstance = axiosSecure();
    const {user} = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');

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
                        await Swal.fire({
                            icon: 'success',
                            title: 'payment successfully',
                            html: `<strong>Transaction ID:</strong> <code>${result.paymentIntent.id}</code>`,
                            confirmButtonText: '',
                        })

                        // navigate('/dashboard/myParcel')
                    }
                }
            }

    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>

                <CardElement className='p-2 border rounded '>

                </CardElement>
                <button className='btn btn-primary w-full' type="submit" disabled={!stripe}>
                    Pay $20
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;