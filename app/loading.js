import Spinner from '@/components/globals/Loading/Spinner';

const MainLayoutLoading = () => {
    return (
        <div className='h-[100vh] w-full flex items-center justify-center text-4xl font-bold'>
            <Spinner layout={true} />
        </div>
    );
};

export default MainLayoutLoading;
