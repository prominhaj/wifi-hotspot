import { Users } from 'lucide-react';
import TotalCard from '../../../_components/TotalCard/TotalCard';
import { getTotalUsers } from '@/queries/user';

const DashboardTotalUsers = async () => {
    const totalUsers = await getTotalUsers();

    return (
        <TotalCard
            title='Total Users'
            count={totalUsers}
            icon={<Users className='w-4 h-4 text-muted-foreground' />}
        />
    );
};

export default DashboardTotalUsers;
