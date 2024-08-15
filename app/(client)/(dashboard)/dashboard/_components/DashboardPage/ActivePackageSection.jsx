import { Progress } from "@/components/ui/progress"
import { ArrowDownUp, MessageSquareIcon, Music2Icon, VideoIcon, Wifi } from "lucide-react";

const ActivePackageSection = () => {
    return (
        <div className="mb-[6rem]">
            <div className="absolute left-0 right-0 z-30 top-40">
                <div className="p-4 mx-5 mt-4 bg-white shadow rounded-xl">
                    <div className="flex items-center justify-between">
                        <div className="font-semibold">Internet</div>
                        <div className="text-sm font-medium text-muted-foreground">Expired date 14/09/23</div>
                    </div>
                    <div className="mt-2">
                        <Progress value={90} className="w-full h-3 bg-gray-200" />
                        <div className="flex justify-between mt-2 text-sm">
                            <div className="font-medium">30 Days</div>
                            <div className="font-medium">29 Left</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                        <div>
                            <Wifi className="w-6 h-6 mx-auto" />
                            <div className="mt-1 text-sm">Current Using</div>
                            <div className="text-xs text-muted-foreground">0.95 MB/1 MB</div>
                        </div>
                        <div>
                            <ArrowDownUp className="w-6 h-6 mx-auto" />
                            <div className="mt-1 text-sm">Total Usages</div>
                            <div className="text-xs text-muted-foreground">2.95 GB/5 GB</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivePackageSection;