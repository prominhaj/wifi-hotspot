import { DataTable } from '@/app/(admin)/components/data-table';
import { getAllRoleUsers } from '@/queries/user';
import { columns } from '../_components/columns';

const DashboardUsersSection = async () => {
    const users = await getAllRoleUsers();
    console.log(users);

    return (
        <div>
            <DataTable columns={columns} data={users} />
        </div>
    );
};

export default DashboardUsersSection;
