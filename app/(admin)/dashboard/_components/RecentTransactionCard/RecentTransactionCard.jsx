import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convertToUTCPlus6 } from "@/lib/convertData";
import moment from "moment";

const RecentTransactionCard = ({ payment }) => {
    const { userId, amount, createdAt } = payment;

    return (
        <>

            <div className='flex flex-wrap items-center justify-between gap-2 sm:gap-3 md:gap-4'>
                <div className="flex items-center gap-2">
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
                </div>
                <div className="text-end">
                    <div className='font-medium'>BDT {amount}</div>
                    <p>
                        <small>
                            {moment(convertToUTCPlus6(createdAt)).format('MMM DD YYYY, h:mm:ss A')}
                        </small>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RecentTransactionCard;