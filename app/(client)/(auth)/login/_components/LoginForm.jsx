"use client";

import FormControl from "@/components/globals/FormControl/FormControl";
import { KeyRound, Phone } from "lucide-react";

const LoginForm = () => {
    return (
        <div>
            <h4 className="text-xl font-[600] tracking-wider text-center">লগইন</h4>
            <form className="pt-5" action="">
                <div className="space-y-4">
                    <FormControl
                        name="phone"
                        label="Phone"
                        type="tel"
                        maxLength={11}
                        minLength={11}
                        pattern="\d{11}"
                        title="Please enter a valid 11-digit phone number."
                        icon={<Phone className="w-4 h-4" />}
                        placeHolder="01786XXXXXX"
                    />
                    <FormControl
                        name="password"
                        label="Password"
                        type="password"
                        maxLength={12}
                        minLength={4}
                        icon={<KeyRound className="w-4 h-4" />}
                        placeHolder="********"
                    />
                </div>
            </form>
        </div>
    )
};

export default LoginForm;