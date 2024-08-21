import Spinner from '@/components/globals/Loading/Spinner';

const DashboardLayoutLoading = () => {
    return (
        <div className='h-[90vh] w-full flex items-center justify-center gap-3'>
            <Spinner size={true} /> Loading...
        </div>
    );
};

export default DashboardLayoutLoading;
