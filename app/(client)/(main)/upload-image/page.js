import ImageUpload from '@/components/globals/UploadPhoto/ImageUpload';
import { getSessionUser } from '@/lib/dal';
import { redirect } from 'next/navigation';

const UploadImagePage = async () => {
    const sessionUser = await getSessionUser();

    if (sessionUser?.profilePhoto?.url && !sessionUser?.role === 'admin') {
        redirect('/');
    }

    return (
        <div className='flex items-center justify-center py-8 md:py-12 lg:py-16'>
            <ImageUpload user={sessionUser} />
        </div>
    );
};

export default UploadImagePage;
