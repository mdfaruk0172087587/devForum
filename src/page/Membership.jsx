import React from 'react';
import Payment from './payment/Payment';
import { Helmet } from 'react-helmet-async';

const Membership = () => {
    return (
        <div className=' '>
            <Helmet>
                <title>Membership</title>
            </Helmet>
            <Payment></Payment>
        </div>
    );
};

export default Membership;