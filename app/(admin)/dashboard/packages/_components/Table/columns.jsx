"use client";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { calculateDiscountedPrice, convertToUTCPlus6 } from "@/lib/convertData";
import ActionDropDown from "../ActionDropdown";

export const columns = [
    {
        accessorKey: "packageName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Package Name <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const packageName = row.original.packageName;
            return (
                <div className="ml-4">
                    {packageName}
                </div>
            );
        }
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Price <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const price = row.original.price;
            const discountPercentage = row.original?.discountPercentage;
            const finalPrice = calculateDiscountedPrice(price, discountPercentage);

            return (
                <div className="ml-4">
                    TK <span className="line-through opacity-60">{price}</span> {
                        discountPercentage && (
                            <span className="text-sm font-medium">{finalPrice}</span>
                        )
                    }
                </div>
            );
        },
    },
    {
        accessorKey: "validity",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Validity <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const validity = row.original.validity;
            return (
                <div className="ml-4">
                    {validity} days
                </div>
            );
        },
    },
    {
        accessorKey: "desktopPrice",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Desktop Price <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const desktopPrice = row.original?.desktopPrice;
            const discountPercentage = row.original?.discountPercentage;
            const finalPrice = calculateDiscountedPrice(desktopPrice, discountPercentage);

            return (
                <div className="ml-4">
                    TK <span className="line-through opacity-60">{desktopPrice}</span> {
                        discountPercentage && (
                            <span className="text-sm font-medium">{finalPrice}</span>
                        )
                    }
                </div>
            );
        },
    },
    {
        accessorKey: "profileName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Profile Name <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const profileName = row.original.profileName;
            return (
                <div className="ml-4">
                    {profileName}
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
                    <ActionDropDown id={id} />
                </>
            );
        },
    },
];