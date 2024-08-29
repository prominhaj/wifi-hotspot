"use client";

import { updateUserData } from "@/app/actions/user";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const ProfileName = ({ sessionUser }) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = useCallback(() => {
        setIsEditing(!isEditing);
    }, [isEditing]);

    const updateNameAction = useCallback(async (formData) => {
        const name = formData.get('name');
        try {
            const update = await updateUserData(sessionUser?.id, { name });
            if (update?.success) {
                toast.success("Profile Update Successfully");
                setIsEditing(false);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [sessionUser?.id])

    return (
        <div className="mb-1.5">
            {
                isEditing ? (
                    <form action={updateNameAction} className="flex items-center justify-center w-2/3 gap-3 mx-auto">
                        <Input defaultValue={sessionUser?.name} name="name" type="text" placeholder="Md Shakibul" required />
                        <SubmitButton variant="default" className="px-1.5 py-0.5" size="sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </SubmitButton>
                    </form>
                ) : (
                    <div className="flex items-center justify-center gap-3">
                        <h4 className='text-lg font-semibold'>
                            {sessionUser?.name} {sessionUser?.role === "admin" && <>(Admin)</>}
                        </h4>
                        <button onClick={toggleEditing}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default ProfileName;