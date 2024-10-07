import { getHotspotUserById } from '@/queries/hotspotUser';
import Modal from './_components/Modal';

export const generateMetadata = async ({ params: { id } }) => {
    const editHotspotUser = JSON.parse(await getHotspotUserById(id));

    return {
        title: `${editHotspotUser?.userId?.name} - Wifi Hotspot`,
        openGraph: {
            images: [editHotspotUser?.userId?.profilePhoto?.url]
        }
    };
};

const EditModalPage = async ({ params: { id } }) => {
    const editHotspotUser = JSON.parse(await getHotspotUserById(id));
    return (
        <>
            <Modal editHotspotUser={editHotspotUser} />
        </>
    );
};

export default EditModalPage;
