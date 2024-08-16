"use client";

import { useState, useEffect } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { cn } from "@/lib/utils";
import { getUserById, verifyOtp } from "@/app/actions/user";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { generateOTP } from "@/lib/otp";
import { getCookies } from "@/lib/cookies";

const VerifyOTP = ({ id }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(300);
    const [loading, setLoading] = useState(true);
    const [canResend, setCanResend] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const otpExpireTimer = async () => {
            const otpExpiresAt = await getCookies('otpExpiresAt');

            if (otpExpiresAt) {
                const expiresAt = new Date(otpExpiresAt).getTime();
                const now = Date.now();
                const remainingTime = Math.floor((expiresAt - now) / 1000);

                if (remainingTime > 0) {
                    setTimer(remainingTime);
                    setCanResend(false);
                } else {
                    setTimer(0);
                    setCanResend(true);
                }
            } else {
                setCanResend(true);
            }
            setLoading(false)
            return () => {
                clearInterval(otpExpireTimer);
            };
        }
        otpExpireTimer()
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
            Cookies.remove('otpExpiresAt');
        }
        setLoading(false)
    }, [timer]);

    const handleOtpAction = async (_formData) => {
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
            if (verify?.success) {
                toast.success(verify.message);
                router.push('/dashboard');
            } else {
                if (!verify?.otpVerify) {
                    setError(verify.message);
                    toast.error(verify.message);
                    setOtp('')
                    return;
                }
                toast.error(verify.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (otp.length === 4) {
            handleOtpAction()
        }
    }, [otp])

    const handleOtpChange = (newOtp) => {
        if (/^\d{0,4}$/.test(newOtp)) {
            setOtp(newOtp);
            setError('');
        }
    };

    const handleResendOtp = async () => {
        try {
            const user = await getUserById(id);
            const result = await generateOTP(user?.phone);
            if (result?.success) {
                toast.success(result.message);
                setTimer(300);
                setCanResend(false);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Failed to resend OTP. Please try again later.");
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="flex flex-col items-center justify-center py-5">
            <form action={handleOtpAction} className="flex flex-col items-center">
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

            <div className="mt-5 text-center">
                {canResend ? (
                    <button
                        onClick={handleResendOtp}
                        className="text-blue-500 underline"
                    >
                        Resend OTP
                    </button>
                ) : (
                    <p className="text-gray-500">
                        {
                            loading ? "loading..." : (
                                <>
                                    Resend OTP in {formatTime(timer)}
                                </>
                            )
                        }
                    </p>
                )}
            </div>
        </div>
    );
};

export default VerifyOTP;
