import { getAllPackages } from '@/queries/package';
import { DataTable } from '../../_components/Table/data-table';
import { columns } from '../../_components/Table/columns';

const DashboardPackagesSection = async () => {
    const packages = JSON.parse(await getAllPackages());

    return (
        <div>
            <DataTable columns={columns} data={packages} />
        </div>
    );
};

export default DashboardPackagesSection;
