"use client";

import { CircleCheck } from "lucide-react";

const CheckPayment = ({ user }) => {
    const loginUrl = `${process.env.NEXT_PUBLIC_MIKROTIK_LOGIN_DNS_IP}/login?username=${user?.phone}&password=${user?.phone}`;

    window.location.href = loginUrl;

    return (
        <div className='flex flex-col items-center justify-center flex-1 w-full h-full my-16'>
            <div className='flex flex-col items-center max-w-full gap-6 text-center'>
                <>
                    <CircleCheck className='w-32 h-32 p-0 text-white bg-green-500 rounded-full' />
                    <h1 className='text-xl md:text-2xl lg:text-3xl'>
                        Congratulations, <strong>{user?.name}</strong>! your have
                        successfully purchase
                    </h1>
                </>
            </div>
        </div>
    );
};

export default CheckPayment;