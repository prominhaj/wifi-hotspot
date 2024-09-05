import { getHotspotUsers } from '@/queries/hotspotUser';
import { DataTable } from '../../_components/Table/Table';
import { columns } from '../../_components/Table/columns';
import { getHotspotActionById } from '@/queries/mikrotik';

const ActiveHotspotUsersPage = async () => {
    const activeHotspotUsers = await getHotspotUsers({ status: 'active' });

    const modifiedActiveUsers = await Promise.all(
        activeHotspotUsers?.map(async (activeUser) => {
            const checkActiveUser = await getHotspotActionById(activeUser?.username);
            const isHotspotActive = checkActiveUser?.success ? 'active' : 'offline';

            return {
                ...activeUser,
                status: isHotspotActive
            };
        })
    );

    return (
        <div>
            <DataTable columns={columns} data={modifiedActiveUsers} updateMac={true} />
        </div>
    );
};

export default ActiveHotspotUsersPage;
