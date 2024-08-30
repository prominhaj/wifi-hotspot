"use client";

import { updatePaymentById } from "@/app/actions/payment";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { toast } from "sonner";

const ConnectBtn = ({ username, password, paymentInfo }) => {

    const connectInHotspot = async () => {
        const loginUrl = `${process.env.NEXT_PUBLIC_MIKROTIK_LOGIN_DNS_IP}/login?username=${username}&password=${password}`;
        try {
            // if payment pending then update
            if (paymentInfo?.status === 'pending') {
                await updatePaymentById(paymentInfo?._id, {
                    status: "paid"
                })
            }
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            window.location.href = loginUrl;
        }
    }

    return (
        <form action={connectInHotspot}>
            <SubmitButton
                variant="default"
                className="h-8 py-0 rounded-2xl"
                loadingText="Connecting..."
            >
                Connect
            </SubmitButton>
        </form>
    );
};

export default ConnectBtn;