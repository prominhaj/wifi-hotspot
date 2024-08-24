import Spinner from '@/components/globals/Loading/Spinner';

const DashboardActiveHotspotUserLoading = () => {
    return (
        <div className='flex items-center justify-center gap-3 my-20'>
            <Spinner size={true} /> Loading...
        </div>
    );
};

export default DashboardActiveHotspotUserLoading;
