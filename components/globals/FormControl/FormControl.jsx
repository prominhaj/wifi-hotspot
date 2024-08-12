"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const FormControl = ({
    label,
    name,
    className,
    type = "text",
    required = false,
    placeHolder,
    icon,
    defaultValue,
    error,
    children,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => setShowPassword(!showPassword);
    const inputType = showPassword ? "text" : type;

    return (
        <div>
            <Label className="flex items-center text-base w-full cursor-pointer gap-1.5 mb-2" htmlFor={name}>
                {icon}
                {label}
            </Label>
            <div className="relative">
                <Input
                    className={cn(className, error && "border-red-500", "text-base")}
                    type={inputType}
                    id={name}
                    name={name}
                    required={required}
                    placeHolder={placeHolder}
                    defaultValue={defaultValue || ""}
                    {...props}
                />
                {type === "password" && (
                    <button className="absolute top-2 right-2" type="button" onClick={handleTogglePassword}>
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

export default FormControl;