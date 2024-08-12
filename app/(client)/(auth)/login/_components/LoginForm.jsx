"use client";

import FormControl from "@/components/globals/FormControl/FormControl";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KeyRound, Phone } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginForm = ({ redirectUrl }) => {
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleUserLogin = async (e) => {
        e.preventDefault();
        setError({});
        setLoading(true);

        const phone = e.target.phone.value;
        const password = e.target.password.value;

        try {
            const result = await signIn("credentials", {
                redirect: false,
                phone,
                password,
            });

            if (result.error) {
                toast.error(result.error);
                setError({ [result.error.includes("Password") ? "password" : "phone"]: result.error });

                if (result.error === "Password does not match") {
                    e.target.password.value = "";
                } else if (result.error === "Phone Number Not Found") {
                    e.target.reset();
                }
                return;
            }

            if (result.ok) {
                if (redirectUrl) {
                    router.push(redirectUrl);
                } else {
                    router.push("/");
                }
                toast.success("Your account has been Login successful");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <h4 className="text-xl font-[600] tracking-wider text-center">লগইন</h4>
            <form className="pt-5" onSubmit={handleUserLogin}>
                <div className="space-y-4">
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
                        error={error?.phone}
                    >
                        {error.phone && <p className="text-red-500"><small>{error.phone}</small></p>}
                    </FormControl>
                    <FormControl
                        name="password"
                        label="পাসওয়ার্ড"
                        type="password"
                        maxLength={12}
                        minLength={4}
                        icon={<KeyRound className="w-4 h-4" />}
                        placeHolder="********"
                        error={error?.password}
                    >
                        {error.password && <p className="text-red-500"><small>{error.password}</small></p>}
                    </FormControl>
                    <SubmitButton
                        loading={loading}
                        variant="primary"
                        className="w-full tracking-wider rounded-lg"
                    >
                        লগইন
                    </SubmitButton>
                </div>
            </form>
            <div className="w-3/4 mx-auto mt-5 mb-3 border-t-2 border-gray-300 dark:border-gray-600"></div>
            <div>
                <p className="mb-2 text-base text-center">নতুন অ্যাকাউন্ট তৈরি করুন</p>
                <Link className={cn(buttonVariants({ variant: "destructive" }), "w-full font-semibold tracking-wider rounded-lg dark:bg-purple-500/75")} href="/register">
                    রেজিস্টার
                </Link>
            </div>
        </div>
    )
};

export default LoginForm;