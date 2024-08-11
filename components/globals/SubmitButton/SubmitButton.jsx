"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import Spinner from "../Loading/Spinner";

const SubmitButton = ({ className, variant, size, children }) => {
    const { pending } = useFormStatus;

    return (
        <Button type="submit" size={size} variant={variant} className={cn(className)}>
            {pending ? (
                <div className="flex items-center gap-1">
                    <Spinner size={size} /> Loading...
                </div>
            ) : children}
        </Button>
    );
};

export default SubmitButton;