import Spinner from '@/components/globals/Loading/Spinner';

const ProfileLoadingPage = () => {
    return (
        <div className='flex items-center gap-3 justify-center h-[50vh]'>
            <Spinner size={true} /> Profile Loading...
        </div>
    );
};

export default ProfileLoadingPage;
