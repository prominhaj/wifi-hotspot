import { Suspense } from 'react';
import PackageList from './_components/PackageList';
import PackageListLoading from './_components/PackageListLoading';

const PackageListPage = async () => {
    return (
        <div className='p-1 mt-4'>
            <h2 className='mb-3 text-lg font-semibold'>Package For you</h2>
            <Suspense fallback={<PackageListLoading />}>
                <PackageList />
            </Suspense>
        </div>
    );
};

export default PackageListPage;
