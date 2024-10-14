"use client";

import { redirectPath } from "@/app/actions";
import { loginUser } from "@/app/actions/auth";
import { getUserByPhone } from "@/app/actions/user";
import FormControl from "@/components/globals/FormControl/FormControl";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KeyRound, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginForm = ({ redirectUrl }) => {
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleUserLogin = async (formData) => {
        setErrors({});
        const phone = formData.get("phone");
        const password = formData.get("password");

        if (!phone || !password) {
            setErrors({
                phone: ["Please enter a phone number"],
                password: ["Password number is required"],
            });
            return;
        }

        try {
            const user = await getUserByPhone(phone);
            const result = await loginUser(phone, password);

            if (result?.success) {
                if (!result?.user?.profilePhoto?.url) {
                    router.push(`/upload-image`)
                    return;
                }
                if (result?.user?.role == "admin") {
                    toast.success(result.message);
                    router.push("/dashboard")
                }
                else {
                    toast.success(result.message);
                    router.push(redirectUrl || "/")
                }
            } else {
                handleErrors(result, user);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleErrors = (result, user) => {
        if (result.phone || result.password) {
            setErrors({
                phone: result.phone ? [result.message] : undefined,
                password: result.password ? [result.message] : undefined,
            });
        } else if (result.verified) {
            router.push(`/register/verify?id=${user?.id}`);
        }
        toast.error(result.message);
    };

    return (
        <div>
            <h4 className="text-xl font-semibold tracking-wider text-center">লগইন</h4>
            <form className="pt-5" action={handleUserLogin}>
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
                        placeholder="01786XXXXXX"
                        error={errors.phone}
                    >
                        {errors?.phone && (
                            <p className="flex flex-col items-start justify-start gap-0.5 text-red-500">
                                {
                                    errors?.phone.map((mess, i) => (
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
                        label="পাসওয়ার্ড"
                        type="password"
                        maxLength={12}
                        minLength={4}
                        icon={<KeyRound className="w-4 h-4" />}
                        placeholder="********"
                        error={errors.password}
                    >
                        {errors?.password && (
                            <p className="flex flex-col items-start justify-start gap-0.5 text-red-500">
                                {
                                    errors?.password.map((mess, i) => (
                                        <small key={i}>
                                            {mess}
                                        </small>
                                    ))
                                }
                            </p>
                        )}
                    </FormControl>
                    <SubmitButton
                        loadingText="Loading..."
                        variant="primary"
                        className="w-full tracking-wider rounded-lg"
                    >
                        লগইন
                    </SubmitButton>
                </div>
            </form>
            <div className="w-3/4 mx-auto mt-5 mb-3 border-t-2 border-gray-300 dark:border-gray-600"></div>
            <p className="mb-2 text-base text-center">নতুন অ্যাকাউন্ট তৈরি করুন</p>
            <Link
                className={cn(
                    buttonVariants({ variant: "destructive" }),
                    "w-full font-semibold tracking-wider rounded-lg dark:bg-purple-500/75"
                )}
                href={`/register?redirectUrl=${redirectUrl}`}
            >
                রেজিস্টার
            </Link>
        </div>
    );
};

export default LoginForm;
