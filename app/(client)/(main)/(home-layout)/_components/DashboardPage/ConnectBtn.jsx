"use client";

import { Button } from "@/components/ui/button";
import { loginHotspotUser } from "@/lib/connectHotspot";
import { toast } from "sonner";

const ConnectBtn = ({ username, password }) => {

    // const connectInHotspot = () => {
    //     const loginUrl = `${process.env.NEXT_PUBLIC_MIKROTIK_LOGIN_DNS_IP}/login?username=${username}&password=${password}`;

    //     window.location.href = loginUrl;
    // }

    const connectInHotspot = async () => {
        try {
            const loginUser = await loginHotspotUser(username, password);
            if (loginUser?.success) {
                toast.success(loginUser?.message)
            }
            else {
                toast.error(loginUser?.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <Button
            onClick={connectInHotspot}
            variant="default"
            className="h-8 py-0 rounded-2xl"
        >
            Connect
        </Button>
    );
};

export default ConnectBtn;