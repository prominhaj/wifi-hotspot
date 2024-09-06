"use client";
import { deleteUserById } from "@/app/actions/user";
import AlertConfirm from "@/components/globals/AlertConfirm/AlertConfirm";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteUser = ({ id, onOpen }) => {
    const [open, setOpen] = useState(false);

    const deleteUserAction = async () => {
        try {
            const deleteUser = await deleteUserById(id);
            if (deleteUser?.success) {
                toast.success("User deleted successfully");
                onOpen(false);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <AlertConfirm
                button={<span className="flex items-center gap-1 text-red-500"><Trash2 className="w-4 h-4" />Delete</span>}
                submitButton={<><Trash2 className="w-4 h-4" /> Delete</>}
                handleAction={deleteUserAction}
                open={open}
                confirmMessage={`This action cannot be undone. This will permanently delete your account and remove your data from our servers.`}
                setOpen={setOpen}
            />
        </>
    );
};

export default DeleteUser;