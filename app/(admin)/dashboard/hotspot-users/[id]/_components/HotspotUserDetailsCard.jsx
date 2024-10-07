import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import moment from 'moment';
import { calculateDiscountedPrice, convertToUTCPlus6 } from '@/lib/convertData';
import SubCard from './SubCard';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import DeleteHotspotUser from './DeleteHotspotUser';

const HotspotUserDetailsCard = ({ hotspotUser }) => {

    return (
        <Card className='w-full max-w-6xl mx-auto bg-transparent'>
            <CardHeader className='px-6 py-4 bg-background/50'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div className='flex items-center gap-3'>
                        <Avatar>
                            <AvatarImage className="object-cover" src={hotspotUser?.userId?.profilePhoto?.url} />
                            <AvatarFallback>{hotspotUser?.userId?.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className='grid gap-0.5'>
                            <h2 className='text-lg font-medium'>{hotspotUser?.userId?.name}</h2>
                            <div className='text-sm text-muted-foreground'>Phone No: {hotspotUser?.userId?.phone}</div>
                        </div>
                    </div>
                    <DeleteHotspotUser id={hotspotUser?._id} />
                </div>
            </CardHeader>
            <CardContent className='grid gap-8 p-6 pt-3 bg-background/20'>
                <div>
                    <h4 className='mb-4 text-lg font-medium md:text-xl'>Payment History</h4>
                    <div className='grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2'>
                        <SubCard
                            label="Payment Date"
                            value={moment(convertToUTCPlus6(hotspotUser?.paymentId?.createdAt)).format('MMM DD YYYY, h:mm:ss A')}
                        />
                        <SubCard
                            label="Amount"
                            value={<>TK {hotspotUser?.paymentId?.amount}</>}
                        />
                        <SubCard
                            label="Payment ID"
                            value={hotspotUser?.paymentId?.paymentId}
                        />
                        <SubCard
                            label="Transaction ID"
                            value={hotspotUser?.paymentId?.transactionId}
                        />
                        <SubCard
                            label="Customer Number"
                            value={hotspotUser?.paymentId?.customerMsisdn}
                        />
                        <SubCard
                            label="Status"
                            value={<Badge className={cn(hotspotUser?.paymentId?.status === "paid" && "bg-green-500", hotspotUser?.paymentId?.status === "pending" && "bg-red-500", hotspotUser?.paymentId?.status === "refund" && "bg-indigo-500", "text-white capitalize")}>{hotspotUser?.paymentId?.status}</Badge>}
                        />
                    </div>
                </div>
                <div>
                    <h2 className='mb-4 text-lg font-medium md:text-xl'>Package Details</h2>
                    <div className='grid grid-cols-2 gap-6'>
                        <SubCard
                            label="Package Name"
                            value={hotspotUser?.packageId?.packageName}
                        />
                        <SubCard
                            label="Validity"
                            value={`${hotspotUser?.packageId?.validity} ${hotspotUser?.packageId?.validity === 1 ? "Day" : "Days"}`}
                        />
                        <SubCard
                            label="Mobile Price"
                            value={<>TK <span className='line-through'>{hotspotUser?.packageId?.price}</span> {calculateDiscountedPrice(hotspotUser?.packageId?.price, hotspotUser?.packageId?.discountPercentage)}</>}
                        />
                        <SubCard
                            label="Desktop Price"
                            value={<>TK <span className='line-through'>{hotspotUser?.packageId?.desktopPrice}</span> {calculateDiscountedPrice(hotspotUser?.packageId?.desktopPrice, hotspotUser?.packageId?.discountPercentage)}</>}
                        />
                    </div>
                </div>
                <div className='grid items-center justify-between gap-3 md:grid-cols-2'>
                    <div>
                        <h2 className='mb-2 text-lg font-medium md:text-xl'>Expiration Date</h2>
                        <h2 className='text-xl font-medium md:text-2xl'>
                            {moment(convertToUTCPlus6(hotspotUser?.expiredAt)).format('MMM DD YYYY, h:mm:ss A')}
                        </h2>
                    </div>
                    <div>
                        <h2 className='mb-1 text-lg font-medium'>Status</h2>
                        <h2 className='text-xl font-medium'>
                            <Badge className={cn(hotspotUser?.status === "active" ? "bg-green-500" : "bg-gray-400", "text-white capitalize text-base")}>{hotspotUser?.status}</Badge>
                        </h2>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default HotspotUserDetailsCard;