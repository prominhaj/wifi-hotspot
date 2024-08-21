'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardHotspotUsersError({ error, reset }) {
    return (
        <Card className='flex flex-col items-start justify-start w-full gap-2 border bg-background/20'>
            <CardHeader className='pb-1'>
                <CardTitle>Something went wrong</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-red-500'>{error.message}</p>
                <Button variant='outline' onClick={reset}>
                    Try again
                </Button>
            </CardContent>
        </Card>
    );
}
