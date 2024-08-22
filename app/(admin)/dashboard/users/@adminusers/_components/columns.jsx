"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns = [
    {
        accessorKey: "image",
        header: () => (
            <Button variant="ghost">
                Photo
            </Button>
        ),
        cell: ({ row }) => {
            const photo = row.original.profilePhoto.url;
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
                    <Badge className="text-white bg-green-500">
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
            const updatedData = new Date(row.original.updatedAt).toLocaleDateString();
            return (
                <div className="ml-4">
                    {updatedData}
                </div>
            );
        },
    },
    {
        accessorKey: "Action",
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert(`Details for ${id}`)}>
                            Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Delete ${id}`)}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
