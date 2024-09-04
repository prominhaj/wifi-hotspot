"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { KeyRound, Phone, UserPen } from "lucide-react";

import FormControl from "@/components/globals/FormControl/FormControl";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { userValidation } from "@/lib/validations/user";
import { createAccount } from "@/app/actions/user";
import { useRouter } from "next/navigation";

const RegisterForm = ({ redirectUrl }) => {
    const [errors, setErrors] = useState({});
    const { push } = useRouter();

    const registerFormAction = async (formData) => {
        setErrors({});
        try {
            const signUp = await userValidation(formData);
            if (signUp.errors) {
                setErrors(signUp.errors);
                return;
            }
            if (signUp.success) {
                const result = await createAccount(signUp.data);
                if (result?.success) {
                    toast.success(result.message);
                    push(`/register/verify?id=${result?.user?._id}${redirectUrl ? `&redirectUrl=${redirectUrl}` : ''}`);
                } else {
                    setErrors({ phone: result?.phone ? [result?.message] : [] });
                    toast.error(result?.message || "Something went wrong");
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h4 className="text-xl font-semibold tracking-wider text-center">রেজিস্টার</h4>
            <form className="pt-5" action={registerFormAction}>
                <div className="space-y-4">
                    {[
                        { name: "name", label: "আপনার নাম", placeholder: "Shakibul Islam", icon: <UserPen className="w-4 h-4" />, error: errors?.name },
                        { name: "phone", label: "ফোন নাম্বার", type: "tel", maxLength: 11, minLength: 11, placeholder: "01786XXXXXX", icon: <Phone className="w-4 h-4" />, error: errors?.phone },
                        { name: "password", label: "পাসওয়ার্ড দিন", type: "password", maxLength: 12, minLength: 4, placeholder: "********", icon: <KeyRound className="w-4 h-4" />, error: errors?.password },
                        { name: "confirmPassword", label: "আবার পাসওয়ার্ড দিন", type: "password", maxLength: 12, minLength: 4, placeholder: "********", icon: <KeyRound className="w-4 h-4" />, error: errors?.confirmPassword }
                    ].map((field, idx) => (
                        <FormControl
                            key={idx}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            maxLength={field?.maxLength}
                            minLength={field?.minLength}
                            icon={field?.icon}
                            placeholder={field?.placeholder}
                            error={field?.error}
                        >
                            {field.error && (
                                <p className="flex flex-col items-start gap-0.5 text-red-500">
                                    {field.error.map((mess, i) => (
                                        <small key={i}>{mess}</small>
                                    ))}
                                </p>
                            )}
                        </FormControl>
                    ))}
                    <SubmitButton variant="primary" className="w-full tracking-wider rounded-lg">
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
