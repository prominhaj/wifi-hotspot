"use client";
import { updateUserData } from "@/app/actions/user";
import SubmitButton from "@/components/globals/SubmitButton/SubmitButton";
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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const DeleteAdmin = ({ id }) => {

    const changeRoleInAdmin = async () => {
        try {
            const updated = await updateUserData(id, {
                role: "users"
            })
            if (updated?.success) {
                toast.success("Admin deleted successfully")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button size="sm" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will delete by admin and role user from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={changeRoleInAdmin}>
                        <SubmitButton variant="destructive" className="flex items-center gap-1">
                            <Trash2 className="w-4 h-4" /> Delete
                        </SubmitButton>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAdmin;