import { Button } from '@/components/ui/button';
import PackageCard from '@/components/globals/PackageCard/PackageCard';
import { getAllPackages } from '@/queries/package';
import ServiceSection from './_components/DashboardPage/ServiceSection';

const Dashboard = async () => {
    const wifiPackages = await getAllPackages();

    return (
        <>
            <ServiceSection />
            <div className='p-4 mt-4 bg-white shadow dark:bg-black rounded-xl'>
                <h2 className='mb-3 text-lg font-semibold'>Recent Transaction</h2>
                <div className='flex items-center justify-between'>
                    <div>
                        <div className='text-sm'>Full Gaming</div>
                        <div className='text-xs text-muted-foreground'>12 GB | 30 DAYS</div>
                    </div>
                    <Button variant='outline' className='text-green-500 border-green-500'>
                        Buy again
                    </Button>
                </div>
            </div>
            <div className='p-4 mt-4 bg-white dark:bg-black rounded-xl'>
                <h2 className='mb-3 text-lg font-semibold'>Package For you</h2>
                <div className='grid items-center grid-cols-1 gap-3'>
                    {wifiPackages?.map((wifiPackage) => (
                        <PackageCard key={wifiPackage?.id} wifiPackage={wifiPackage} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
