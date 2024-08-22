import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLastRecentTransaction } from '@/queries/payment';
import RecentTransactionCard from '../../../_components/RecentTransactionCard/RecentTransactionCard';

const DashboardRecentTransactions = async () => {
    const recentTransactions = await getLastRecentTransaction();

    return (
        <Card className='bg-background/20'>
            <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-5 md:gap-8'>
                {recentTransactions?.length === 0 ? (
                    <p className='text-lg font-medium text-center text-muted-foreground'>
                        No Recent Payments Course
                    </p>
                ) : (
                    recentTransactions?.map((payment) => (
                        <RecentTransactionCard key={payment.id} payment={payment} />
                    ))
                )}
            </CardContent>
        </Card>
    );
};

export default DashboardRecentTransactions;
