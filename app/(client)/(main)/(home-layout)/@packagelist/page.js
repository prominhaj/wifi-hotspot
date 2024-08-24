import PackageCard from '@/components/globals/PackageCard/PackageCard';
import { getSessionUser } from '@/lib/dal';
import { getHotspotUserByUserId } from '@/queries/hotspotUser';
import { getAllPackages } from '@/queries/package';

const PackageList = async () => {
    const wifiPackages = await getAllPackages();
    const user = await getSessionUser();
    const currentPlan = await getHotspotUserByUserId(user?.id);
    const currentStatus = currentPlan?.status === 'active' ? true : false;

    return (
        <div className='p-1 mt-4'>
            <h2 className='mb-3 text-lg font-semibold'>Package For you</h2>
            <div className='grid items-center grid-cols-1 gap-5'>
                {wifiPackages?.map((wifiPackage) => (
                    <PackageCard
                        key={wifiPackage?.id}
                        wifiPackage={wifiPackage}
                        isDisabled={currentStatus}
                    />
                ))}
            </div>
        </div>
    );
};

export default PackageList;
