"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
    const pathname = usePathname();
    return (
        <Link
            className={cn(item?.path === pathname && "font-semibold absolute before:w-full before:h-1 before:z-10 before:bg-green-500 before:top-0 before:left-0 before:right-0", "flex flex-col relative items-center w-full")}
            href={item.path}
            key={item.name}
        >
            <span className={cn(item?.path === pathname && "text-green-500", "pt-2")}>{item.icon}</span>
            <span className="pb-2 text-primary">{item.name}</span>
        </Link>
    );
};

export default NavLink;