import { getHotspotUserById } from '@/queries/hotspotUser';
import Modal from './_components/Modal';

const HotSpotUserDetailsModal = async ({ params: { id } }) => {
    const hotspotUser = await getHotspotUserById(id);
    return (
        <div>
            <Modal hotspotUser={hotspotUser} />
        </div>
    );
};

export default HotSpotUserDetailsModal;
