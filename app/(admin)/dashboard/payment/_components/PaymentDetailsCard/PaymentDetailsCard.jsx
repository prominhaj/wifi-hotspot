import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import moment from 'moment';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BackButton from './BackButton';
import PaymentDeleteButton from './PaymentDeleteButton';

const PaymentDetailsCard = ({ payment }) => {
    return (
        <Card className='bg-background/20'>
            <CardHeader>
                <CardTitle className='text-xl'>Payment Details</CardTitle>
            </CardHeader>

            <CardContent className='space-y-4'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Profile Photo:</span>
                    <Avatar>
                        <AvatarImage className="object-cover" src={payment?.userId?.profilePhoto?.url} />
                        <AvatarFallback>{payment?.userId?.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>User Name:</span>
                    <span>{payment?.userId?.name ?? 'N/A'}</span>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Phone Number:</span>
                    <span>{payment?.userId?.phone ?? 'N/A'}</span>
                </div>
                <Separator />

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Transaction ID:</span>
                    <span>{payment?.transactionId ?? 'N/A'}</span>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Payment ID:</span>
                    <span>{payment?.paymentId ?? 'N/A'}</span>
                </div>

                <Separator />

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Amount:</span>
                    <span>TK {payment?.amount ?? 'N/A'}</span>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Status:</span>
                    <Badge
                        className={cn(
                            payment?.status === 'paid' && 'bg-green-500',
                            payment?.status === 'pending' && 'bg-red-500',
                            payment?.status === 'refund' && 'bg-indigo-500',
                            'capitalize text-white'
                        )}
                    >
                        {payment?.status ?? 'N/A'}
                    </Badge>
                </div>

                <Separator />

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Package Name:</span>
                    <span>{payment?.packageId?.packageName ?? 'N/A'}</span>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Package Validity:</span>
                    <span>
                        {payment?.packageId?.validity
                            ? `${payment.packageId.validity} days`
                            : 'N/A'}
                    </span>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Package Price:</span>
                    <span>TK {payment?.packageId?.price ?? 'N/A'}</span>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Desktop Price:</span>
                    <span>TK {payment?.packageId?.desktopPrice ?? 'N/A'}</span>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Discount Percentage:</span>
                    <span>
                        {payment?.packageId?.discountPercentage
                            ? `${payment.packageId.discountPercentage}%`
                            : 'N/A'}
                    </span>
                </div>

                <Separator />

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Created At:</span>
                    <span>
                        {payment?.createdAt
                            ? moment(payment.createdAt).format('MMM DD YYYY, h:mm:ss A')
                            : 'N/A'}
                    </span>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <span className='font-medium'>Updated At:</span>
                    <span>
                        {payment?.updatedAt
                            ? moment(payment.updatedAt).format('MMM DD YYYY, h:mm:ss A')
                            : 'N/A'}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-end gap-3">
                <BackButton />
                <PaymentDeleteButton id={payment?.id} />
            </CardFooter>
        </Card>
    );
};

export default PaymentDetailsCard;