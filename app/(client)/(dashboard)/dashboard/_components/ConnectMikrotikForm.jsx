"use client";

import { connectRouter } from "@/app/actions/mikrotik";
import FormControl from "@/components/globals/FormControl/FormControl";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { toast } from "sonner";

const ConnectMikrotikForm = () => {

    const mikrotikConnect = async (formData) => {
        const ip = formData.get('ip');
        const user = formData.get('user');
        const password = formData.get('password');
        const port = formData.get('port');

        try {
            const connect = await connectRouter({ ip, user, password, port });
            if (connect.success) {
                toast.success(connect.message);
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <form action={mikrotikConnect} className="mb-5">
            <FormControl name="ip" label="Mikrotik IP" type="text" />
            <FormControl name="user" label="Mikrotik User" type="text" />
            <FormControl name="password" label="Mikrotik Password" type="text" />
            <FormControl name="port" label="Mikrotik Port" type="text" />
            <SubmitButton className="w-full mt-3">
                Submit
            </SubmitButton>
        </form>
    );
};

export default ConnectMikrotikForm;