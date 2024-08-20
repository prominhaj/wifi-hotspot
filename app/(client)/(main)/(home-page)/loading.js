import Spinner from '@/components/globals/Loading/Spinner';

const DashboardPageLoading = () => {
    return (
        <div className='flex items-center justify-center gap-2'>
            <Spinner size={true} /> Loading...
        </div>
    );
};

export default DashboardPageLoading;
