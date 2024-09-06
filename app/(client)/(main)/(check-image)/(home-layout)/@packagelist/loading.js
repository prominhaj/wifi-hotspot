import { Skeleton } from '@/components/ui/skeleton';

const PackageListLoading = () => {
    return (
        <div className='p-1 mt-4'>
            <Skeleton className='w-1/4 h-6 mb-2 rounded' />
        </div>
    );
};

export default PackageListLoading;
