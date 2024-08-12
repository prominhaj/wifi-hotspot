"use client";

import FormControl from "@/components/globals/FormControl/FormControl";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KeyRound, Phone, UserPen } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { userValidation } from "@/lib/validations/user";
import { useState } from "react";

const RegisterForm = () => {
    const [errors, setErrors] = useState(null);

    const sendOtp = async (phoneNumber) => {
        const number = parseInt(phoneNumber)
        const otp = Math.floor(1000 + Math.random() * 9000);
        const message = `Your Shakib Electronics OTP is ${otp}`;

        const apiUrl = `https://bulksmsbd.net/api/smsapi?api_key=${process.env.NEXT_PUBLIC_SMS_API_KEY}&type=text&number=${number}&senderid=8809617613576&message=${message}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data?.success_message) {
                toast.success('OTP sent successfully!');
            }

        } catch (error) {
            toast.error('An error occurred while sending OTP.');
            console.error('Error:', error);
        }
    };

    const registerFormAction = async (formData) => {
        setErrors(null);
        try {
            const singUp = await userValidation(formData);
            if (singUp.errors) {
                setErrors(singUp.errors);
                return;
            }
            if (singUp?.success) {
                console.log(singUp.data);
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div>
            <h4 className="text-xl font-[600] tracking-wider text-center">রেজিস্টার</h4>
            <form className="pt-5" action={registerFormAction}>
                <div className="space-y-4">
                    <FormControl
                        name="name"
                        label="আপনার নাম"
                        icon={<UserPen className="w-4 h-4" />}
                        placeHolder="Shakibul Islam"
                        error={errors?.name}
                    >
                        {errors?.name && (
                            <p className="flex flex-col items-start justify-start gap-0.5 text-red-500">
                                {
                                    errors.name.map((mess, i) => (
                                        <small key={i}>
                                            {mess}
                                        </small>
                                    ))
                                }
                            </p>
                        )}
                    </FormControl>
                    <FormControl
                        name="phone"
                        label="ফোন নাম্বার"
                        type="tel"
                        maxLength={11}
                        minLength={11}
                        icon={<Phone className="w-4 h-4" />}
                        placeHolder="01786XXXXXX"
                        error={errors?.phone}
                    >
                        {errors?.phone && (
                            <p className="flex flex-col items-start justify-start gap-0.5 text-red-500">
                                {
                                    errors.phone.map((mess, i) => (
                                        <small key={i}>
                                            {mess}
                                        </small>
                                    ))
                                }
                            </p>
                        )}
                    </FormControl>
                    <FormControl
                        name="password"
                        label="পাসওয়ার্ড দিন"
                        type="password"
                        maxLength={12}
                        minLength={4}
                        icon={<KeyRound className="w-4 h-4" />}
                        placeHolder="********"
                        error={errors?.password}
                    >
                        {errors?.password && (
                            <p className="flex flex-col items-start justify-start gap-0.5 text-red-500">
                                {
                                    errors.password.map((mess, i) => (
                                        <small key={i}>
                                            {mess}
                                        </small>
                                    ))
                                }
                            </p>
                        )}
                    </FormControl>
                    <FormControl
                        name="confirmPassword"
                        label="আবার পাসওয়ার্ড দিন"
                        type="password"
                        maxLength={12}
                        minLength={4}
                        icon={<KeyRound className="w-4 h-4" />}
                        placeHolder="********"
                        error={errors?.confirmPassword}
                    >
                        {errors?.confirmPassword && (
                            <p className="flex flex-col items-start justify-start gap-0.5 text-red-500">
                                {
                                    errors.confirmPassword.map((mess, i) => (
                                        <small key={i}>
                                            {mess}
                                        </small>
                                    ))
                                }
                            </p>
                        )}
                    </FormControl>
                    <SubmitButton
                        variant="primary"
                        className="w-full tracking-wider rounded-lg"
                    >
                        রেজিস্টার
                    </SubmitButton>
                </div>
            </form>
            <div className="w-3/4 mx-auto mt-5 mb-3 border-t-2 border-gray-300 dark:border-gray-600"></div>
            <div>
                <p className="mb-2 text-base text-center">ইতিমধ্যে একটি অ্যাকাউন্ট আছে ?</p>
                <Link className={cn(buttonVariants({ variant: "destructive" }), "w-full font-semibold tracking-wider rounded-lg dark:bg-purple-500/75")} href="/login">
                    লগইন
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;