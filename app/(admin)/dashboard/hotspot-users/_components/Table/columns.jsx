"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { convertToUTCPlus6 } from "@/lib/convertData";
import { cn } from "@/lib/utils";
import DetailsButton from "../DetailsButton";
import UserEditButton from "../UserEditButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
        accessorKey: "paymentId.transactionId",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Transaction ID <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div className="ml-4">{row.original?.paymentId?.transactionId}</div>,
    },
    {
        accessorKey: "packageId.packageName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Package Name <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            return <div className="ml-4">{row.original?.packageId?.packageName}</div>
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
            const id = row.original?._id;
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
