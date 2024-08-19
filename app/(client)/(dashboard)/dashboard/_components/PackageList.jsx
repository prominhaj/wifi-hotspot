import PackageCard from "@/components/globals/PackageCard/PackageCard";
import { getAllPackages } from "@/queries/package";

const PackageList = async () => {
    const wifiPackages = await getAllPackages();

    return (
        <div className='p-1 mt-4 rounded-xl'>
            <h2 className='mb-3 text-lg font-semibold'>Package For you</h2>
            <div className='grid items-center grid-cols-1 gap-5'>
                {wifiPackages?.map((wifiPackage) => (
                    <PackageCard key={wifiPackage?.id} wifiPackage={wifiPackage} />
                ))}
            </div>
        </div>
    );
};

export default PackageList;