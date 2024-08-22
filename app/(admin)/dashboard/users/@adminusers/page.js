import { getAllAdminUsers } from '@/queries/user';
import { DataTable } from '@/app/(admin)/dashboard/users/_components/data-table';
import { columns } from '../_components/columns';

const AdminUsersPage = async () => {
    const adminUsers = await getAllAdminUsers();

    return (
        <div>
            <DataTable columns={columns} data={adminUsers} />
        </div>
    );
};

export default AdminUsersPage;
