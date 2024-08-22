import { getAllPackages } from '@/queries/package';
import { columns } from '../_components/Table/columns';
import { DataTable } from '../_components/Table/data-table';

const DashboardPackagesSection = async () => {
    const packages = await getAllPackages();

    return (
        <div>
            <DataTable columns={columns} data={packages} />
        </div>
    );
};

export default DashboardPackagesSection;
