"use client";

import { deleteProfileInMikrotik } from "@/app/actions/mikrotik";
import { deletePackageById, getPackageByIdInAction } from "@/app/actions/package";
import AlertConfirm from "@/components/globals/AlertConfirm/AlertConfirm";;
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeletePackage = ({ onOpen, id }) => {
    const [open, setOpen] = useState(false);


    const deletePackageAction = async () => {
        const getPackage = await getPackageByIdInAction(id);
        try {
            const deleteHotspotProfile = await deleteProfileInMikrotik(getPackage?.hotspotProfileId);
            if (deleteHotspotProfile?.success) {
                const packageDelete = await deletePackageById(id);
                if (packageDelete?.success) {
                    toast.success("Package deleted successfully");
                    onOpen(false);
                    setOpen(false);
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <AlertConfirm
            button={<span className="flex items-center gap-1 text-red-500"><Trash2 className="w-4 h-4" />Delete</span>}
            submitButton={<><Trash2 className="w-4 h-4" /> Delete</>}
            handleAction={deletePackageAction}
            open={open}
            confirmMessage={`This action cannot be undone. This will permanently delete your account and remove your data from our servers.`}
            setOpen={setOpen}
        />
    );
};

export default DeletePackage;