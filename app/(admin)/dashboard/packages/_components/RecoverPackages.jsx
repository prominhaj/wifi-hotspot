"use client";

import { recoverPackageInDB } from "@/app/actions/package";
import AlertConfirm from "@/components/globals/AlertConfirm/AlertConfirm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const RecoverPackages = () => {
    const [open, setOpen] = useState(false);

    const handleRecoverPackages = async () => {
        try {

            const result = await recoverPackageInDB();
            console.log(result);

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <AlertConfirm
                className="!p-0"
                handleAction={handleRecoverPackages}
                button={<span className={cn(buttonVariants({ variant: "destructive", size: "sm" }))}>Recover Packages</span>}
                submitButton={"Confirm"}
                confirmMessage={"Recover all packages by database"}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
};

export default RecoverPackages;