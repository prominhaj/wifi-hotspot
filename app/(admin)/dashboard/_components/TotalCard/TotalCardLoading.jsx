import { Skeleton } from "@/components/ui/skeleton";

const TotalCardLoading = () => {
    return (
        <div className="border shadow rounded-xl bg-card/20 text-card-foreground">
            <div className="flex flex-row items-center justify-between p-6 pb-2 space-y-0">
                <Skeleton className="w-2/6 h-4 rounded" />
                <Skeleton className="w-6 h-5 rounded" />
            </div>
            <div className="p-6 pt-0">
                <Skeleton className="w-1/4 h-8 text-2xl font-bold rounded" />
            </div>
        </div>
    );
};

export default TotalCardLoading;