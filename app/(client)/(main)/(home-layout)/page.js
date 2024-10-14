import { Suspense } from 'react';
import PackageListLoading from './_components/PackageList/PackageListLoading';
import PackageList from './_components/PackageList/PackageList';
import ServiceSection from './_components/ServiceSection/ServiceSection';
import RecentTransaction from './_components/RecentTransaction/RecentTransaction';
import ActiveDashboard from './_components/ActiveDashboard/ActiveDashboard';

export const metadata = {
    title: 'Wifi - Shakib Electronics',
    description: 'Explore || Service || Build || Share || Wifi',
    applicationName: 'Wifi - Shakib Electronics',
    keywords: [
        'Next.js',
        'React',
        'JavaScript',
        'Wifi - Shakib Electronics',
        'Wifi Hotspot',
        'Hotspot',
        'Shakib Electronics',
        'Wifi',
        'Mikrotik',
        'Home Page'
    ]
};

const HomePage = () => {
    return (
        <>
            <ActiveDashboard />
            <ServiceSection />
            <RecentTransaction />
            <div className='p-1 mt-4'>
                <h2 className='mb-3 text-lg font-semibold'>Package For you</h2>
                <Suspense fallback={<PackageListLoading />}>
                    <PackageList />
                </Suspense>
            </div>
        </>
    );
};

export default HomePage;
