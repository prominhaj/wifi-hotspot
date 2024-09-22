'use client';
import SubmitButton from '@/components/globals/SubmitButton/SubmitButton';
import FormControl from './FormControl';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { updateHotspotUserById } from '@/app/actions/hotspotUser';
import { useRouter } from 'next/navigation';

const EditForm = ({ editHotspotUser }) => {
    const { back } = useRouter();

    const handleUpdateHotspotUser = useCallback(
        async (formData) => {
            const username = formData.get('username');
            const password = formData.get('password');
            const expiredAt = formData.get('expiry-date');

            try {
                const updatedInfo = {
                    username,
                    password,
                    expiredAt
                };
                const result = await updateHotspotUserById(
                    editHotspotUser?.id,
                    editHotspotUser?.hotspotUserId,
                    updatedInfo
                );
                if (result.success) {
                    toast.success('Hotspot user updated successfully');
                    back();
                } else {
                    toast.error('Failed to update hotspot user');
                }
            } catch (error) {
                toast.error(error.message);
            }
        },
        [editHotspotUser?.hotspotUserId, editHotspotUser?.id, back]
    );

    return (
        <form action={handleUpdateHotspotUser} className='grid grid-cols-1 gap-3'>
            <FormControl defaultValue={editHotspotUser?.username} name='username'>
                Username
            </FormControl>
            <FormControl defaultValue={editHotspotUser?.password} name='password'>
                Password
            </FormControl>
            <FormControl
                disabled={true}
                defaultValue={editHotspotUser?.macAddress}
                name='mac-address'
            >
                Mac Address
            </FormControl>
            <FormControl
                disabled={false}
                defaultValue={editHotspotUser?.expiredAt}
                name='expiry-date'
            >
                Expiry Date
            </FormControl>
            <SubmitButton className='mt-1.5' variant='primary' size='sm'>
                Update Details
            </SubmitButton>
        </form>
    );
};

export default EditForm;
