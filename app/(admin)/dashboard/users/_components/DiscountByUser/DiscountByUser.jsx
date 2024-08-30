"use client";
import { buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import DiscountForm from "./DiscountForm";
import { useState } from "react";

const DiscountByUser = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTrigger>
                <span className={cn("tracking-widest", buttonVariants({ variant: "default", size: "sm" }))}>
                    Add Discount
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Discount by User</DialogTitle>
                </DialogHeader>
                {/* Discount Form */}
                <DiscountForm onChangeOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
};

export default DiscountByUser;