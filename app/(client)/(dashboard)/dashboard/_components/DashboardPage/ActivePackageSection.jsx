
import PackageCard from "@/components/globals/PackageCard/PackageCard";
import ActivePackage from "./ActivePackage";
import { cn } from "@/lib/utils";
import { getPopularPackage } from "@/queries/package";

const ActivePackageSection = async ({ isActive }) => {
    const popularPackage = await getPopularPackage();

    return (
        <div className={cn(isActive ? "mb-[5rem]" : "mb-[8rem]")}>
            <div className={cn(isActive ? "top-36" : "top-20", "absolute left-0 right-0 z-30")}>
                {
                    isActive ? <ActivePackage /> : (
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