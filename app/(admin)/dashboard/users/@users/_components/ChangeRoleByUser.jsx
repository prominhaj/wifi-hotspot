"use client";

import { UserRoundCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateUserData } from "@/app/actions/user";
import AlertConfirm from "@/components/globals/AlertConfirm/AlertConfirm";

const ChangeRoleByUser = ({ id, onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const changeRoleToAdmin = async () => {
        try {
            const updatedRole = await updateUserData(id, {
                role: "admin"
            })
            if (updatedRole?.success) {
                toast.success("Role change to admin successfully")
                setIsOpen(false);
                onOpen(false);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <AlertConfirm
                button={<><UserRoundCheck className="w-4 h-4" /> Role Admin</>}
                submitButton={<>Change Role To Admin</>}
                confirmMessage={`This action cannot be undone. This will role change by admin from our servers.`}
                handleAction={changeRoleToAdmin}
                open={isOpen}
                setOpen={setIsOpen}
            />
        </>
    );
};

export default ChangeRoleByUser;