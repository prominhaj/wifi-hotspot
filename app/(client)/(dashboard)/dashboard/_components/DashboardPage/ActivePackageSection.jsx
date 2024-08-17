import PackageCard from "@/components/globals/PackageCard/PackageCard";
import ActivePackage from "./ActivePackage";
import { cn } from "@/lib/utils";
import { getPopularPackage } from "@/queries/package";
import { formatBytes } from "@/lib/convertData";

const ActivePackageSection = async ({ isActive, activeHotspotUser, hotspotUser }) => {
    const popularPackage = await getPopularPackage();
    const uploadUsages = isActive && formatBytes(activeHotspotUser?.user['bytes-in']);
    const downloadUsages = isActive && formatBytes(activeHotspotUser?.user['bytes-out']);
    const totalUploadUsages = isActive && formatBytes(hotspotUser?.user['bytes-in']);
    const totalDownloadUsages = isActive && formatBytes(hotspotUser?.user['bytes-out']);
    const expiredDate = isActive && (hotspotUser?.user?.comment).split(" ");

    // Calculate active package usages
    const activeInfo = {
        uploadUsages,
        downloadUsages,
        totalUploadUsages,
        totalDownloadUsages,
        expiredDate: expiredDate[0],
        expiredTime: expiredDate[1]
    }

    return (
        <div className={cn(isActive ? "mb-[5rem]" : "mb-[8rem]")}>
            <div className={cn(isActive ? "top-36" : "top-20", "absolute left-0 right-0 z-30")}>
                {
                    isActive ? (
                        <ActivePackage activeInfo={activeInfo} />
                    ) : (
                        <div className="px-3">
                            <PackageCard wifiPackage={popularPackage} />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ActivePackageSection;