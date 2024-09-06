"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import DeleteAdmin from "../(users-page)/@adminusers/_components/DeleteAdmin";
import DiscountByUser from "./DiscountByUser/DiscountByUser";
import ChangeRoleByUser from "../(users-page)/@users/_components/ChangeRoleByUser";
import DeleteUser from "../(users-page)/@users/_components/DeleteUser";

const ActionDropDown = ({ id, role }) => {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DiscountByUser id={id} onOpen={setOpen} />
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