"use client";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { toast } from "sonner";

const ConnectBtn = ({ username, password }) => {

    // const connectInHotspot = () => {
    //     const loginUrl = `${process.env.NEXT_PUBLIC_MIKROTIK_LOGIN_DNS_IP}/login?username=${username}&password=${password}`;

    //     window.location.href = loginUrl;
    // }

    const connectInHotspot = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mikrotik/hotspot/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const result = await response.json();
            if (result?.success) {
                toast.success(result?.message)
            }
            else {
                toast.error(result?.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={connectInHotspot}>
            <SubmitButton
                variant="default"
                className="h-8 py-0 rounded-2xl"
            >
                Connect
            </SubmitButton>
        </form>
    );
};

export default ConnectBtn;