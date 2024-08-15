
import PackageCard from "@/components/globals/PackageCard/PackageCard";
import ActivePackage from "./ActivePackage";
import { cn } from "@/lib/utils";

const ActivePackageSection = ({ isActive }) => {
    return (
        <div className={cn(isActive ? "mb-[5rem]" : "mb-[8rem]")}>
            <div className={cn(isActive ? "top-36" : "top-20", "absolute left-0 right-0 z-30")}>
                {
                    isActive ? <ActivePackage /> : (
                        <div className="px-3">
                            <PackageCard />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ActivePackageSection;