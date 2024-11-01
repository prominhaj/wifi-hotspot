"use client";
import { redirectPath } from "@/app/actions";
import { loginUser } from "@/app/actions/auth";
import { getUserByPhone } from "@/app/actions/user";
import FormControl from "@/components/globals/FormControl/FormControl";
import Spinner from "@/components/globals/Loading/Spinner";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX, KeyRound, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LoginForm = ({ redirectUrl }) => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState("");
    const [isValid, setIsValid] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const validatePhone = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/phone/isValid?phone=${phone}`
                );
                const { isValid } = await response.json();
                if (isValid) {
                    setErrors({ ...errors, phone: null })
                }
                setIsValid(isValid);
            } catch (error) {
                console.error("Phone validation failed:", error);
            }
        };

        if (phone.length === 11) {
            validatePhone();
        } else {
            setIsValid(null);
        }
    }, [phone]);

    const handleUserLogin = async (formData) => {
        setLoading(true)
        setErrors({});
        const phone = formData.get("phone");
        const password = formData.get("password");

        if (!phone || !password) {
            setErrors({
                phone: !phone ? ["Please enter a phone number"] : [],
                password: !password ? ["Password is required"] : [],
            });
            setLoading(false)
            return;
        }

        try {
            const user = await getUserByPhone(phone);
            const result = await loginUser(phone, password);

            if (result?.success) {
                toast.success(result.message);
                await redirectPath(
                    !result.user.profilePhoto?.url
                        ? `/upload-image`
                        : result.user.role === "admin"
                            ? "/dashboard"
                            : redirectUrl || "/"
                );
                return;
            } else {
                handleErrors(result, user);
            }
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false)
        }
    };

    const handleErrors = (result, user) => {
        setErrors({
            phone: result.phone ? [result.message] : [],
            password: result.password ? [result.message] : [],
        });

        if (result.verified) {
            router.push(`/register/verify?id=${user?.id}`);
        }
        toast.error(result.message);
    };

    return (
        <div>
            <h4 className="text-xl font-semibold tracking-wider text-center">লগইন</h4>
            <form className="pt-5" onSubmit={(e) => { e.preventDefault(); handleUserLogin(new FormData(e.target)); }}>
                <div className="space-y-4">
                    <div className="relative">
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
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors?.phone && (
                            <p className="text-red-500">
                                {errors.phone.map((mess, i) => (
                                    <small key={i}>{mess}</small>
                                ))}
                            </p>
                        )}
                        <span className="absolute right-2 top-10">
                            {phone.length === 11 && (isValid === null ? (
                                <Spinner />
                            ) : isValid ? (
                                <CircleCheck className="w-5 h-5 text-green-500" />
                            ) : (
                                <p className="text-red-500">
                                    <CircleX className="w-5 h-5" />
                                </p>
                            ))}
                        </span>
                    </div>
                    <FormControl
                        name="password"
                        label="পাসওয়ার্ড"
                        type="password"
                        maxLength={12}
                        minLength={4}
                        icon={<KeyRound className="w-4 h-4" />}
                        placeholder="********"
                        error={errors.password}
                    />
                    <SubmitButton
                        loading={loading}
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
