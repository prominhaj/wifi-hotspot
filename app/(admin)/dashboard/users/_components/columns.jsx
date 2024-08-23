"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import DeleteAdmin from "../@adminusers/_components/DeleteAdmin";
import moment from "moment";
import { convertToUTCPlus6 } from "@/lib/convertData";
import { cn } from "@/lib/utils";
import ActionDropDown from "./ActionDropDown";

export const columns = [
    {
        accessorKey: "image",
        header: () => (
            <Button variant="ghost">
                Photo
            </Button>
        ),
        cell: ({ row }) => {
            const photo = row.original?.profilePhoto?.url;
            const name = row.original.name;

            return (
                <div className="ml-3">
                    <Avatar>
                        <AvatarImage className="object-cover" src={photo} alt={name} />
                        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </div>
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Phone <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
    },
    {
        accessorKey: "role",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Role <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const role = row.original.role;

            return (
                <div className="ml-4 capitalize">
                    <Badge className={cn(role === "admin" ? "bg-green-500" : "bg-blue-500", "text-white")}>
                        {role}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Created Date <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const updatedData = row.original.updatedAt;
            return (
                <div className="ml-4">
                    {moment(convertToUTCPlus6(updatedData)).format('MMM DD YYYY, h:mm:ss A')}
                </div>
            );
        },
    },
    {
        accessorKey: "Action",
        cell: ({ row }) => {
            const { id, role } = row.original;

            return (
                <>
                    {
                        role === "user" ? (
                            <ActionDropDown id={id} />
                        ) : (
                            <DeleteAdmin id={id} />
                        )
                    }
                </>
            );
        },
    },
];