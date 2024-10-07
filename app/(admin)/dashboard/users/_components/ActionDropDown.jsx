"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import DeleteAdmin from "../(users-page)/@adminusers/_components/DeleteAdmin";
import DiscountByUser from "./DiscountByUser/DiscountByUser";
import ChangeRoleByUser from "../(users-page)/@users/_components/ChangeRoleByUser";
import DeleteUser from "../(users-page)/@users/_components/DeleteUser";
import Link from "next/link";

const ActionDropDown = ({ id, role, discount }) => {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Link className="w-full gap-1 relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50 hover:bg-[#F3F4F6] dark:hover:bg-[#1F2937]" href={`/dashboard/users/${id}/edit`}>
                    <Edit className="w-4 h-4" /> Edit
                </Link>
                <DiscountByUser id={id} onOpen={setOpen} discount={discount} />
                {
                    role === "user" ? (
                        <>
                            <ChangeRoleByUser id={id} onOpen={setOpen} />
                            <DeleteUser id={id} onOpen={setOpen} />
                        </>
                    ) : (
                        <DeleteAdmin id={id} onOpen={setOpen} />
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionDropDown;