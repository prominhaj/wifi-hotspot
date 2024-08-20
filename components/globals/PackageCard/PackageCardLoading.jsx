import { Skeleton } from "@/components/ui/skeleton";

const PackageCardLoading = () => {
    return (
        <div className='relative w-full border rounded-xl'>
            <Skeleton className="h-4 rounded absolute top-1 -left-[3px]" />
            <div className='flex w-full flex-col space-y-1.5 p-5'>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center flex-1 gap-2'>
                        <Skeleton className="w-6 h-6 rounded" />
                        <Skeleton className="w-2/6 h-5 font-semibold leading-none tracking-tight rounded" />
                    </div>
                    <Skeleton className="block w-1/4 h-6 text-xl font-semibold tracking-tight rounded" />
                </div>
            </div>
            <div className='p-6 px-5 pt-0'>
                <Skeleton className="block w-1/2 font-bold rounded h-7" />
                <div className='pt-2.5 flex w-full flex-1 items-center justify-between'>
                    <div className='flex items-center flex-1 w-full gap-2'>
                        <Skeleton className="px-1 py-0.5 h-4 text-sm rounded block w-1/4" />
                        <Skeleton className="flex items-center text-base font-medium line-through opacity-60 gap-0.5 h-5 rounded w-1/4" />
                    </div>
                    <Skeleton className="flex items-center gap-0.5 h-6 rounded w-1/2" />
                </div>
                <Skeleton className="w-full h-10 p-5 mt-5 rounded" />
            </div>
        </div>
    );
};

export default PackageCardLoading;