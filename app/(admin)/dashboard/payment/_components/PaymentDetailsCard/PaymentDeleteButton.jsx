"use client";

import { deletePaymentHistoryById } from "@/app/actions/payment";
import AlertConfirm from "@/components/globals/AlertConfirm/AlertConfirm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const PaymentDeleteButton = ({ id }) => {
    const [open, setOpen] = useState(false);
    const { push } = useRouter();

    const handleAction = async () => {
        try {
            const deleted = await deletePaymentHistoryById(id);
            if (deleted?.success) {
                toast.success(deleted.message);
                setOpen(false);
                push("/dashboard/payment/history")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <AlertConfirm
                open={open}
                setOpen={setOpen}
                handleAction={handleAction}
                className="!w-24 hover:!bg-transparent focus:!bg-transparent"
                button={<span className={cn(buttonVariants({ variant: "destructive", size: "sm" }), "flex items-center justify-center w-full gap-1")}><Trash2 className="w-4 h-4" /> Delete</span>}
                submitButton={<span className={cn("flex items-center justify-center gap-1")}><Trash2 className="w-4 h-4" /> Delete</span>}
                confirmMessage="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            />
        </>
    );
};

export default PaymentDeleteButton;