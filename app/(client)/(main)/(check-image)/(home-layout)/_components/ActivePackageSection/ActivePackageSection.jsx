import PackageCard from "@/components/globals/PackageCard/PackageCard";
import { cn } from "@/lib/utils";
import { getPopularPackage } from "@/queries/package";
import { formatBytes } from "@/lib/convertData";
import connectToRouter from "@/lib/mikrotik";
import ActivePackage from "../Dashboard/ActivePackage/ActivePackage";
import { userDashboardInfo } from "@/lib/helper";

const ActivePackageSection = async () => {
    const isConnected = await connectToRouter(true);
    const { isActive, hotspotUser, activeHotspotUser, packageInfo } = await userDashboardInfo();

    const popularPackage = await getPopularPackage();
    const uploadUsages = isActive && activeHotspotUser?.success && formatBytes(activeHotspotUser?.user['bytes-in']);
    const downloadUsages = isActive && activeHotspotUser?.success && formatBytes(activeHotspotUser?.user['bytes-out']);
    const totalUploadUsages = isActive && hotspotUser?.success && formatBytes(hotspotUser?.user['bytes-in']);
    const totalDownloadUsages = isActive && hotspotUser?.success && formatBytes(hotspotUser?.user['bytes-out']);

    // Calculate active package usages
    const activeInfo = {
        uploadUsages,
        downloadUsages,
        totalUploadUsages,
        totalDownloadUsages,
        packageInfo,
    }

    return (
        <div className={cn(isActive ? "mb-[5rem]" : "mb-[8.5rem]")}>
            <div className={cn(isActive ? "top-[8.5rem]" : "top-20", "absolute left-0 right-0 z-30")}>
                {
                    isActive ? (
                        <ActivePackage activeInfo={activeInfo} />
                    ) : (
                        <div className="px-3">
                            <PackageCard isPopular={true} wifiPackage={popularPackage} isConnected={isConnected} />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ActivePackageSection;