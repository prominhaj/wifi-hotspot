import { getMacAddresses } from "@/queries/mac-address";
import { DataTable } from "./Table/data-table";
import { columns } from "./Table/columns";

const MacAddressTable = async () => {
    const macAddresses = await getMacAddresses();

    return (
        <div className='px-6'>
            <DataTable data={macAddresses} columns={columns} />
        </div>
    );
};

export default MacAddressTable;