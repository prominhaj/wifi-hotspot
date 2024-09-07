"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, BadgeCheck, BadgeX } from "lucide-react";
import moment from "moment";
import { cn } from "@/lib/utils";
import { convertToUTCPlus6 } from "@/lib/convertData";

export const columns = [
    {
        accessorKey: "userId.profilePhoto.url",
        header: () => (
            <Button variant="ghost">
                Photo
            </Button>
        ),
        cell: ({ row }) => {
            const photo = row.original?.userId?.profilePhoto?.url;
            const name = row.original?.userId?.name;

            return (
                <div className="ml-3">
                    <Avatar>
                        <AvatarImage className="object-cover" src={photo} alt={name} />
                        <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </div>
            );
        },
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
        cell: ({ row }) => {
            const name = row.original?.userId?.name;

            return (
                <div className="ml-3">
                    {name}
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
                Phone <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const phone = row.original?.userId.phone;

            return (
                <div className="ml-3">
                    {phone}
                </div>
            );
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
        cell: ({ row }) => {
            const macAddress = row.original?.macAddress;

            return (
                <div className="ml-3">
                    {macAddress}
                </div>
            );
        }
    },
    {
        accessorKey: "hotspotUserId.status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.original?.hotspotUserId?.status;

            return (
                <div className={cn(status === 'active' ? "text-green-500" : "text-red-500", "ml-8 capitalize")}>
                    {status === 'active' ? <BadgeCheck /> : <BadgeX />}
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
            const createdAt = row.original?.createdAt;
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
            const { id, userId } = row.original;

            return (
                <>

                </>
            );
        },
    },
];
