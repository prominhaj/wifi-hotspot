import Spinner from '@/components/globals/Loading/Spinner';

const PaymentHistoryLoading = () => {
    return (
        <div className='flex items-center justify-center gap-2 h-[50vh]'>
            <Spinner size={true} /> Loading...
        </div>
    );
};

export default PaymentHistoryLoading;
