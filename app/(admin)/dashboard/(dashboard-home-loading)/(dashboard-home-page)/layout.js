import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingDown, TrendingUp, Users, WifiOff } from 'lucide-react';
import { getSessionUser } from '@/lib/dal';
import { calculateSales, getMonthlyReport } from '@/queries/admin';
import { cn } from '@/lib/utils';
import TotalCard from '../../_components/TotalCard/TotalCard';
import DashboardBarChart from '../../_components/BarChart/BarChart';

const DashboardHomePageLayout = async ({ children, activeusers, hotspotusers, totalusers }) => {
    const user = await getSessionUser();
    const reports = await getMonthlyReport();
    const { totalSales, lastMonthSales, thisMonthSales, percentChange } = await calculateSales();

    return (
        <div className='flex flex-col w-full'>
            <main className='flex flex-col flex-1 gap-4 p-4 md:gap-6 md:p-8'>
                <div className='grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3'>
                    {/* Monthly Sales*/}
                    <TotalCard
                        title={
                            <p className='flex items-center gap-3'>
                                Monthly Sales
                                <small
                                    className={cn(
                                        percentChange < 0 ? 'text-red-500' : 'text-green-500',
                                        'flex items-center gap-1'
                                    )}
                                >
                                    {percentChange < 0 ? <TrendingDown /> : <TrendingUp />}
                                    {percentChange} %
                                </small>
                            </p>
                        }
                        count={`BDT ${thisMonthSales}`}
                        icon={<DollarSign className='w-4 h-4 text-muted-foreground' />}
                    />
                    {/* Last Month Sales */}
                    <TotalCard
                        title='Last Month Sales'
                        count={`BDT ${lastMonthSales}`}
                        icon={<DollarSign className='w-4 h-4 text-muted-foreground' />}
                    />
                    {/* Total Sales */}
                    <TotalCard
                        title='Total Sales'
                        count={`BDT ${totalSales}`}
                        icon={<DollarSign className='w-4 h-4 text-muted-foreground' />}
                    />
                    {/* active users */}
                    {activeusers}
                    {/* hotspot users */}
                    {hotspotusers}
                    {/* total users */}
                    {totalusers}
                </div>
                <div className='grid grid-cols-1 gap-4 md:gap-8 xl:grid-cols-3'>
                    <Card className='xl:col-span-2 bg-background/20'>
                        <CardHeader className='flex flex-row items-center'>
                            <CardTitle>Monthly Sales Charts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DashboardBarChart chartData={reports} />
                        </CardContent>
                    </Card>
                    <Card className='bg-background/20'>
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                        </CardHeader>
                        <CardContent className='grid gap-5 md:gap-8'>
                            {/* {recentEnrollments?.length === 0 ? (
                        <p className='text-lg font-medium text-center text-muted-foreground'>
                            No Recent Enroll Course
                        </p>
                    ) : (
                        recentEnrollments?.map((enroll) => (
                            <RecentEnrollCard key={enroll.id} enroll={enroll} />
                        ))
                    )} */}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default DashboardHomePageLayout;
