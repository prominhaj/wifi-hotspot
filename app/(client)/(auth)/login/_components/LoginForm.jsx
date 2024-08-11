"use client";

import FormControl from "@/components/globals/FormControl/FormControl";

const LoginForm = () => {
    return (
        <div>
            <h4 className="text-xl font-[600] tracking-wider text-center">লগইন</h4>
            <form action="">
                <div>
                    <FormControl label="Phone" />
                </div>
            </form>
        </div>
    );
};

export default LoginForm;