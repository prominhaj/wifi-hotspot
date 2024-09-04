import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PaymentHistoryCard = ({ transaction }) => {
    return (
        <Card>
            <CardContent className="flex items-center justify-between gap-4 p-5">
                <div>
                    <h6 className="text-sm text-muted-foreground">
                        {new Date(transaction?.createdAt)?.toLocaleDateString()}
                    </h6>
                    <h4 className="font-medium">BDT {parseFloat(transaction?.amount)?.toFixed(2)}</h4>
                    <h6 className="text-sm text-muted-foreground">
                        TxID: {transaction?.transactionId}
                    </h6>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Badge
                        className={cn(transaction?.status === "paid" && "bg-green-500", transaction?.status === "pending" && "bg-red-500", transaction?.status === "refund" && "bg-indigo-500", "text-white capitalize")}
                    >
                        {transaction?.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                        View
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default PaymentHistoryCard;