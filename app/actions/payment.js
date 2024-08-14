'use server';

export const packagePayment = async (amount, userId) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/bkash/payment/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount, userId })
            }
        );
        const { bkashURL } = await response.json();
        return bkashURL;
    } catch (error) {
        throw new Error(error);
    }
};
