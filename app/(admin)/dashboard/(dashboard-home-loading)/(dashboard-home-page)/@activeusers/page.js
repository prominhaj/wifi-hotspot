import { Wifi } from 'lucide-react';
import TotalCard from '../../../_components/TotalCard/TotalCard';
import { getHotspotActiveUsers } from '@/queries/mikrotik';

const DashboardActiveUsers = async () => {
    // const activeHotspotUser = await getHotspotActiveUsers(true);
    // console.log(activeHotspotUser);
    return (
        <TotalCard
            title='Active Users'
            count={0}
            icon={<Wifi className='w-4 h-4 text-muted-foreground' />}
        />
    );
};

export default DashboardActiveUsers;
