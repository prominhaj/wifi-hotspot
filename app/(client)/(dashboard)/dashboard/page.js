import PackageCard from '@/components/globals/PackageCard/PackageCard';
import DashboardPage from './_components/DashboardPage/DashboardPage';

const Dashboard = async () => {
    return (
        <div className='pt-5'>
            <DashboardPage />
            <PackageCard />
        </div>
    );
};

export default Dashboard;
