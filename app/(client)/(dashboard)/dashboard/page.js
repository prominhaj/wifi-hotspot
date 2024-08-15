import PackageCard from '@/components/globals/PackageCard/PackageCard';
import DashboardPage from './_components/DashboardPage';
import { auth } from '@/auth';

const Dashboard = async () => {
    const user = await auth();
    console.log(user);

    return (
        <div className='pt-5'>
            <DashboardPage />
            <PackageCard />
        </div>
    );
};

export default Dashboard;
