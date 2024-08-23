"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeletePackage from "./DeletePackage";

const ActionDropDown = ({ id }) => {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                    <Link className="w-full" href={`/dashboard/packages/${id}/edit`}>Edit</Link>
                </DropdownMenuItem>
                <DeletePackage id={id} onOpen={setOpen} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionDropDown;