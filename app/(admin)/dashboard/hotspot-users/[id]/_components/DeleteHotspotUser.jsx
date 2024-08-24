"use client";

import { deletePermanentlyHotspotUser } from "@/app/actions/hotspotUser";
import AlertConfirm from "@/components/globals/AlertConfirm/AlertConfirm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const DeleteHotspotUser = ({ id }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const deleteHotspotUser = async () => {
        try {
            const deleted = await deletePermanentlyHotspotUser(id);
            if (deleted?.success) {
                toast.success("Hotspot user deleted successfully");
                setOpen(false);
                router.push("/dashboard/hotspot-users");
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <AlertConfirm
                open={open}
                setOpen={setOpen}
                button={<span className={cn(buttonVariants({ variant: "destructive", size: "sm" }), "flex items-center gap-1")}><Trash2 className="w-4 h-4" /> Delete</span>}
                className="!w-24"
                confirmMessage="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                submitButton={<><Trash2 className="w-4 h-4" /> Delete</>}
                handleAction={deleteHotspotUser}
            />
        </>
    );
};

export default DeleteHotspotUser;