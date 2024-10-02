import { getHotspotUsers } from '@/queries/hotspotUser';
import { DataTable } from '../../_components/Table/Table';
import { columns } from '../../_components/Table/columns';

const HotspotUsersPage = async () => {
    const activeHotspotUsers = await getHotspotUsers({ status: 'active' });

    return (
        <>
            <DataTable columns={columns} data={activeHotspotUsers} updateMac={true} />
        </>
    );
};

export default HotspotUsersPage;
