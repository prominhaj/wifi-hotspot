"use client";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import { useFormStatus } from "react-dom";

const RefreshBtn = () => {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} className={cn(pending && "animate-spin", "text-foreground")}>
            <RefreshCcw />
        </button>
    );
};

export default RefreshBtn;