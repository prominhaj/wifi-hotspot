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
import { getUserById, verifyOtp } from "@/app/actions/user";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const VerifyOTP = ({ id }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleOtpChange = (newOtp) => {
        if (/^\d{0,4}$/.test(newOtp)) {
            setOtp(newOtp);
            setError('');
        }
    };

    const handleOtpAction = async (_formData) => {

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
            const verify = await verifyOtp(otp, id);
            const user = await getUserById(id);

            if (verify.success) {
                toast.success('OTP verified successfully!');
                // Auto login the user
                const loginResponse = await signIn('credentials', {
                    redirect: false,
                    phone: user?.phone,
                    password: user?.password,
                });

                if (loginResponse?.error) {
                    throw new Error(loginResponse.error);
                }

                router.push('/dashboard');
            }
            else {
                toast.error(verify.message)
            }
        } catch (error) {
            toast.error(error.message);
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
