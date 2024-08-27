"use client";

import { Button } from "@/components/ui/button";

const ConnectBtn = ({ username, password }) => {

    const connectInHotspot = () => {
        const loginUrl = `${process.env.NEXT_PUBLIC_MIKROTIK_LOGIN_DNS_IP}/login?username=${username}&password=${password}`;

        window.location.href = loginUrl;
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