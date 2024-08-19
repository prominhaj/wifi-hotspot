import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const RecentTransactionCard = ({ recentTransaction }) => {
    return (
        <Card className='flex items-center justify-between px-3 py-2 mx-3 dark:bg-dark-card-bg bg-light-card-bg'>
            <h4 className='text-sm font-medium'>{recentTransaction?.packageId?.packageName}</h4>
            <p className='text-sm text-muted-foreground'>
                {recentTransaction?.amount} TK | {recentTransaction?.packageId?.validity} DAYS
            </p>
            <Button
                size="sm"
                className={cn(recentTransaction?.status === "paid" ? "bg-green-500" : "bg-red-500", "text-white capitalize h-6")}
            >
                {recentTransaction?.status}
            </Button>
        </Card>
    );
};

export default RecentTransactionCard;