import { Skeleton } from '@/components/ui/skeleton';
import BarChartLoading from '../_components/BarChart/BarChartLoading';
import TotalCardLoading from '../_components/TotalCard/TotalCardLoading';
import RecentEnrollCardLoading from '../_components/RecentEnrollCard/RecentEnrollCardLoading';

const DashBoardHomePageLoading = () => {
    return (
        <div className='flex flex-col w-full'>
            <main className='flex flex-col flex-1 gap-4 p-4 md:gap-6 md:p-8'>
                <div className='grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3'>
                    <TotalCardLoading />
                    <TotalCardLoading />
                    <TotalCardLoading />
                    <TotalCardLoading />
                    <TotalCardLoading />
                    <TotalCardLoading />
                </div>
                <div className='grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-3'>
                    <div className='xl:col-span-2'>
                        <BarChartLoading />
                    </div>
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
                </div>
            </main>
        </div>
    );
};

export default DashBoardHomePageLoading;
