
import PackageCard from "@/components/globals/PackageCard/PackageCard";
import ActivePackage from "./ActivePackage";
import { cn } from "@/lib/utils";
import { getPopularPackage } from "@/queries/package";
import { formatBytes } from "@/lib/convertData";

const ActivePackageSection = async ({ isActive, activeHotspotUser }) => {
    const popularPackage = await getPopularPackage();
    const uploadUsages = formatBytes(activeHotspotUser?.user['bytes-in']);
    const downloadUsages = formatBytes(activeHotspotUser?.user['bytes-out']);

    return (
        <div className={cn(isActive ? "mb-[5rem]" : "mb-[8rem]")}>
            <div className={cn(isActive ? "top-36" : "top-20", "absolute left-0 right-0 z-30")}>
                {
                    isActive ? <ActivePackage uploadUsages={uploadUsages} downloadUsages={downloadUsages} /> : (
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