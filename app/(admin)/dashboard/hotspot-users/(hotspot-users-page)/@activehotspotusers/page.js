import { DataTable } from '../../_components/Table/Table';
import { getActiveHotpotUsers } from '@/queries/hotspotUser';
import { columns } from './_components/columns';

const ActiveHotspotUsers = async () => {
    const activeHotspotUsers = JSON.parse(await getActiveHotpotUsers());

    return (
        <div>
            <DataTable columns={columns} data={activeHotspotUsers} />
        </div>
    );
};

export default ActiveHotspotUsers;
