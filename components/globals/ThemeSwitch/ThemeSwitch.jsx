"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-5 h-5 rounded-full animate-pulse" />
        );
    }

    const currentTheme = theme === "system" ? resolvedTheme : theme;
    const icon = currentTheme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />;

    const handleToggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        }
        else if (theme === "dark") {
            setTheme("light");
        }
    };

    return (
        <button onClick={handleToggleTheme}>
            {icon}
        </button>
    );
};

export default ThemeSwitch;