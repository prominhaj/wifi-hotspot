"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import HotspotUserDetailsCard from "../../../[id]/_components/HotspotUserDetailsCard";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Modal = ({ hotspotUser }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
    const sizeRef = useRef({ width: 0, height: 0 });
    const { back } = useRouter();

    const handleClose = () => {
        setIsOpen(false);
        back()
    };

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Update the screen size
            setScreenSize({ width, height });
            sizeRef.current = { width, height };

            // Reload the page if the width is 770px or less
            if (width <= 770) {
                window.location.reload();
            }
        };

        // Initial size update
        updateSize();

        // Add resize event listener
        window.addEventListener('resize', updateSize);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

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