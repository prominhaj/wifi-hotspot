import { Skeleton } from '@/components/ui/skeleton';
import RecentEnrollCardLoading from '../../../_components/RecentTransactionCard/RecentTransactionCardLoading';

const DashboardRecentTransactionsLoading = () => {
    return (
        <div className='p-6 pb-2 space-y-0 border shadow rounded-xl bg-card/20 text-card-foreground'>
            <Skeleton className='w-1/3 h-6 rounded' />
            <div className='grid grid-cols-1 gap-5 pt-5 md:gap-8'>
                <RecentEnrollCardLoading />
                <RecentEnrollCardLoading />
                <RecentEnrollCardLoading />
                <RecentEnrollCardLoading />
                <RecentEnrollCardLoading />
                <RecentEnrollCardLoading />
            </div>
        </div>
    );
};

export default DashboardRecentTransactionsLoading;
