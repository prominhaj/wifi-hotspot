import { getUserById } from '@/queries/user';
import VerifyOTP from './_components/VerifyOTP';
import EditNumber from './_components/EditNumber';

const VerifyPage = async ({ searchParams: { id, redirectUrl } }) => {
    const user = await getUserById(id);
    return (
        <>
            <EditNumber number={user?.phone} id={id} />
            <div className='mt-5'>
                <h4 className='text-xl font-semibold text-center'>Enter Your OTP Code</h4>
                <VerifyOTP id={id} redirectUrl={redirectUrl} />
            </div>
        </>
    );
};

export default VerifyPage;
