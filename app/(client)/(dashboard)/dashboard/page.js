import PackageCard from '@/components/globals/PackageCard/PackageCard';
import DashboardPage from './_components/DashboardPage';
import { getSessionUser } from '@/lib/dal';

const Dashboard = async () => {
    const user = await getSessionUser();
    console.log(user);

    return (
        <div className='pt-5'>
            <DashboardPage />
            <PackageCard />
        </div>
    );
};

export default Dashboard;
