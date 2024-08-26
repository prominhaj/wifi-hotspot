"use client";

import Spinner from "@/components/globals/Loading/Spinner";
import { Button } from "@/components/ui/button";
import { loginHotspotUser } from "@/lib/connectHotspot";
import { useState } from "react";
import { toast } from "sonner";

const ConnectBtn = ({ username, password }) => {
    const [loading, setLoading] = useState(false);

    // const connectInHotspot = () => {
    //     const loginUrl = `${process.env.NEXT_PUBLIC_MIKROTIK_LOGIN_DNS_IP}/login?username=${username}&password=${password}`;

    //     window.location.href = loginUrl;
    // }

    const connectInHotspot = async () => {
        setLoading(true);
        try {
            const loginUser = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mikrotik/hotspot/connect`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            })
            const result = await loginUser.json();
            if (result?.success) {
                toast.success(result?.message)
            }
            else {
                toast.error(result?.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Button
            disabled={loading}
            onClick={connectInHotspot}
            variant="default"
            className="h-8 py-0 rounded-2xl"
        >
            {loading ? <span className="flex items-center gap-1"> <Spinner /> Connecting...</span> : "Connect"}
        </Button>
    );
};

export default ConnectBtn;