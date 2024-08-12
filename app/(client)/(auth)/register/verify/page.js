import VerifyOTP from './_components/VerifyOTP';

const VerifyPage = ({ searchParams: { id } }) => {
    return (
        <div>
            <h4 className='text-xl font-semibold text-center'>Enter Your OTP Code</h4>
            <VerifyOTP id={id} />
        </div>
    );
};

export default VerifyPage;
