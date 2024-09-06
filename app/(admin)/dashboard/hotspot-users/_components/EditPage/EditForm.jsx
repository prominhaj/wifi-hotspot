"use client";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import FormControl from "./FormControl";
import { useCallback } from "react";
import { toast } from "sonner";
import { updateHotspotUserById } from "@/app/actions/hotspotUser";

const EditForm = ({ editHotspotUser }) => {

    const handleUpdateHotspotUser = useCallback(async (formData) => {
        const username = formData.get('username');
        const password = formData.get('password');
        const macAddress = formData.get('mac-address');

        if (!username || !password || !macAddress) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const updatedInfo = {
                username,
                password,
                macAddress
            }
            const result = await updateHotspotUserById(editHotspotUser?.id, editHotspotUser?.hotspotUserId, updatedInfo);
            if (result.success) {
                toast.success("Hotspot user updated successfully");
            } else {
                toast.error("Failed to update hotspot user");
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [editHotspotUser?.hotspotUserId, editHotspotUser?.id])

    return (
        <form action={handleUpdateHotspotUser} className="grid grid-cols-1 gap-3">
            <FormControl defaultValue={editHotspotUser?.username} name="username">
                Username
            </FormControl>
            <FormControl defaultValue={editHotspotUser?.password} name="password">
                Password
            </FormControl>
            <FormControl defaultValue={editHotspotUser?.macAddress} name="mac-address">
                Mac Address
            </FormControl>
            <SubmitButton className="mt-1.5" variant="primary" size="sm">
                Update Details
            </SubmitButton>
        </form>
    );
};

export default EditForm;