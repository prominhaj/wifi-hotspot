'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className='w-screen flex items-center h-[80vh] justify-center'>
            <Card className='max-w-sm'>
                <CardHeader>Something went wrong!</CardHeader>
                <CardContent>
                    <p className='text-center text-red-500 text-wrap'>{error.message}</p>
                    <div className='flex items-center justify-center gap-3 mt-3'>
                        <Button variant='destructive' onClick={() => reset()}>
                            Try again
                        </Button>
                        <Link href='/' className={cn(buttonVariants({ variant: 'default' }))}>
                            Return Home
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
