import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { convertToUTCPlus6 } from "@/lib/convertData";
import { cn } from "@/lib/utils";
import moment from "moment";

const RecentTransactionCard = ({ recentTransaction }) => {

    return (
        <Card className='px-3 py-2 mx-3 space-y-1.5 dark:bg-dark-card-bg bg-light-card-bg'>
            <div className="flex items-center justify-between">
                <p>
                    <small>
                        {moment(convertToUTCPlus6(recentTransaction?.createdAt)).format('MMM DD YYYY, h:mm:ss A')}
                    </small>
                </p>
                <Badge
                    className={cn(recentTransaction?.status === "paid" && "bg-green-500", recentTransaction?.status === "pending" && "bg-red-500", recentTransaction?.status === "refund" && "bg-indigo-500", "capitalize text-white")}
                >
                    {recentTransaction?.status}
                </Badge>
            </div>
            <div className="flex items-center justify-between">
                <h4 className='text-base font-medium'>{recentTransaction?.packageId?.packageName}</h4>
                <p className='text-sm text-muted-foreground'>
                    {recentTransaction?.amount} TK | {recentTransaction?.packageId?.validity} DAYS
                </p>
                <p className="text-sm text-muted-foreground">
                    {recentTransaction?.transactionId}
                </p>
            </div>
        </Card>
    );
};

export default RecentTransactionCard;