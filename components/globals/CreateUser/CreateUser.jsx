"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../SubmitButton/SubmitButton";
import { createNewUser } from "@/app/actions/mikrotik";
import { toast } from "sonner";

const CreateUser = () => {

    const handleCreateUser = async(formData) => {
        try {
            const result = await createNewUser(formData);
            if(result.success) {
                toast.success("User Create SuccessFull")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form action={handleCreateUser} className="border p-5 bello rounded max-w-sm w-full">
            <h2 className="font-semibold text-2xl test text-center">Create New User</h2>
            <div className="mt-3 space-y-2.5">
                <div className="flex flex-col gap-1">
                    <Label htmlFor="username">Username</Label>
                    <Input name="username" id="username" type="text" placeholder="Username" />
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" id="password" type="password" placeholder="Password" />
                </div>
                <SubmitButton size="sm" variant="destructive" className="w-full">
                    Submit
                </SubmitButton>
            </div>
        </form>
    );
};

export default CreateUser;
