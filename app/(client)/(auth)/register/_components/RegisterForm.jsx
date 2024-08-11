"use client";

import FormControl from "@/components/globals/FormControl/FormControl";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KeyRound, Phone, UserPen } from "lucide-react";
import Link from "next/link";

const RegisterForm = () => {
    return (
        <div>
            <h4 className="text-xl font-[600] tracking-wider text-center">রেজিস্টার</h4>
            <form className="pt-5" action="">
                <div className="space-y-4">
                    <FormControl
                        name="name"
                        label="আপনার নাম"
                        icon={<UserPen className="w-4 h-4" />}
                        placeHolder="Shakibul Islam"
                    />
                    <FormControl
                        name="phone"
                        label="ফোন নাম্বার"
                        type="tel"
                        maxLength={11}
                        minLength={11}
                        pattern="\d{11}"
                        title="Please enter a valid 11-digit phone number"
                        icon={<Phone className="w-4 h-4" />}
                        placeHolder="01786XXXXXX"
                    />
                    <FormControl
                        name="password"
                        label="পাসওয়ার্ড দিন"
                        type="password"
                        maxLength={12}
                        minLength={4}
                        icon={<KeyRound className="w-4 h-4" />}
                        placeHolder="********"
                    />
                    <FormControl
                        name="confirmPassword"
                        label="আবার পাসওয়ার্ড দিন"
                        type="password"
                        maxLength={12}
                        minLength={4}
                        icon={<KeyRound className="w-4 h-4" />}
                        placeHolder="********"
                    />
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