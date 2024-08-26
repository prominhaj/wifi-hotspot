import { Wifi } from 'lucide-react';
import TotalCard from '../../../_components/TotalCard/TotalCard';
import { getHotspotActiveUsers } from '@/queries/mikrotik';

export const dynamic = "force-dynamic";

const DashboardActiveUsers = async () => {
    const activeHotspotUser = await getHotspotActiveUsers(true);

    return (
        <TotalCard
            title='Active Hotspot Users'
            count={activeHotspotUser}
            icon={<Wifi className='w-4 h-4 text-muted-foreground' />}
        />
    );
};

export default DashboardActiveUsers;
