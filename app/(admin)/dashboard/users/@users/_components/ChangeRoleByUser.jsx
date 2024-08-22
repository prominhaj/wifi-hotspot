"use client";

import { UserRoundCheck } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
import { toast } from "sonner";
import { updateUserData } from "@/app/actions/user";

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
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger className="w-full gap-1 relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50 hover:bg-[#F3F4F6] dark:hover:bg-[#1F2937]">
                    <UserRoundCheck className="w-4 h-4" /> Role Admin
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will role change by admin from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form action={changeRoleToAdmin}>
                            <SubmitButton>
                                Change Role To Admin
                            </SubmitButton>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default ChangeRoleByUser;