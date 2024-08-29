"use client";

import { updateHotspotUsersMacAddress } from "@/app/actions/admin";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { useCallback } from "react";
import { toast } from "sonner";

const UpdateHotspotMacAddress = () => {

    const handleUpdateHotspotUsersMacAddress = useCallback(async () => {
        try {
            const updated = await updateHotspotUsersMacAddress();
            if (updated?.success) {
                toast.success(updated?.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [])

    return (
        <form action={handleUpdateHotspotUsersMacAddress}>
            <SubmitButton size="sm" loadingText="Updating...">
                Update MAC Address
            </SubmitButton>
        </form>
    );
};

export default UpdateHotspotMacAddress;