"use client";
import moment from "moment";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { convertToUTCPlus6 } from "@/lib/convertData";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const columns = [
    {
        accessorKey: "userId.name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                User Name <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const userName = row.original.userId?.name;
            return (
                <div className="ml-4">
                    {userName}
                </div>
            );
        }
    },
    {
        accessorKey: "userId.phone",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Phone Number <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const phone = row.original.userId?.phone;
            return (
                <div className="ml-4">
                    {phone}
                </div>
            );
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Amount <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const amount = row.original.amount;
            return (
                <div className="ml-4">
                    TK {amount}
                </div>
            );
        },
    },
    {
        accessorKey: "transactionId",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Transaction ID <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const transactionId = row.original.transactionId;
            return (
                <div className="ml-4">
                    {transactionId}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <div className="ml-4 capitalize">
                    <Badge className={cn(status === "paid" && "bg-green-500", status === "pending" && "bg-red-500", status === "refund" && "bg-indigo-500", "text-white")}>{status}</Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Created Date <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            return (
                <div className="ml-4">
                    {moment(convertToUTCPlus6(createdAt)).format('MMM DD YYYY, h:mm:ss A')}
                </div>
            );
        },
    },
    {
        accessorKey: "Action",
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <>
                    <Link className={cn(buttonVariants({ variant: "ghost" }))} href={`/dashboard/payment/history/${id}`}>
                        Details
                    </Link>
                </>
            );
        },
    },
];
