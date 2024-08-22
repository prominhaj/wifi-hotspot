"use client";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SubmitButton from "../SubmitButton/SubmitButton";

const AlertConfirm = ({ button, submitButton, handleAction, open, setOpen, confirmMessage }) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="w-full gap-1 relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50 hover:bg-[#F3F4F6] dark:hover:bg-[#1F2937]">
                {button}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {confirmMessage}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={handleAction}>
                        <SubmitButton variant="destructive" className="flex items-center gap-1">
                            {submitButton}
                        </SubmitButton>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertConfirm;