"use client";
import { updateUserData } from "@/app/actions/user";
import AlertConfirm from "@/components/globals/AlertConfirm/AlertConfirm";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteAdmin = ({ id }) => {
    const [open, setOpen] = useState(false);

    const changeRoleInAdmin = async () => {
        try {
            const updated = await updateUserData(id, {
                role: "users"
            })
            if (updated?.success) {
                toast.success("Admin deleted successfully")
                setOpen(false)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <AlertConfirm
                button={<div className={cn(buttonVariants({ variant: "destructive", size: "sm" }))}>
                    <Trash2 className="w-4 h-4" />
                </div>}
                submitButton={<><Trash2 className="w-4 h-4" /> Delete</>}
                handleAction={changeRoleInAdmin}
                open={open}
                confirmMessage={`This action cannot be undone. This will delete by admin and role user from our servers.`}
                setOpen={setOpen}
            />
        </>
    );
};

export default DeleteAdmin;