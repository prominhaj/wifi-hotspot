"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Spinner from "../Loading/Spinner";
import { useFormStatus } from "react-dom";


const MagicButton = ({ children, link, containerClass, className, size, href, loadingText, type, props }) => {
    const { pending } = useFormStatus();

    return (
        <>
            {
                link ? (
                    <Link
                        href={href}
                        target="_blank"
                        {...props}
                        className={cn(containerClass, "relative inline-flex h-10 overflow-hidden rounded-full p-[1px]")}
                    >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className={cn(className, "inline-flex items-center justify-center w-full h-full px-3 py-1 text-sm font-medium text-black rounded-full cursor-pointer dark:text-white bg-slate-50 dark:bg-slate-950 backdrop-blur-3xl")}>
                            {children}
                        </span>
                    </Link>
                ) : (
                    <button disabled={pending} type={type} {...props} className={cn(containerClass, "relative inline-flex h-10 overflow-hidden rounded-full p-[1px] disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-opacity-60")}>
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className={cn(className, "inline-flex items-center justify-center w-full h-full px-3 py-1 text-sm font-medium text-black rounded-full cursor-pointer dark:text-white bg-slate-50 dark:bg-slate-950 backdrop-blur-3xl gap-1")}>
                            {pending ? <>
                                <Spinner size={size === "sm" ? false : true} /> {loadingText && loadingText}
                            </> : children}
                        </span>
                    </button>
                )
            }
        </>
    );
};

export default MagicButton;