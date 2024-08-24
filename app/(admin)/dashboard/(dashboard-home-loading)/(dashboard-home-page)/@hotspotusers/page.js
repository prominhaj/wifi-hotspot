import { WifiOff } from 'lucide-react';
import TotalCard from '../../../_components/TotalCard/TotalCard';
import { getHotspotUsers } from '@/queries/mikrotik';

const DashboardHotspotUsers = async () => {
    const totalHotspotUsers = await getHotspotUsers(true);

    return (
        <TotalCard
            title='Hotspot Users'
            count={totalHotspotUsers}
            icon={<WifiOff className='w-4 h-4 text-muted-foreground' />}
        />
    );
};

export default DashboardHotspotUsers;
