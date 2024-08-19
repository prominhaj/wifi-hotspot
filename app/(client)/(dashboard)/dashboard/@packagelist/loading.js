import PackageCardLoading from '@/components/globals/PackageCard/PackageCardLoading';
import { Skeleton } from '@/components/ui/skeleton';

const PackageListLoading = () => {
    return (
        <div className='p-1 mt-4'>
            <Skeleton className='w-1/4 h-6 mb-2 rounded' />
            <div className='grid items-center grid-cols-1 gap-5'>
                <PackageCardLoading />
            </div>
        </div>
    );
};

export default PackageListLoading;
