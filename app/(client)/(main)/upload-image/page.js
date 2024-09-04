import { getSessionUser } from '@/lib/dal';
import ImageUpload from './_components/ImageUpload';

const UploadImagePage = async () => {
    const sessionUser = await getSessionUser();

    return (
        <div className='flex items-center justify-center py-8 md:py-12 lg:py-16'>
            <ImageUpload user={sessionUser} />
        </div>
    );
};

export default UploadImagePage;
