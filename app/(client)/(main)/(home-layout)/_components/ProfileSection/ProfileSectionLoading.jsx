import { Skeleton } from "@/components/ui/skeleton";

const ProfileSectionLoading = () => {
    return (
        <div className='relative h-48 p-4 bg-background rounded-xl'>
            <div className='flex flex-wrap items-center justify-between w-full gap-2'>
                <div className='flex items-center w-full space-x-4'>
                    <Skeleton className="relative flex w-12 h-12 overflow-hidden rounded-full shrink-0" />
                    <div className="w-full space-y-2">
                        <Skeleton className="w-3/4 h-4 rounded" />
                        <Skeleton className="w-2/4 h-4 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSectionLoading;