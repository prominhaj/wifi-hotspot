
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

const CheckPayment = ({ user }) => {
    return (
        <div className='flex flex-col items-center justify-center flex-1 w-full h-full my-16'>
            <div className='flex flex-col items-center max-w-full gap-6 text-center bello'>
                <>
                    <CircleCheck className='w-32 h-32 p-0 text-white bg-green-500 rounded-full' />
                    <h1 className='text-xl md:text-2xl lg:text-3xl'>
                        Congratulations, <strong>{user?.name}</strong>! your have
                        successfully purchase
                    </h1>
                </>
                <Link className={cn(buttonVariants({ variant: "primary" }))}>Go To Home</Link>
            </div>
        </div>
    );
};

export default CheckPayment;