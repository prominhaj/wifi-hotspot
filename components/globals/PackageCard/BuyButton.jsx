"use client";

import { toast } from "sonner";
import Btn from "./Btn";

const BuyButton = ({ amount, user, packageId, disabled, isConnected }) => {

    const packagePaymentAction = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bkash/payment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount, userId: user?.id, packageId })
            });
            const result = await response.json();
            if (!result?.success) {
                toast.error(result?.error);
                return;
            }
            if (result?.paymentUrl) {
                window.location.href = result?.paymentUrl;
                return;
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <form action={packagePaymentAction} className="w-full">
                <Btn disabled={disabled} isConnected={true} />
            </form>
        </>
    );
};

export default BuyButton;