'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExpiredHotspotUserError({ error, reset }) {
    return (
        <Card className='flex flex-col items-center justify-center w-full max-w-3xl gap-2 p-6 mx-auto mt-5 border rounded-lg bg-background/20 md:mt-16'>
            <CardHeader className='pb-1'>
                <CardTitle>Something went wrong</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-red-500'>{error.message}</p>
                <div className='flex items-center justify-center gap-3 mt-3'>
                    <Button variant='outline' onClick={reset}>
                        Try again
                    </Button>
                    <Button onClick={() => window.location.reload()}>Refresh</Button>
                </div>
            </CardContent>
        </Card>
    );
}
