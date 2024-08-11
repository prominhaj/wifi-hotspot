"use client";

import { useState } from 'react';

const PaymentButton = () => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/bkash/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: "1", userId: 'user123' }),
            });

            const { bkashURL } = await response.json();
            if (bkashURL) {
                window.location.href = bkashURL;
            } else {
                alert('Failed to initiate payment');
            }
        } catch (error) {
            console.error('Payment error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className="px-3 py-1 text-white bg-red-500 border rounded" onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : 'Pay with bKash'}
        </button>
    );
};

export default PaymentButton;
