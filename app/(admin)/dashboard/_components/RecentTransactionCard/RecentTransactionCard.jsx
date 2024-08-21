import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RecentTransactionCard = ({ payment }) => {
    const { userId, amount } = payment;

    return (
        <>

            <div className='flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4'>
                <Avatar className='h-9 w-9'>
                    <AvatarImage className="object-cover" src={userId?.profilePhoto?.url} alt={userId?.name} />
                    <AvatarFallback>{userId?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                        {userId?.name}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                        {userId?.phone}
                    </p>
                </div>
                <div className='ml-auto font-medium'>BDT {amount}</div>
            </div>
        </>
    );
};

export default RecentTransactionCard;