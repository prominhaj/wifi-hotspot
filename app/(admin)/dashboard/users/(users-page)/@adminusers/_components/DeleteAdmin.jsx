"use client";
import { updateUserData } from "@/app/actions/user";
import AlertConfirm from "@/components/globals/AlertConfirm/AlertConfirm";
import { cn } from "@/lib/utils";
import { UserRoundMinus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteAdmin = ({ id, onOpen }) => {
    const [open, setOpen] = useState(false);

    const changeRoleInAdmin = async () => {
        try {
            const updated = await updateUserData(id, {
                role: "users"
            })
            if (updated?.success) {
                toast.success("Admin deleted successfully")
                setOpen(false)
                onOpen(false);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <AlertConfirm
                button={<div className={cn("flex items-center gap-1")}>
                    <UserRoundMinus className="w-4 h-4" /> Role User
                </div>}
                submitButton={<><UserRoundMinus className="w-4 h-4" />  Change Role User</>}
                handleAction={changeRoleInAdmin}
                open={open}
                confirmMessage={`This action cannot be undone. This will delete by admin and role user from our servers.`}
                setOpen={setOpen}
            />
        </>
    );
};

export default DeleteAdmin;