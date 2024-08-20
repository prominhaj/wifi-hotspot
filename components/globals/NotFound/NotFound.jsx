import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TriangleAlertIcon } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className='max-w-md px-3 mx-auto text-center'>
            <TriangleAlertIcon className='w-12 h-12 mx-auto text-primary' />
            <h1 className='mt-4 text-6xl font-bold tracking-tight text-foreground'>404</h1>
            <p className='mt-4 text-muted-foreground'>
                Oops, The page you are looking for could not be found.
            </p>
            <div className='mt-6'>
                <Link
                    href='/'
                    className={cn(buttonVariants({ variant: 'default' }))}
                    prefetch={false}
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;