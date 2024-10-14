"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import PaymentHistoryCard from "./PaymentHistoryCard"

const PaymentHistoryContent = ({ transactions }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("date")
    const [sortOrder, setSortOrder] = useState("desc")

    const filteredTransactions = useMemo(() => {
        return transactions
            .filter(
                (transaction) =>
                    transaction?.transactionId?.includes(searchTerm) ||
                    transaction?.amount?.toString().includes(searchTerm) ||
                    transaction?.paymentId?.toLowerCase().includes(searchTerm) ||
                    transaction?.status?.toLowerCase().includes(searchTerm),
            )
            .sort((a, b) => {
                switch (sortBy) {
                    case "date":
                        return sortOrder === "asc"
                            ? new Date(a?.createdAt) - new Date(b?.createdAt)
                            : new Date(b?.createdAt) - new Date(a?.createdAt)
                    case "amount":
                        return sortOrder === "asc" ? parseFloat(a?.amount) - parseFloat(b?.amount) : parseFloat(b?.amount) - parseFloat(a?.amount)
                    case "method":
                        return sortOrder === "asc" ? a?.paymentId?.localeCompare(b?.paymentId) : b?.paymentId?.localeCompare(a?.paymentId)
                    default:
                        return 0
                }
            })
    }, [transactions, searchTerm, sortBy, sortOrder])

    return (
        <div className="z-20 flex flex-col">
            <header className="p-4 bg-background">
                <h1 className="text-2xl font-bold">Payment History</h1>
            </header>
            <div className="flex-1 p-4 overflow-auto">
                <div className="mb-4">
                    <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="flex justify-end mb-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <ListOrderedIcon className="w-4 h-4" />
                                Sort by: {sortBy}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="method">Payment Method</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                                <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="grid gap-4">
                    {
                        filteredTransactions.length > 0 ? (
                            filteredTransactions?.map((transaction) => (
                                <PaymentHistoryCard transaction={transaction} key={transaction?.id} />
                            ))
                        ) : (
                            <h4 className="text-center text-muted-foreground ">
                                No Results
                            </h4>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

function ListOrderedIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="10" x2="21" y1="6" y2="6" />
            <line x1="10" x2="21" y1="12" y2="12" />
            <line x1="10" x2="21" y1="18" y2="18" />
            <path d="M4 6h1v4" />
            <path d="M4 10h2" />
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
        </svg>
    )
}

export default PaymentHistoryContent;
