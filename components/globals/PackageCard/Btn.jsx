"use client";
import { useFormStatus } from "react-dom";
import Spinner from "../Loading/Spinner";
import { cn } from "@/lib/utils";

const Btn = ({ disabled, isConnected }) => {
    const { pending } = useFormStatus();
    const isAnimated = !pending && !disabled && isConnected;

    return (
        <button
            type="submit"
            disabled={disabled || !isConnected || pending}
            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-[1px] transition-all duration-300 hover:from-blue-600 hover:to-purple-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 tracking-wider"
        >
            <span className="absolute inset-0 flex items-center justify-center">
                <span className={cn(isAnimated && "animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg_80deg,white_80deg_180deg,transparent_180deg_360deg)]", "h-full w-full rounded-xl")} />
            </span>
            <span className="relative flex items-center justify-center w-full px-4 py-1.5 text-base font-medium dark:text-white text-black transition-all duration-300 rounded-xl bg-slate-50 dark:bg-slate-950 group-hover:bg-opacity-90">
                {pending ? (
                    <Spinner size={true} />
                ) : !isConnected ? "Router Offline" : disabled ? "Already Buy" : "Buy"}
            </span>
        </button>
    );
};

export default Btn;