"use client";

import { toast } from "sonner";
import SubmitButton from "../SubmitButton/SubmitButton";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const BuyButton = ({ amount }) => {
    const { user } = useAuth();
    const router = useRouter();

    const packagePaymentAction = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bkash/payment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount, userId: user?.id })
            });
            const { bkashURL } = await response.json();
            if (bkashURL) {
                router.push(bkashURL);
                toast.success("Payment successful! Redirecting to payment gateway...");
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