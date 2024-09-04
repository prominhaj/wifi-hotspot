import { getSessionUser } from '@/lib/dal';
import { redirect } from 'next/navigation';

const CheckImageLayout = async ({ children }) => {
    const sessionUser = await getSessionUser();
    // Check if user image exists
    if (!sessionUser?.profilePhoto?.url) {
        redirect('/upload-image');
    }

    return <>{children}</>;
};

export default CheckImageLayout;
