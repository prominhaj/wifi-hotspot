"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditForm from "../../../../_components/EditPage/EditForm";

const Modal = ({ editHotspotUser }) => {
    const [isOpen, setIsOpen] = useState(true);
    const { back } = useRouter();

    const handleClose = () => {
        setIsOpen(false);
        back();
    };

    return (
        <Dialog defaultOpen={true} open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Hotspot User</DialogTitle>
                </DialogHeader>
                {/* Hotspot User Form */}
                <EditForm editHotspotUser={editHotspotUser} />
            </DialogContent>
        </Dialog>
    );
};

export default Modal;