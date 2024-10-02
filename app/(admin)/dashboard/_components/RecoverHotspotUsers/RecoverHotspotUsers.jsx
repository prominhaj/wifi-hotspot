"use client";
import { recoverHotspotUsers } from "@/app/actions/hotspotUser";
import AlertConfirm from "@/components/globals/AlertConfirm/AlertConfirm";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const RecoverHotspotUsers = () => {
    const [open, setOpen] = useState(false);

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
        <div>
            <AlertConfirm
                className="!p-0"
                handleAction={handleRecoverHotspotUsers}
                button={<span className={cn(buttonVariants({ variant: "destructive", size: "sm" }))}>Recover Hotspot Users</span>}
                submitButton={"Confirm"}
                confirmMessage={"Recover all active hotspot users by database"}
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
};

export default RecoverHotspotUsers;