"use client";
import { userPhotoDelete } from "@/app/actions/admin";
import AlertConfirm from "@/components/globals/AlertConfirm/AlertConfirm";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeletePhoto = ({ user }) => {
    const [open, setOpen] = useState(false);

    const handleDeletePhoto = async () => {
        try {
            const result = await userPhotoDelete(user?.id, user?.profilePhoto?.public_id);
            if (result?.success) {
                setOpen(false)
                toast.success(result.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <>
            <AlertConfirm
                button={<Trash2 className="w-5 h-5" />}
                submitButton={
                    <><Trash2 className="w-5 h-5" /> Delete</>
                }
                handleAction={handleDeletePhoto}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
};

export default DeletePhoto;