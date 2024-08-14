"use client";

import { toast } from "sonner";
import SubmitButton from "../SubmitButton/SubmitButton";
import { packagePayment } from "@/app/actions/payment";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const BuyButton = ({ amount }) => {
    const { user } = useAuth();
    const router = useRouter();

    const packagePaymentAction = async () => {
        try {
            const url = await packagePayment(amount, user?.id);
            if (url) {
                router.push(url);
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