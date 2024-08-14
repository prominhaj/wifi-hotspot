import PackageCard from '@/components/globals/PackageCard/PackageCard';
import ConnectMikrotikForm from './_components/ConnectMikrotikForm';

const Dashboard = () => {
    return (
        <div className='pt-5'>
            <ConnectMikrotikForm />
            <PackageCard />
        </div>
    );
};

export default Dashboard;
