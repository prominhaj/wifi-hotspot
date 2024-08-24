import { columns } from '../../_components/Table/columns';
import { DataTable } from '../../_components/Table/Table';
import { getHotspotUsers } from '@/queries/hotspotUser';

const ExpiredHotspotUserPage = async () => {
    const expiredHotspotUsers = await getHotspotUsers({ status: 'expired' });
    console.log(expiredHotspotUsers);

    return (
        <div>
            <DataTable columns={columns} data={expiredHotspotUsers} />
        </div>
    );
};

export default ExpiredHotspotUserPage;
