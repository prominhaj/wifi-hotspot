"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import ChangeRoleByUser from "../@users/_components/ChangeRoleByUser";
import { useState } from "react";
import DeleteUser from "../@users/_components/DeleteUser";

const ActionDropDown = ({ id }) => {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <ChangeRoleByUser id={id} onOpen={setOpen} />
                <DeleteUser id={id} onOpen={setOpen} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionDropDown;