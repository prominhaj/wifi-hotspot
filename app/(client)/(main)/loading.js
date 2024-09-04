import LoadingUI from '@/components/globals/Loading/LoadingUI';

const DashboardLayoutLoading = () => {
    return (
        <div className='h-[75vh] w-full flex items-center justify-center gap-3'>
            <LoadingUI />
        </div>
    );
};

export default DashboardLayoutLoading;
