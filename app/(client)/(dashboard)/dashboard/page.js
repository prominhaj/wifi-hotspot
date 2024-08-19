import ServiceSection from './_components/ServiceSection';
import RecentTransaction from './_components/RecentTransaction';
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
