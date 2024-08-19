import ServiceSection from './_components/ServiceSection/ServiceSection';
import RecentTransaction from './_components/RecentTransaction/RecentTransaction';
import PackageList from './_components/PackageList';

const Dashboard = async () => {
    return (
        <>
            <ServiceSection />
            <RecentTransaction />
            <PackageList />
        </>
    );
};

export default Dashboard;
