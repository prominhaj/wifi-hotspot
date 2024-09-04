import Spinner from '@/components/globals/Loading/Spinner';

const HomePageLoading = () => {
    return (
        <div className='flex items-center justify-center gap-3'>
            <Spinner size={true} /> Loading...
        </div>
    );
};

export default HomePageLoading;
