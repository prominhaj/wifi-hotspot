import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/dal";
import { getRecentTransaction } from "@/queries/payment";

const RecentTransaction = async () => {
    const sessionUser = await getSessionUser();
    const recentTransaction = await getRecentTransaction(sessionUser?.id);

    if (!recentTransaction) return;

    return (
        <div className='p-3 mt-4 shadow bg-background dark:bg-black rounded-xl'>
            <h2 className='mb-3 text-lg font-semibold'>Recent Transaction</h2>
            <div className='flex items-center justify-between'>
                <div>
                    <h4 className='text-sm font-medium'>{recentTransaction?.packageId?.packageName}</h4>
                    <div className="flex items-center gap-1">
                        <p className='text-xs text-muted-foreground'>
                            {recentTransaction?.amount} TK | {recentTransaction?.packageId?.validity} DAYS
                        </p>
                        <div className='text-xs text-muted-foreground'>
                            {recentTransaction?.transactionId}
                        </div>
                    </div>
                </div>
                <Button size="sm" className="text-white bg-green-500">
                    Paid
                </Button>
            </div>
        </div>
    );
};

export default RecentTransaction;