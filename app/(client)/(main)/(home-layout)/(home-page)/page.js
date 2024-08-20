import ServiceSection from '../_components/ServiceSection/ServiceSection';
import RecentTransaction from '../_components/RecentTransaction/RecentTransaction';

const Dashboard = async () => {
    return (
        <>
            <ServiceSection />
            <RecentTransaction />
        </>
    );
};

export default Dashboard;
