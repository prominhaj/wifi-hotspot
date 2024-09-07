import PackageCard from "@/components/globals/PackageCard/PackageCard";
import { getSessionUser } from '@/lib/dal';
import connectToRouter from '@/lib/mikrotik';
import { getHotspotUserByUserId } from '@/queries/hotspotUser';
import { getAllPackages } from '@/queries/package';

const PackageList = async () => {
    const wifiPackages = await getAllPackages();
    const user = await getSessionUser();
    const currentPlan = await getHotspotUserByUserId(user?.id);
    const currentStatus = currentPlan?.status === 'active' ? true : false;
    const isConnected = await connectToRouter(true);

    return (
        <div className='grid items-center grid-cols-1 gap-5 mb-3'>
            {wifiPackages?.map((wifiPackage) => (
                <PackageCard
                    key={wifiPackage?.id}
                    wifiPackage={wifiPackage}
                    isDisabled={currentStatus}
                    isConnected={isConnected}
                />
            ))}
        </div>
    );
};

export default PackageList;