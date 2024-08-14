import PackageCard from '@/components/globals/PackageCard/PackageCard';
import ConnectMikrotikForm from './_components/ConnectMikrotikForm';
import CreateUser from '@/components/globals/CreateUser/CreateUser';

const Dashboard = () => {
    return (
        <div className='pt-5'>
            {/* <ConnectMikrotikForm /> */}
            <CreateUser />
            <PackageCard />
        </div>
    );
};

export default Dashboard;
