import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoadingUI = () => {
    return (
        <div className='py-3'>
            <div className="p-5 border rounded-md">
                <div className="mb-5">
                    <div>
                        <Skeleton className="mx-auto rounded-full h-28 w-28" />
                        <div className="mt-4">
                            <Skeleton className="mb-1.5 h-5 w-24 rounded" />
                            <Skeleton className="w-16 h-4rounded" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2.5 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <Skeleton className="w-full rounded h-9" />
                    <Skeleton className="w-full rounded h-9" />
                </div>
            </div>

            <div className='pt-5'>
                <div className="p-5 transition-all duration-500 ease-in-out border rounded-md">
                    <Skeleton className="w-1/3 h-5 mb-4 rounded" />
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <Skeleton className="w-1/4 h-4 mb-2 rounded" />
                            <Skeleton className="relative rounded-md h-9" />
                        </div>
                        <div>
                            <Skeleton className="w-1/4 h-4 mb-2 rounded" />
                            <Skeleton className="relative rounded-md h-9" />
                        </div>
                        <div>
                            <Skeleton className="w-1/4 h-4 mb-2 rounded" />
                            <Skeleton className="relative rounded-md h-9" />
                        </div>
                    </div>
                    <Skeleton className="mt-5 rounded h-9" />
                </div>
            </div>
        </div>
    );
};

export default ProfileLoadingUI;