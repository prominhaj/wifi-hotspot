import LoadingUI from '@/components/globals/Loading/LoadingUI';

const MainLayoutLoading = () => {
    return (
        <div className='h-[100vh] w-full flex items-center justify-center text-4xl font-bold'>
            <LoadingUI />
        </div>
    );
};

export default MainLayoutLoading;
