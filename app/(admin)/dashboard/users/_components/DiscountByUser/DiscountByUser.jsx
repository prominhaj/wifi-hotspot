"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DiscountForm from "./DiscountForm";
import { useState } from "react";
import { Percent } from "lucide-react";

const DiscountByUser = ({ id, onOpen, discount }) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTrigger>
                <span className="w-full gap-1 relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50 hover:bg-[#F3F4F6] dark:hover:bg-[#1F2937]">
                    <Percent className="w-4 h-4" />  Add Discount
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Discount by User</DialogTitle>
                </DialogHeader>
                {/* Discount Form */}
                <DiscountForm onChangeOpen={setOpen} id={id} onOpen={onOpen} discount={discount} />
            </DialogContent>
        </Dialog>
    );
};

export default DiscountByUser;