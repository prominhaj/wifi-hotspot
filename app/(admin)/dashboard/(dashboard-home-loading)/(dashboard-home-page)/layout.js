import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { getSessionUser } from '@/lib/dal';
import { calculateSales } from '@/queries/admin';
import { cn } from '@/lib/utils';
import TotalCard from '../../_components/TotalCard/TotalCard';

const DashboardHomePageLayout = async ({
    children,
    activeusers,
    hotspotusers,
    totalusers,
    salescharts,
    recenttransactions
}) => {
    const user = await getSessionUser();
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
                    {/* salescharts */}
                    {salescharts}
                    {/* recenttransactions */}
                    {recenttransactions}
                </div>
            </main>
        </div>
    );
};

export default DashboardHomePageLayout;
