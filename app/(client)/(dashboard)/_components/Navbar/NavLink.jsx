"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
    const pathname = usePathname();
    return (
        <Link
            className={`${item.path === pathname ? "text-white dark:bg-purple-500 bg-blue-500" : "text-light-text dark:text-dark-text"} bg-light-bg hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover dark:bg-dark-bg p-2.5 rounded-full`}
            href={item.path}
            key={item.name}
        >
            <span>{item.icon}</span>
        </Link>
    );
};

export default NavLink;