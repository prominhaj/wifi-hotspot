import { getHotspotUsers } from '@/queries/hotspotUser';
import { DataTable } from '../../_components/Table/Table';
import { columns } from '../../_components/Table/columns';
import { getHotspotActionById } from '@/queries/mikrotik';

export const dynamic = 'force-dynamic';

const ActiveHotspotUsersPage = async () => {
    const activeHotspotUsers = await getHotspotUsers({ status: 'active' });

    const modifiedActiveUsers = await Promise.all(
        activeHotspotUsers?.map(async (activeUser) => {
            const checkActiveUser = await getHotspotActionById(activeUser?.username);
            const isHotspotActive = checkActiveUser ? 'active' : 'offline';
            return {
                ...activeUser,
                status: isHotspotActive
            };
        })
    );

    return (
        <div>
            <DataTable columns={columns} data={modifiedActiveUsers} />
        </div>
    );
};

export default ActiveHotspotUsersPage;
