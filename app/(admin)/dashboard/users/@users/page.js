import { DataTable } from '@/app/(admin)/dashboard/users/_components/data-table';
import { getAllRoleUsers } from '@/queries/user';
import { columns } from '../_components/columns';

const DashboardUsersSection = async () => {
    const users = await getAllRoleUsers();

    return (
        <div>
            <DataTable columns={columns} data={users} />
        </div>
    );
};

export default DashboardUsersSection;
