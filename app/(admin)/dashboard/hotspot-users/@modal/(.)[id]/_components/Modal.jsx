"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import HotspotUserDetailsCard from "../../../[id]/_components/HotspotUserDetailsCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Modal = ({ hotspotUser }) => {
    const [isOpen, setIsOpen] = useState(true);
    const { back } = useRouter();

    const handleClose = () => {
        setIsOpen(false);
        back()
    };

    return (
        <Dialog defaultOpen={true} open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-full md:!max-w-6xl">
                <DialogHeader>
                    <DialogTitle>HotSpot User Details</DialogTitle>
                </DialogHeader>
                <HotspotUserDetailsCard hotspotUser={hotspotUser} />
            </DialogContent>
        </Dialog>
    );
};

export default Modal;