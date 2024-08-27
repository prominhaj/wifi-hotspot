import { buttonVariants } from "@/components/ui/button";
import { getSessionUser } from "@/lib/dal";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import Link from "next/link";

const WrongPaymentUser = async ({ getPayment, paymentId, message }) => {
    const session = await getSessionUser();
    if (!session) {
        return null;
    }

    return (
        <div className='flex flex-col items-center justify-center flex-1 w-full h-full my-16'>
            <div className='flex flex-col items-center max-w-full gap-6 text-center'>
                <>
                    <CircleX className='w-20 h-20 p-0 text-white bg-red-500 rounded-full md:w-32 md:h-32' />{' '}
                    {paymentId ? (
                        <h1 className='text-xl md:text-2xl lg:text-3xl'>
                            <strong>{getPayment?.userId?.name || session?.name}</strong>, your payment details wrong
                            please pay again
                        </h1>
                    ) : (
                        <p className='text-xl text-red-500 md:text-2xl lg:text-3xl'>
                            {message}
                        </p>
                    )
                    }
                    <Link className={cn(buttonVariants({ variant: "outline" }))} href="/">Go To Back</Link>
                </>
            </div>
        </div>
    );
};

export default WrongPaymentUser;