"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { convertToUTCPlus6, formatBytes } from "@/lib/convertData";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserEditButton from "../../../_components/UserEditButton";
import DetailsButton from "../../../_components/DetailsButton";

// Column definitions
export const columns = [
    {
        accessorKey: "username",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Username <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div className="ml-4">{row.original?.username}</div>,
    },
    {
        accessorKey: "userId.name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div className="ml-4">{row.original?.userId?.name}</div>,
    },
    {
        accessorKey: "userId.phone",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Phone <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div className="ml-4">{row.original?.userId?.phone}</div>,
    },
    {
        accessorKey: "bytes_in",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Upload <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const bytesIn = formatBytes(row.original?.bytes_in);
            return <div className="ml-4">{bytesIn}</div>
        },
    },
    {
        accessorKey: "bytes_out",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Download <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const bytesOut = formatBytes(row.original?.bytes_out);
            return <div className="ml-4">{bytesOut}</div>
        }
    },
    {
        accessorKey: "macAddress",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                MAC Address <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div className="ml-4">{row.original?.macAddress}</div>,
    },
    {
        accessorKey: "expiredAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Expired Date <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div className="ml-4 capitalize">{moment(convertToUTCPlus6(row.original?.expiredAt)).format('MMM DD YYYY, h:mm:ss A')}</div>,
    },
    {
        accessorKey: "Action",
        cell: ({ row }) => {
            const id = row.original?.id;
            return (
                <div className="flex items-center gap-1.5">
                    <DropdownMenu>
                        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                            <MoreHorizontal className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <UserEditButton id={id} />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <DetailsButton id={id} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
