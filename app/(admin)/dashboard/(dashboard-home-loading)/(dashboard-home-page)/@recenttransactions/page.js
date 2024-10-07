import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLastRecentTransaction } from '@/queries/payment';
import RecentTransactionCard from '../../../_components/RecentTransactionCard/RecentTransactionCard';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const DashboardRecentTransactions = async () => {
    const recentTransactions = await getLastRecentTransaction();
    return (
        <Card className='bg-background/20'>
            <CardHeader className='!p-4'>
                <div className='flex items-center justify-between'>
                    <CardTitle>Recent Payments</CardTitle>
                    <Link
                        className={cn(
                            buttonVariants({ variant: 'link' }),
                            'text-center !h-auto text-sm font-medium text-green-500'
                        )}
                        href='/dashboard/payment/history'
                    >
                        See All
                    </Link>
                </div>
            </CardHeader>
            <CardContent className='grid gap-3'>
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
