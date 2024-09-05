"use client";
import { recoverHotspotUsers } from "@/app/actions/hotspotUser";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { useCallback } from "react";
import { toast } from "sonner";

const RecoverHotspotUsers = () => {

    const handleRecoverHotspotUsers = useCallback(async () => {
        try {
            const result = await recoverHotspotUsers();
            if (result?.success) {
                toast.success(result?.message)
            } else {
                toast.error(result?.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [])

    return (
        <form action={handleRecoverHotspotUsers}>
            <SubmitButton loadingText="Recovering..." variant="destructive" size="sm">
                Recover Hotspot Users
            </SubmitButton>
        </form>
    );
};

export default RecoverHotspotUsers;