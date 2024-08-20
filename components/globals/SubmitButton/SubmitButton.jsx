"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import Spinner from "../Loading/Spinner";

const SubmitButton = ({ className, variant, size, loading, children, disabled }) => {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending || loading || disabled}
            size={size}
            variant={variant}
            className={cn(className, "text-center")}>
            {pending || loading ? (
                <Spinner size={size === "sm" ? false : true} />
            ) : children}
        </Button>
    );
};

export default SubmitButton;