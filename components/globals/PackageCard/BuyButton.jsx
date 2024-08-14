"use client";

import { toast } from "sonner";
import SubmitButton from "../SubmitButton/SubmitButton";
import useAuth from "@/hooks/useAuth";
import { redirectPath } from "@/app/actions";

const BuyButton = ({ amount }) => {
    const { user } = useAuth();

    const packagePaymentAction = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bkash/payment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount, userId: user?.id })
            });
            const result = await response.json();
            if (!result?.success) {
                toast.error(result?.error);
                return;
            }
            if (result?.bkashURL) {
                await redirectPath(result?.bkashURL)
                toast.success("Payment successful! Redirecting to payment gateway...");
                return;
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={packagePaymentAction} className="w-full">
            <SubmitButton className="w-full h-10 text-lg text-green-500 border-green-500" variant="outline">
                Buy
            </SubmitButton>
        </form>
    );
};

export default BuyButton;