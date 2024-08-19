import { Button, buttonVariants } from "@/components/ui/button";
import { getSessionUser } from "@/lib/dal";
import { cn } from "@/lib/utils";
import { getRecentTransaction } from "@/queries/payment";
import Link from "next/link";
import RecentTransactionCard from "./RecentTransactionCard";

const RecentTransaction = async () => {
    const sessionUser = await getSessionUser();
    const recentTransaction = await getRecentTransaction(sessionUser?.id);

    if (!recentTransaction) return;


    return (
        <div className='pt-3 mt-4'>
            <div className="flex items-center justify-between gap-3 px-3">
                <h2 className='text-lg font-semibold'>Recent Transaction</h2>
                <Link className={cn(buttonVariants({ variant: "link" }), "text-center text-sm font-medium text-green-500")} href="/payment/history">
                    See All
                </Link>
            </div>
            <div className="pt-1">
                <RecentTransactionCard recentTransaction={recentTransaction} />
            </div>
        </div >
    );
};

export default RecentTransaction;