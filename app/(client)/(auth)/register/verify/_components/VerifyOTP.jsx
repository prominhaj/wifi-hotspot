"use client";

import { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { cn } from "@/lib/utils";
import { verifyOtp } from "@/app/actions/user";

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleOtpChange = (newOtp) => {
        if (/^\d{0,4}$/.test(newOtp)) {
            setOtp(newOtp);
            setError('');
        }
    };

    const handleOtpAction = async (formData) => {

        // Validate OTP
        if (otp.length !== 4) {
            setError('OTP must be exactly 4 digits');
            return;
        }

        if (!/^\d{4}$/.test(otp)) {
            setError('OTP must contain only numbers');
            return;
        }

        try {
            const verify = await verifyOtp(otp);
            if (verify.success) {
                toast.success('OTP verified successfully!');
            }
            else {
                toast.error(verify.message)
            }
        } catch (error) {
            toast.error('An error occurred during OTP verification.');
        }
    };

    return (
        <form action={handleOtpAction} className="flex flex-col items-center justify-center py-8">
            <InputOTP
                value={otp}
                onChange={(otp) => handleOtpChange(otp)}
                name="otp"
                maxLength={4}
            >
                <InputOTPGroup>
                    <InputOTPSlot
                        className={cn("w-12 h-12 text-xl", !otp[0] && "border-red-500")}
                        index={0}
                    />
                    <InputOTPSlot
                        className={cn("w-12 h-12 text-xl", !otp[1] && "border-red-500")}
                        index={1}
                    />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot
                        className={cn("w-12 h-12 text-xl", !otp[2] && "border-red-500")}
                        index={2}
                    />
                    <InputOTPSlot
                        className={cn("w-12 h-12 text-xl", !otp[3] && "border-red-500")}
                        index={3}
                    />
                </InputOTPGroup>
            </InputOTP>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            <SubmitButton variant="primary" size="lg" className="mt-5 text-lg tracking-widest">
                Verify
            </SubmitButton>
        </form>
    );
};

export default VerifyOTP;
